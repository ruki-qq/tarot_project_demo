import { API_URL, $api } from "../api";

// [
//     {
//         "full_name": "Mariah Williams",
//         "birth_date": "1995-07-08",
//         "birth_time": "13:40:42",
//         "hard_skills": "Django, Git, PostgreSQL, Rust",
//         "soft_skills": "Conflict Resolution, Leadership, Public Speaking",
//         "bio": "Professional System Architect with 3 years of experience in Engineering.\n\nPolicy again close factor itself prepare. Ago school sound pattern in feel where.\n\nSpecializing in Django, Git, PostgreSQL.\n\nBut great maintain left soldier true total. Reach statement according plan tough simple with.",
//         "position": "System Architect",
//         "department": "Engineering",
//         "id": 51,
//         "is_favoured": false,
//         "hire_date": "2021-03-09"
//     }
// ]
export const getEmployees = async () => {
  const response = await $api.get(`${API_URL}/employees`);
  const data = response.data;
  return data;
};

// {
//     "full_name": "Mariah Williams",
//     "birth_date": "1995-07-08",
//     "birth_time": "13:40:42",
//     "hard_skills": "Django, Git, PostgreSQL, Rust",
//     "soft_skills": "Conflict Resolution, Leadership, Public Speaking",
//     "bio": "Professional System Architect with 3 years of experience in Engineering.\n\nPolicy again close factor itself prepare. Ago school sound pattern in feel where.\n\nSpecializing in Django, Git, PostgreSQL.\n\nBut great maintain left soldier true total. Reach statement according plan tough simple with.",
//     "position": "System Architect",
//     "department": "Engineering",
//     "id": 51,
//     "is_favoured": false,
//     "hire_date": "2021-03-09"
// }
export const getEmployee = async (id) => {
  const response = await $api.get(`${API_URL}/employees/${id}`);
  const data = response.data;
  return data;
};

//
export const createEmployee = async ({
  full_name,
  birth_date,
  birth_time,
  hard_skills,
  soft_skills,
  bio,
  position,
  department,
}) => {
  const response = await $api.post(`${API_URL}/employees`, {
    full_name,
    birth_date,
    birth_time,
    hard_skills,
    soft_skills,
    bio,
    position,
    department,
  });

  const data = response.data;

  return data;
};
