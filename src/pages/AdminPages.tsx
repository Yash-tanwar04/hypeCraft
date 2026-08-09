import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {
  fetchProjects,
  fetchInsights,
  fetchEnquiries,
  fetchTeam,
  createProject,
  updateProject,
  deleteProject,
  createInsight,
  updateInsight,
  deleteInsight,
  updateEnquiryStatus,
  deleteEnquiry
} from '../firebase/dataService';
import { Project, Insight, Enquiry, TeamMember } from '../types';
import {
  Lock,
  LogOut,
  Plus,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  CheckCircle,
  FileText,
  Briefcase,
  Mail,
  Users,
  LayoutDashboard,
  ShieldCheck,
  X
} from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { loginWithDemo, loginWithEmail, user, isDemoAdmin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user || isDemoAdmin) {
      navigate('/admin');
    }
  }, [user, isDemoAdmin, navigate]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await loginWithEmail(email, password);
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Check email & password.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = () => {
    loginWithDemo();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen pt-28 pb-20 flex items-center justify-center bg-[#071936] text-white px-6">
      <div className="max-w-md w-full bg-[#040e21] border border-[#D9A21B]/30 p-8 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#D9A21B]/10 border border-[#D9A21B] flex items-center justify-center text-[#D9A21B]">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-serif text-white">Hypecraft CMS Admin</h2>
          <p className="text-xs text-white/60">Protected Content Management Portal</p>
        </div>

        {error && (
          <div className="p-3 bg-red-900/40 border border-red-500/50 text-red-200 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-semibold tracking-wider text-[#D9A21B] uppercase">Admin Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#071936] border border-white/20 text-xs text-white focus:outline-none focus:border-[#D9A21B]"
              placeholder="admin@hypecraft.com"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-semibold tracking-wider text-[#D9A21B] uppercase">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#071936] border border-white/20 text-xs text-white focus:outline-none focus:border-[#D9A21B]"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#D9A21B] text-[#071936] text-xs font-bold tracking-widest uppercase hover:bg-white transition-colors"
          >
            {loading ? 'Authenticating…' : 'Sign In To CMS'}
          </button>
        </form>

        <div className="relative border-t border-white/10 pt-4 text-center">
          <p className="text-[11px] text-white/50 mb-3">Instant Review Mode:</p>
          <button
            onClick={handleDemo}
            className="w-full py-2.5 border border-[#D9A21B] text-[#D9A21B] text-xs font-semibold tracking-wider hover:bg-[#D9A21B] hover:text-[#071936] transition-colors"
          >
            Access Demo Admin Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export const AdminDashboard: React.FC = () => {
  const { user, isDemoAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'insights' | 'enquiries' | 'team'>('overview');
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);

  // Modal / Form state for Project editing
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  // Modal / Form state for Insight editing
  const [editingInsight, setEditingInsight] = useState<Partial<Insight> | null>(null);
  const [insightModalOpen, setInsightModalOpen] = useState(false);

  useEffect(() => {
    if (!user && !isDemoAdmin) {
      navigate('/admin/login');
      return;
    }
    loadData();
  }, [user, isDemoAdmin, navigate]);

  const loadData = async () => {
    const [p, i, e, t] = await Promise.all([
      fetchProjects(),
      fetchInsights(),
      fetchEnquiries(),
      fetchTeam()
    ]);
    setProjects(p);
    setInsights(i);
    setEnquiries(e);
    setTeam(t);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  /* Project handlers */
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title || !editingProject?.slug) return;
    
    if (editingProject.id) {
      await updateProject(editingProject.id, editingProject);
    } else {
      await createProject({
        title: editingProject.title,
        slug: editingProject.slug || editingProject.title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        category: editingProject.category || 'Political PR',
        year: editingProject.year || '2026',
        shortDescription: editingProject.shortDescription || '',
        challenge: editingProject.challenge || '',
        objective: editingProject.objective || '',
        strategy: editingProject.strategy || '',
        creativeDirection: editingProject.creativeDirection || '',
        execution: editingProject.execution || '',
        outcome: editingProject.outcome || '',
        heroImage: editingProject.heroImage || 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
        galleryImages: editingProject.galleryImages || [],
        tags: editingProject.tags || [],
        featured: editingProject.featured ?? true,
        published: editingProject.published ?? true,
        isConcept: editingProject.isConcept ?? false,
      });
    }
    setProjectModalOpen(false);
    setEditingProject(null);
    loadData();
  };

  const handleDeleteProject = async (id: string) => {
    if (window.confirm('Delete this project?')) {
      await deleteProject(id);
      loadData();
    }
  };

  const toggleProjectPublish = async (proj: Project) => {
    if (!proj.id) return;
    await updateProject(proj.id, { published: !proj.published });
    loadData();
  };

  /* Insight handlers */
  const handleSaveInsight = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingInsight?.title) return;

    if (editingInsight.id) {
      await updateInsight(editingInsight.id, editingInsight);
    } else {
      await createInsight({
        title: editingInsight.title,
        slug: editingInsight.slug || editingInsight.title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        category: editingInsight.category || 'Political Communication',
        excerpt: editingInsight.excerpt || '',
        content: editingInsight.content || '',
        coverImage: editingInsight.coverImage || 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80',
        author: editingInsight.author || 'Hypecraft Strategic Advisory',
        publishedAt: editingInsight.publishedAt || 'Spring 2026',
        readingTime: editingInsight.readingTime || '5 min read',
        tags: editingInsight.tags || ['Strategy'],
        published: editingInsight.published ?? true,
      });
    }
    setInsightModalOpen(false);
    setEditingInsight(null);
    loadData();
  };

  const handleDeleteInsight = async (id: string) => {
    if (window.confirm('Delete this insight article?')) {
      await deleteInsight(id);
      loadData();
    }
  };

  /* Enquiry status update */
  const handleEnquiryStatusChange = async (id: string, status: any) => {
    await updateEnquiryStatus(id, status);
    loadData();
  };

  const handleDeleteEnquiry = async (id: string) => {
    if (window.confirm('Delete this contact enquiry?')) {
      await deleteEnquiry(id);
      loadData();
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-[#FAFAF7] text-[#071936] font-sans pb-24">
      
      {/* HEADER BAR */}
      <div className="bg-[#071936] text-white border-b border-[#071936] py-6 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#D9A21B]" />
            <div>
              <h1 className="text-xl font-serif text-white">Hypecraft Content Management</h1>
              <p className="text-[10px] text-[#D9A21B] uppercase tracking-widest">
                Authenticated as {isDemoAdmin ? 'Demo Admin' : user?.email}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 text-xs font-semibold tracking-wider hover:border-[#D9A21B] hover:text-[#D9A21B] transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Log Out
          </button>
        </div>
      </div>

      {/* DASHBOARD TABS */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8">
        <div className="flex items-center gap-2 border-b border-[#E9E9E4] pb-4 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase flex items-center gap-2 transition-colors ${
              activeTab === 'overview'
                ? 'bg-[#071936] text-[#FAFAF7]'
                : 'bg-[#E9E9E4]/40 text-[#071936]/70 hover:bg-[#E9E9E4]'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" /> Overview
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase flex items-center gap-2 transition-colors ${
              activeTab === 'enquiries'
                ? 'bg-[#071936] text-[#FAFAF7]'
                : 'bg-[#E9E9E4]/40 text-[#071936]/70 hover:bg-[#E9E9E4]'
            }`}
          >
            <Mail className="w-3.5 h-3.5 text-[#D9A21B]" /> Enquiries ({enquiries.length})
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase flex items-center gap-2 transition-colors ${
              activeTab === 'projects'
                ? 'bg-[#071936] text-[#FAFAF7]'
                : 'bg-[#E9E9E4]/40 text-[#071936]/70 hover:bg-[#E9E9E4]'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" /> Projects ({projects.length})
          </button>

          <button
            onClick={() => setActiveTab('insights')}
            className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase flex items-center gap-2 transition-colors ${
              activeTab === 'insights'
                ? 'bg-[#071936] text-[#FAFAF7]'
                : 'bg-[#E9E9E4]/40 text-[#071936]/70 hover:bg-[#E9E9E4]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> Insights ({insights.length})
          </button>

          <button
            onClick={() => setActiveTab('team')}
            className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase flex items-center gap-2 transition-colors ${
              activeTab === 'team'
                ? 'bg-[#071936] text-[#FAFAF7]'
                : 'bg-[#E9E9E4]/40 text-[#071936]/70 hover:bg-[#E9E9E4]'
            }`}
          >
            <Users className="w-3.5 h-3.5" /> Leadership ({team.length})
          </button>
        </div>

        {/* TAB CONTENTS */}
        <div className="pt-8">
          
          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white border border-[#E9E9E4] p-6 space-y-2">
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-[#D9A21B]">NEW ENQUIRIES</span>
                  <p className="text-3xl font-serif text-[#071936]">{enquiries.length}</p>
                </div>
                <div className="bg-white border border-[#E9E9E4] p-6 space-y-2">
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-[#D9A21B]">TOTAL PROJECTS</span>
                  <p className="text-3xl font-serif text-[#071936]">{projects.length}</p>
                </div>
                <div className="bg-white border border-[#E9E9E4] p-6 space-y-2">
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-[#D9A21B]">PUBLISHED ARTICLES</span>
                  <p className="text-3xl font-serif text-[#071936]">{insights.length}</p>
                </div>
                <div className="bg-white border border-[#E9E9E4] p-6 space-y-2">
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-[#D9A21B]">LEADERSHIP PROFILES</span>
                  <p className="text-3xl font-serif text-[#071936]">{team.length}</p>
                </div>
              </div>

              <div className="bg-white border border-[#E9E9E4] p-6 space-y-4">
                <h3 className="text-lg font-serif text-[#071936]">Recent Client Enquiries</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#E9E9E4] text-[#D9A21B] font-semibold uppercase tracking-wider">
                        <th className="py-2.5 px-3">Date</th>
                        <th className="py-2.5 px-3">Name</th>
                        <th className="py-2.5 px-3">Organization</th>
                        <th className="py-2.5 px-3">Service</th>
                        <th className="py-2.5 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enquiries.slice(0, 5).map((enq) => (
                        <tr key={enq.id} className="border-b border-[#E9E9E4]">
                          <td className="py-2.5 px-3">{new Date(enq.createdAt).toLocaleDateString()}</td>
                          <td className="py-2.5 px-3 font-semibold">{enq.name}</td>
                          <td className="py-2.5 px-3">{enq.organization || '—'}</td>
                          <td className="py-2.5 px-3">{enq.service}</td>
                          <td className="py-2.5 px-3 font-semibold text-[#D9A21B]">{enq.status || 'New'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ENQUIRIES TAB */}
          {activeTab === 'enquiries' && (
            <div className="bg-white border border-[#E9E9E4] p-6 space-y-6">
              <h3 className="text-xl font-serif text-[#071936]">Incoming Client Leads & Enquiries</h3>
              <div className="space-y-4">
                {enquiries.map((enq) => (
                  <div key={enq.id} className="p-5 border border-[#E9E9E4] bg-[#FAFAF7] space-y-3">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#E9E9E4] pb-3">
                      <div>
                        <span className="text-sm font-bold text-[#071936]">{enq.name}</span>
                        {enq.organization && <span className="text-xs text-[#071936]/60 font-medium"> ({enq.organization})</span>}
                        <p className="text-xs text-[#D9A21B] font-semibold">{enq.email} • {enq.phone || 'No phone'}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <select
                          value={enq.status || 'New'}
                          onChange={(e) => enq.id && handleEnquiryStatusChange(enq.id, e.target.value)}
                          className="px-3 py-1 bg-white border border-[#E9E9E4] text-xs font-semibold text-[#071936]"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="In Discussion">In Discussion</option>
                          <option value="Converted">Converted</option>
                          <option value="Closed">Closed</option>
                        </select>

                        <button
                          onClick={() => enq.id && handleDeleteEnquiry(enq.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Enquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px] text-[#071936]/70">
                      <div><strong className="text-[#071936]">Service:</strong> {enq.service}</div>
                      <div><strong className="text-[#071936]">Budget:</strong> {enq.budgetRange}</div>
                      <div><strong className="text-[#071936]">Timeline:</strong> {enq.timeline}</div>
                      <div><strong className="text-[#071936]">Submitted:</strong> {new Date(enq.createdAt).toLocaleDateString()}</div>
                    </div>

                    <p className="text-xs text-[#071936] font-sans bg-white p-3 border border-[#E9E9E4] leading-relaxed">
                      "{enq.message}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROJECTS TAB */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-serif text-[#071936]">Portfolio Projects</h3>
                <button
                  onClick={() => {
                    setEditingProject({
                      title: '',
                      slug: '',
                      category: 'Political PR',
                      year: '2026',
                      shortDescription: '',
                      challenge: '',
                      objective: '',
                      strategy: '',
                      creativeDirection: '',
                      execution: '',
                      outcome: '',
                      heroImage: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
                      galleryImages: [],
                      tags: [],
                      featured: true,
                      published: true,
                      isConcept: false,
                    });
                    setProjectModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#071936] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#D9A21B] transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add New Project
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((proj) => (
                  <div key={proj.id || proj.slug} className="bg-white border border-[#E9E9E4] p-5 space-y-4">
                    <div className="aspect-16/10 overflow-hidden bg-[#E9E9E4]">
                      <img src={proj.heroImage} alt={proj.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="text-[10px] text-[#D9A21B] font-bold uppercase">{proj.category} • {proj.year}</span>
                      <h4 className="text-lg font-serif text-[#071936]">{proj.title}</h4>
                      <p className="text-xs text-[#071936]/70 line-clamp-2">{proj.shortDescription}</p>
                    </div>

                    <div className="flex items-center justify-between border-t border-[#E9E9E4] pt-3">
                      <button
                        onClick={() => toggleProjectPublish(proj)}
                        className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${
                          proj.published ? 'text-green-700' : 'text-gray-400'
                        }`}
                      >
                        {proj.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        {proj.published ? 'Published' : 'Draft'}
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingProject(proj);
                            setProjectModalOpen(true);
                          }}
                          className="p-1 text-[#071936] hover:text-[#D9A21B]"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => proj.id && handleDeleteProject(proj.id)}
                          className="p-1 text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* INSIGHTS TAB */}
          {activeTab === 'insights' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-serif text-[#071936]">Editorial Articles</h3>
                <button
                  onClick={() => {
                    setEditingInsight({
                      title: '',
                      slug: '',
                      category: 'Political Communication',
                      excerpt: '',
                      content: '',
                      coverImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80',
                      author: 'Hypecraft Strategic Advisory',
                      publishedAt: 'Spring 2026',
                      readingTime: '5 min read',
                      tags: ['Strategy'],
                      published: true,
                    });
                    setInsightModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#071936] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#D9A21B] transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add New Article
                </button>
              </div>

              <div className="space-y-4">
                {insights.map((art) => (
                  <div key={art.id || art.slug} className="bg-white border border-[#E9E9E4] p-5 flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] text-[#D9A21B] font-bold uppercase">{art.category} • {art.publishedAt}</span>
                      <h4 className="text-lg font-serif text-[#071936]">{art.title}</h4>
                      <p className="text-xs text-[#071936]/70 line-clamp-1">{art.excerpt}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        onClick={() => {
                          setEditingInsight(art);
                          setInsightModalOpen(true);
                        }}
                        className="p-1 text-[#071936] hover:text-[#D9A21B]"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => art.id && handleDeleteInsight(art.id)}
                        className="p-1 text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TEAM TAB */}
          {activeTab === 'team' && (
            <div className="space-y-6">
              <h3 className="text-xl font-serif text-[#071936]">Leadership Profiles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {team.map((m) => (
                  <div key={m.id || m.name} className="bg-white border border-[#E9E9E4] p-5 space-y-3">
                    <div className="aspect-4/3 bg-[#E9E9E4]">
                      <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] font-bold text-[#D9A21B] uppercase">{m.role}</span>
                    <h4 className="text-lg font-serif text-[#071936]">{m.name}</h4>
                    <p className="text-xs text-[#071936]/70">{m.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* PROJECT EDIT MODAL */}
      {projectModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 bg-[#071936]/80 flex items-center justify-center p-6 overflow-y-auto">
          <div className="bg-white border border-[#E9E9E4] max-w-2xl w-full p-8 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E9E9E4] pb-4">
              <h3 className="text-xl font-serif text-[#071936]">
                {editingProject.id ? 'Edit Project' : 'Create New Project'}
              </h3>
              <button onClick={() => setProjectModalOpen(false)} className="text-[#071936] hover:text-red-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase text-[10px] text-[#071936] mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full p-2.5 border border-[#E9E9E4]"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase text-[10px] text-[#071936] mb-1">Slug</label>
                  <input
                    type="text"
                    value={editingProject.slug || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                    className="w-full p-2.5 border border-[#E9E9E4]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase text-[10px] text-[#071936] mb-1">Category</label>
                  <input
                    type="text"
                    value={editingProject.category || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full p-2.5 border border-[#E9E9E4]"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase text-[10px] text-[#071936] mb-1">Year</label>
                  <input
                    type="text"
                    value={editingProject.year || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                    className="w-full p-2.5 border border-[#E9E9E4]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase text-[10px] text-[#071936] mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={editingProject.shortDescription || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
                  className="w-full p-2.5 border border-[#E9E9E4]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-[10px] text-[#071936] mb-1">Challenge</label>
                <textarea
                  rows={2}
                  value={editingProject.challenge || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, challenge: e.target.value })}
                  className="w-full p-2.5 border border-[#E9E9E4]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-[10px] text-[#071936] mb-1">Strategy</label>
                <textarea
                  rows={2}
                  value={editingProject.strategy || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, strategy: e.target.value })}
                  className="w-full p-2.5 border border-[#E9E9E4]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-[10px] text-[#071936] mb-1">Hero Image URL</label>
                <input
                  type="text"
                  value={editingProject.heroImage || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, heroImage: e.target.value })}
                  className="w-full p-2.5 border border-[#E9E9E4]"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.isConcept || false}
                    onChange={(e) => setEditingProject({ ...editingProject, isConcept: e.target.checked })}
                  />
                  <span>Is Concept Project</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.published ?? true}
                    onChange={(e) => setEditingProject({ ...editingProject, published: e.target.checked })}
                  />
                  <span>Published</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setProjectModalOpen(false)}
                  className="px-4 py-2 border border-[#E9E9E4] uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#071936] text-white uppercase font-bold hover:bg-[#D9A21B]"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* INSIGHT EDIT MODAL */}
      {insightModalOpen && editingInsight && (
        <div className="fixed inset-0 z-50 bg-[#071936]/80 flex items-center justify-center p-6 overflow-y-auto">
          <div className="bg-white border border-[#E9E9E4] max-w-2xl w-full p-8 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E9E9E4] pb-4">
              <h3 className="text-xl font-serif text-[#071936]">
                {editingInsight.id ? 'Edit Article' : 'Create Article'}
              </h3>
              <button onClick={() => setInsightModalOpen(false)} className="text-[#071936] hover:text-red-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSaveInsight} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase text-[10px] text-[#071936] mb-1">Article Title</label>
                <input
                  type="text"
                  required
                  value={editingInsight.title || ''}
                  onChange={(e) => setEditingInsight({ ...editingInsight, title: e.target.value })}
                  className="w-full p-2.5 border border-[#E9E9E4]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase text-[10px] text-[#071936] mb-1">Category</label>
                  <input
                    type="text"
                    value={editingInsight.category || ''}
                    onChange={(e) => setEditingInsight({ ...editingInsight, category: e.target.value })}
                    className="w-full p-2.5 border border-[#E9E9E4]"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase text-[10px] text-[#071936] mb-1">Reading Time</label>
                  <input
                    type="text"
                    value={editingInsight.readingTime || ''}
                    onChange={(e) => setEditingInsight({ ...editingInsight, readingTime: e.target.value })}
                    className="w-full p-2.5 border border-[#E9E9E4]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase text-[10px] text-[#071936] mb-1">Excerpt</label>
                <textarea
                  rows={2}
                  value={editingInsight.excerpt || ''}
                  onChange={(e) => setEditingInsight({ ...editingInsight, excerpt: e.target.value })}
                  className="w-full p-2.5 border border-[#E9E9E4]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-[10px] text-[#071936] mb-1">Full Article Content</label>
                <textarea
                  rows={6}
                  value={editingInsight.content || ''}
                  onChange={(e) => setEditingInsight({ ...editingInsight, content: e.target.value })}
                  className="w-full p-2.5 border border-[#E9E9E4]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-[10px] text-[#071936] mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={editingInsight.coverImage || ''}
                  onChange={(e) => setEditingInsight({ ...editingInsight, coverImage: e.target.value })}
                  className="w-full p-2.5 border border-[#E9E9E4]"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setInsightModalOpen(false)}
                  className="px-4 py-2 border border-[#E9E9E4] uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#071936] text-white uppercase font-bold hover:bg-[#D9A21B]"
                >
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
