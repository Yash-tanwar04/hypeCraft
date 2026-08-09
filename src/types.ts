export interface Project {
  id?: string;
  title: string;
  slug: string;
  category: 'Political PR' | 'Digital Marketing' | 'Branding' | 'Video Content' | 'Graphic Design' | 'Business Consultancy' | string;
  year: string;
  shortDescription: string;
  challenge: string;
  objective: string;
  strategy: string;
  creativeDirection: string;
  execution: string;
  outcome?: string;
  heroImage: string;
  galleryImages: string[];
  tags: string[];
  featured: boolean;
  published: boolean;
  isConcept?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Insight {
  id?: string;
  title: string;
  slug: string;
  category: 'PR' | 'Political Communication' | 'Digital Marketing' | 'Branding' | 'Design' | 'Business Strategy' | 'Communication' | string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  readingTime: string;
  tags: string[];
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Enquiry {
  id?: string;
  name: string;
  organization: string;
  email: string;
  phone: string;
  service: string;
  projectType: string;
  budgetRange: string;
  timeline: string;
  message: string;
  status: 'new' | 'contacted' | 'in_discussion' | 'converted' | 'closed';
  createdAt: string;
}

export interface TeamMember {
  id?: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
  displayOrder: number;
  published: boolean;
}

export interface ServiceDetail {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  capabilities: string[];
  heroImage: string;
  ecosystem?: { step: string; label: string; desc: string }[];
  principles?: string[];
}
