export const generateVideoAI = async (script) => {
  // Mock AI video generation
  return `https://example.com/generated/${Date.now()}.mp4`;
};

export const generateAutoTags = async (title, description, industry) => {
  const baseTags = title.split(' ').concat(description.split(' '));
  const industryTags = {
    fitness: ['workout', 'gym', 'training', 'health'],
    beauty: ['makeup', 'skincare', 'tutorial', 'cosmetics'],
    tech: ['AI', 'gadgets', 'tutorial', 'innovation']
  };
  return [...new Set([...baseTags, ...(industryTags[industry] || [])])].slice(0, 10);
};
