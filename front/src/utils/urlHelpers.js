export const formatCategoryToUrl = (category) => 
  category.toLowerCase().replace(/\s+/g, '-');

export const formatUrlToCategory = (urlCategory) =>
  urlCategory.replace(/-/g, ' ');
