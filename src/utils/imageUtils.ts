// Smart fallback image utility tailored specifically to categories, titles, and roles

export const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  'Political PR': 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1200&q=80',
  'Political Communication': 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1200&q=80',
  'PR': 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1200&q=80',
  
  'Branding': 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80',
  'Identity': 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80',
  'Design System': 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80',
  
  'Digital Marketing': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
  'Communication': 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
  'Campaign': 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=1200&q=80',
  
  'Video Content': 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
  'Documentary': 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
  'Storytelling': 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
  
  'Business Consultancy': 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
  'Business Strategy': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
  'Strategy': 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
  
  'Graphic Design': 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=80',
  'Design': 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
  'Editorial': 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=80',
};

export const TITLE_SPECIFIC_IMAGES: Record<string, string> = {
  // Projects
  'Building a Public Narrative': 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1200&q=80',
  'From Identity to Recognition': 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80',
  'Turning Attention Into Engagement': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
  'Stories Designed to Move': 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
  'Strategic Positioning & Advisory': 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
  'Editorial Campaign Systems': 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=80',

  // Insights
  'Why Reputation Is Built Before It Is Needed': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
  'The Difference Between Visibility and Influence': 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
  'Why Every Brand Needs a Clear Narrative': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
  'Design Is Communication, Not Decoration': 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
  'What Makes a Digital Campaign Memorable?': 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=1200&q=80',
  'Strategy Before Content: Building a Better Communication System': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',

  // Team
  'Alexander Vance': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  'Eleanor Sterling': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
  'Hypecraft Senior Council': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
};

/**
 * Get a fallback image URL tailored to the title, category, or general context
 */
export function getContextFallbackImage(categoryOrTitle?: string, fallbackType?: string): string {
  if (categoryOrTitle && TITLE_SPECIFIC_IMAGES[categoryOrTitle]) {
    return TITLE_SPECIFIC_IMAGES[categoryOrTitle];
  }
  if (categoryOrTitle && CATEGORY_FALLBACK_IMAGES[categoryOrTitle]) {
    return CATEGORY_FALLBACK_IMAGES[categoryOrTitle];
  }
  
  if (fallbackType === 'team') {
    return 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80';
  }
  if (fallbackType === 'insight') {
    return 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80';
  }

  return 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1200&q=80';
}

/**
 * Image error handler that replaces e.currentTarget.src with context-aware fallback
 */
export function handleImageError(
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  categoryOrTitle?: string,
  fallbackType?: string
) {
  const target = e.currentTarget;
  const fallback = getContextFallbackImage(categoryOrTitle, fallbackType);
  if (target.src !== fallback) {
    target.src = fallback;
  }
}
