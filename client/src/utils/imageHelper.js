// Helper function to get the correct image URL
// Handles both Cloudinary URLs and legacy local file paths
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  
  // If it's already a full URL (starts with http:// or https://), return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Otherwise, it's a local file path, prepend backend URL
  return `${import.meta.env.VITE_BACKEND_URL}/images/${imagePath}`;
};
