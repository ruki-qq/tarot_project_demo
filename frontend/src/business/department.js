import { API_URL, $api } from "../api";

// [
//     {
//       "name": "Sales",
//       "description": "Leader table crime college. Focus know nothing detail whom science toward inside.",
//       "id": 1
//     },
// ]
export const getDepartments = async () => {
  const response = await $api.get(`${API_URL}/departments`);
  const data = response.data;
  return data;
};
