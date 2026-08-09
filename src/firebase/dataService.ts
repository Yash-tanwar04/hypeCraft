import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db, isFirebaseConfigured, auth } from './config';
import { Project, Insight, Enquiry, TeamMember } from '../types';
import { INITIAL_PROJECTS, INITIAL_INSIGHTS, INITIAL_TEAM } from '../data/initialData';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid || null,
      email: auth?.currentUser?.email || null,
    },
    operationType,
    path
  };
  console.error('Firestore Error Details:', errInfo);
}

// Local storage key helpers
const STORAGE_PROJECTS_KEY = 'hypecraft_projects_v2';
const STORAGE_INSIGHTS_KEY = 'hypecraft_insights_v2';
const STORAGE_ENQUIRIES_KEY = 'hypecraft_enquiries_v1';
const STORAGE_TEAM_KEY = 'hypecraft_team_v2';

function getLocal<T>(key: string, initial: T[]): T[] {
  try {
    // Clear legacy v1 keys if present to ensure fresh image paths are used
    if (key.includes('_v2')) {
      const oldKey = key.replace('_v2', '_v1');
      if (localStorage.getItem(oldKey)) {
        localStorage.removeItem(oldKey);
      }
    }
    const data = localStorage.getItem(key);
    if (!data) {
      localStorage.setItem(key, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(data);
  } catch {
    return initial;
  }
}

function setLocal<T>(key: string, data: T[]) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('LocalStorage write failed:', e);
  }
}

// PROJECTS DATA SERVICE
export async function fetchProjects(includeUnpublished = false): Promise<Project[]> {
  if (isFirebaseConfigured && db) {
    try {
      const projectsRef = collection(db, 'projects');
      const q = includeUnpublished 
        ? query(projectsRef, orderBy('createdAt', 'desc'))
        : query(projectsRef, where('published', '==', true));
      
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map(docSnap => ({
          id: docSnap.id,
          ...docSnap.data()
        } as Project));
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, 'projects');
    }
  }
  // Local fallback
  const local = getLocal<Project>(STORAGE_PROJECTS_KEY, INITIAL_PROJECTS);
  return includeUnpublished ? local : local.filter(p => p.published);
}

export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
  if (isFirebaseConfigured && db) {
    try {
      const projectsRef = collection(db, 'projects');
      const q = query(projectsRef, where('slug', '==', slug));
      const snap = await getDocs(q);
      if (!snap.empty) {
        const docSnap = snap.docs[0];
        return { id: docSnap.id, ...docSnap.data() } as Project;
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.GET, `projects/${slug}`);
    }
  }
  const local = getLocal<Project>(STORAGE_PROJECTS_KEY, INITIAL_PROJECTS);
  return local.find(p => p.slug === slug) || null;
}

export async function saveProject(project: Omit<Project, 'id'>, id?: string): Promise<string> {
  const now = new Date().toISOString();
  const payload = { ...project, updatedAt: now };

  if (isFirebaseConfigured && db) {
    try {
      if (id) {
        await updateDoc(doc(db, 'projects', id), payload);
        return id;
      } else {
        const docRef = await addDoc(collection(db, 'projects'), { ...payload, createdAt: now });
        return docRef.id;
      }
    } catch (err) {
      handleFirestoreError(err, id ? OperationType.UPDATE : OperationType.CREATE, 'projects');
    }
  }

  // Local fallback
  const local = getLocal<Project>(STORAGE_PROJECTS_KEY, INITIAL_PROJECTS);
  if (id) {
    const updated = local.map(p => p.id === id ? { ...payload, id } : p);
    setLocal(STORAGE_PROJECTS_KEY, updated);
    return id;
  } else {
    const newId = 'proj-' + Date.now();
    const newProj: Project = { ...payload, id: newId, createdAt: now };
    setLocal(STORAGE_PROJECTS_KEY, [newProj, ...local]);
    return newId;
  }
}

export async function createProject(project: Omit<Project, 'id'>): Promise<string> {
  return saveProject(project);
}

export async function updateProject(id: string, projectPartial: Partial<Project>): Promise<string> {
  const existing = await fetchProjects(true);
  const found = existing.find(p => p.id === id);
  const merged = { ...(found || {}), ...projectPartial } as Omit<Project, 'id'>;
  return saveProject(merged, id);
}

export async function deleteProject(id: string): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'projects', id));
      return;
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `projects/${id}`);
    }
  }
  const local = getLocal<Project>(STORAGE_PROJECTS_KEY, INITIAL_PROJECTS);
  setLocal(STORAGE_PROJECTS_KEY, local.filter(p => p.id !== id));
}

// INSIGHTS DATA SERVICE
export async function fetchInsights(includeUnpublished = false): Promise<Insight[]> {
  if (isFirebaseConfigured && db) {
    try {
      const ref = collection(db, 'insights');
      const q = includeUnpublished 
        ? query(ref, orderBy('createdAt', 'desc'))
        : query(ref, where('published', '==', true));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as Insight));
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, 'insights');
    }
  }
  const local = getLocal<Insight>(STORAGE_INSIGHTS_KEY, INITIAL_INSIGHTS);
  return includeUnpublished ? local : local.filter(i => i.published);
}

export async function fetchInsightBySlug(slug: string): Promise<Insight | null> {
  if (isFirebaseConfigured && db) {
    try {
      const ref = collection(db, 'insights');
      const q = query(ref, where('slug', '==', slug));
      const snap = await getDocs(q);
      if (!snap.empty) {
        const d = snap.docs[0];
        return { id: d.id, ...d.data() } as Insight;
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.GET, `insights/${slug}`);
    }
  }
  const local = getLocal<Insight>(STORAGE_INSIGHTS_KEY, INITIAL_INSIGHTS);
  return local.find(i => i.slug === slug) || null;
}

