import { API_URL, $api } from "../api";
import qs from "qs";

// {
//     "id": 3,
//     "email": "hr-001@naimix.ru",
//     "is_active": true,
//     "is_superuser": false,
//     "is_verified": false
// }
export const singUp = async ({ login, password }) => {
  const response = await $api.post(`${API_URL}/auth/register`, {
    email: login,
    password,
  });

  const data = response.data;

  return data;
};

// {
//     "access_token": "6G6mmRqs1jS6EzgcepPhe8BVZ-BlY_h5gcmo5Ei3Sa0",
//     "token_type": "bearer"
// }
export const signIn = async ({ login, password }) => {
  const response = await $api.post(
    `${API_URL}/auth/login`,
    qs.stringify({
      grant_type: "password",
      username: login,
      password,
      client_id: "string",
      client_secret: "string",
    })
  );

  const data = response.data;

  return data;
};

export const getUser = async () => {
  const response = await $api.get(`${API_URL}/users/me`);
  const data = response.data;
  return data;
};
