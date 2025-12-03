export const TermCategory = {
  DRUG: 'İlaçlar',
  PLANT: 'Bitkiler',
  VITAMIN: 'Vitaminler',
  MINERAL: 'Mineraller',
  INSECT: 'Böcekler',
  COMPONENT: 'Bileşenler',
  DISEASE: 'Hastalıklar',
  ANATOMY: 'Anatomi'
};

export const ALL_CATEGORIES = [
  TermCategory.DRUG,
  TermCategory.PLANT,
  TermCategory.VITAMIN,
  TermCategory.MINERAL,
  TermCategory.INSECT,
  TermCategory.COMPONENT,
  TermCategory.DISEASE,
  TermCategory.ANATOMY
];

export const getCategoryIcon = (category) => {
  const icons = {
    [TermCategory.DRUG]: '💊',
    [TermCategory.PLANT]: '🌿',
    [TermCategory.VITAMIN]: '💉',
    [TermCategory.MINERAL]: '💎',
    [TermCategory.INSECT]: '🐛',
    [TermCategory.COMPONENT]: '⚗️',
    [TermCategory.DISEASE]: '🏥',
    [TermCategory.ANATOMY]: '🫀'
  };
  return icons[category] || '📋';
};

export const getCategoryColor = (category) => {
  const colors = {
    [TermCategory.DRUG]: '#3B82F6', // blue
    [TermCategory.PLANT]: '#10B981', // green
    [TermCategory.VITAMIN]: '#F97316', // orange
    [TermCategory.MINERAL]: '#8B5CF6', // purple
    [TermCategory.INSECT]: '#92400E', // brown
    [TermCategory.COMPONENT]: '#EF4444', // red
    [TermCategory.DISEASE]: '#EC4899', // pink
    [TermCategory.ANATOMY]: '#6366F1' // indigo
  };
  return colors[category] || '#3B82F6';
};

export const getCategoryGradient = (category) => {
  const gradients = {
    [TermCategory.DRUG]: ['#3B82F6', '#60A5FA', '#93C5FD'],
    [TermCategory.PLANT]: ['#10B981', '#34D399', '#6EE7B7'],
    [TermCategory.VITAMIN]: ['#F97316', '#FB923C', '#FDBA74'],
    [TermCategory.MINERAL]: ['#8B5CF6', '#A78BFA', '#C4B5FD'],
    [TermCategory.INSECT]: ['#92400E', '#B45309', '#D97706'],
    [TermCategory.COMPONENT]: ['#EF4444', '#F87171', '#FCA5A5'],
    [TermCategory.DISEASE]: ['#EC4899', '#F472B6', '#F9A8D4'],
    [TermCategory.ANATOMY]: ['#6366F1', '#818CF8', '#A5B4FC']
  };
  return gradients[category] || ['#3B82F6', '#60A5FA', '#93C5FD'];
};

