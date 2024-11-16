export const useQueryParams = () => {
  const query = new URLSearchParams(window.location.search);
  return Object.fromEntries(query.entries());
};