export async function saveInsight(insight: Omit<Insight, 'id'>, id?: string): Promise<string> {
  const now = new Date().toISOString();
  const payload = { ...insight, updatedAt: now };

  if (isFirebaseConfigured && db) {
    try {
      if (id) {
        await updateDoc(doc(db, 'insights', id), payload);
        return id;
      } else {
        const docRef = await addDoc(collection(db, 'insights'), { ...payload, createdAt: now });
        return docRef.id;
      }
    } catch (err) {
      handleFirestoreError(err, id ? OperationType.UPDATE : OperationType.CREATE, 'insights');
    }
  }

  const local = getLocal<Insight>(STORAGE_INSIGHTS_KEY, INITIAL_INSIGHTS);
  if (id) {
    const updated = local.map(i => i.id === id ? { ...payload, id } : i);
    setLocal(STORAGE_INSIGHTS_KEY, updated);
    return id;
  } else {
    const newId = 'ins-' + Date.now();
    const newInsight: Insight = { ...payload, id: newId, createdAt: now };
    setLocal(STORAGE_INSIGHTS_KEY, [newInsight, ...local]);
    return newId;
  }
}

export async function createInsight(insight: Omit<Insight, 'id'>): Promise<string> {
  return saveInsight(insight);
}

export async function updateInsight(id: string, insightPartial: Partial<Insight>): Promise<string> {
  const existing = await fetchInsights(true);
  const found = existing.find(i => i.id === id);
  const merged = { ...(found || {}), ...insightPartial } as Omit<Insight, 'id'>;
  return saveInsight(merged, id);
}

export async function deleteInsight(id: string): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'insights', id));
      return;
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `insights/${id}`);
    }
  }
  const local = getLocal<Insight>(STORAGE_INSIGHTS_KEY, INITIAL_INSIGHTS);
  setLocal(STORAGE_INSIGHTS_KEY, local.filter(i => i.id !== id));
}

// ENQUIRIES DATA SERVICE
export async function submitEnquiry(enquiryData: Omit<Enquiry, 'id' | 'createdAt' | 'status'>): Promise<string> {
  const now = new Date().toISOString();
  const payload: Omit<Enquiry, 'id'> = {
    ...enquiryData,
    status: 'new',
    createdAt: now
  };

  if (isFirebaseConfigured && db) {
    try {
      const docRef = await addDoc(collection(db, 'enquiries'), payload);
      return docRef.id;
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'enquiries');
    }
  }

  const local = getLocal<Enquiry>(STORAGE_ENQUIRIES_KEY, []);
  const newId = 'enq-' + Date.now();
  const newEnq: Enquiry = { ...payload, id: newId };
  setLocal(STORAGE_ENQUIRIES_KEY, [newEnq, ...local]);
  return newId;
}

export async function fetchEnquiries(): Promise<Enquiry[]> {
  if (isFirebaseConfigured && db) {
    try {
      const ref = collection(db, 'enquiries');
      const q = query(ref, orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as Enquiry));
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, 'enquiries');
    }
  }
  return getLocal<Enquiry>(STORAGE_ENQUIRIES_KEY, []);
}

export async function updateEnquiryStatus(id: string, status: Enquiry['status']): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, 'enquiries', id), { status });
      return;
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `enquiries/${id}`);
    }
  }
  const local = getLocal<Enquiry>(STORAGE_ENQUIRIES_KEY, []);
  const updated = local.map(e => e.id === id ? { ...e, status } : e);
  setLocal(STORAGE_ENQUIRIES_KEY, updated);
}

export async function deleteEnquiry(id: string): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'enquiries', id));
      return;
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `enquiries/${id}`);
    }
  }
  const local = getLocal<Enquiry>(STORAGE_ENQUIRIES_KEY, []);
  setLocal(STORAGE_ENQUIRIES_KEY, local.filter(e => e.id !== id));
}

// TEAM DATA SERVICE
export async function fetchTeam(): Promise<TeamMember[]> {
  if (isFirebaseConfigured && db) {
    try {
      const ref = collection(db, 'team');
      const snap = await getDocs(ref);
      if (!snap.empty) {
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as TeamMember));
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, 'team');
    }
  }
  return getLocal<TeamMember>(STORAGE_TEAM_KEY, INITIAL_TEAM);
}

export async function saveTeamMember(member: Omit<TeamMember, 'id'>, id?: string): Promise<string> {
  if (isFirebaseConfigured && db) {
    try {
      if (id) {
        await updateDoc(doc(db, 'team', id), member);
        return id;
      } else {
        const docRef = await addDoc(collection(db, 'team'), member);
        return docRef.id;
      }
    } catch (err) {
      handleFirestoreError(err, id ? OperationType.UPDATE : OperationType.CREATE, 'team');
    }
  }

  const local = getLocal<TeamMember>(STORAGE_TEAM_KEY, INITIAL_TEAM);
  if (id) {
    const updated = local.map(m => m.id === id ? { ...member, id } : m);
    setLocal(STORAGE_TEAM_KEY, updated);
    return id;
  } else {
    const newId = 'tm-' + Date.now();
    const newMem = { ...member, id: newId };
    setLocal(STORAGE_TEAM_KEY, [...local, newMem]);
    return newId;
  }
}
