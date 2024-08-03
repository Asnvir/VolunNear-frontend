export const stripHtmlTags = (str) => {
  if (!str) return str;
  return str.replace(/<\/?[^>]+(>|$)/g, "");
};
