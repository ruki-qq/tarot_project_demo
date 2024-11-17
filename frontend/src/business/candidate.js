import { API_URL, $api } from "../api";

// [
//   {
//     "full_name": "Jessica Anderson",
//     "birth_date": "2003-12-21",
//     "birth_time": "19:59:58",
//     "hard_skills": "Git, Java, Node.js, RabbitMQ",
//     "soft_skills": "Conflict Resolution, Emotional Intelligence, Mentoring",
//     "bio": "Finish ago stock. Attention dog there hard hour. Herself form trip possible investment fine. Him level somebody find hard.",
//     "id": 1,
//     "is_favoured": false
//   },
// ]
export const getCandidates = async () => {
  const response = await $api.get(`${API_URL}/candidates`);
  const data = response.data;
  return data;
};

//   {
//     "full_name": "Jessica Anderson",
//     "birth_date": "2003-12-21",
//     "birth_time": "19:59:58",
//     "hard_skills": "Git, Java, Node.js, RabbitMQ",
//     "soft_skills": "Conflict Resolution, Emotional Intelligence, Mentoring",
//     "bio": "Finish ago stock. Attention dog there hard hour. Herself form trip possible investment fine. Him level somebody find hard.",
//     "id": 1,
//     "is_favoured": false
//   }
export const getCandidate = async (id) => {
  const response = await $api.get(`${API_URL}/candidates/${id}`);
  const data = response.data;
  return data;
};

//
export const createCandidate = async (candidate) => {
  const {
    full_name,
    birth_date,
    birth_time,
    hard_skills,
    soft_skills,
    bio,
  } = candidate;

  console.log({ candidate})

  const response = await $api.post(`${API_URL}/candidates`, {
    full_name,
    birth_date,
    birth_time,
    hard_skills,
    soft_skills,
    bio,
  });

  const data = response.data;

  return data;
};
