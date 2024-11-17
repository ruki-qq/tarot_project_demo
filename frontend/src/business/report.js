import { API_URL, $api } from "../api";
import { isEmpty } from "../utils";
import { loremIpsum } from "lorem-ipsum";

// [
//     {
//       "compatibility_score": 0,
//       "tarot_reading": "string",
//       "candidate_id": 125,
//       "id": 3,
//       "created_at": "2024-11-17T10:24:52.983452",
//       "employees": [
//         {
//           "full_name": "Patrick Chavez",
//           "birth_date": "1971-01-18",
//           "birth_time": "00:01:09",
//           "hard_skills": "CI/CD, Kubernetes, PostgreSQL, Redis, SQL",
//           "soft_skills": "Adaptability, Creativity, Leadership, Project Management, Team Work",
//           "bio": "Professional Senior Developer with 6 years of experience.\n\nHerself her join book civil wish. Fly animal sit. Loss hundred stuff upon.\n\nSpecializing in CI/CD, Kubernetes, PostgreSQL.\n\nOne form water former.",
//           "position": "Senior Developer",
//           "department_id": 18,
//           "hire_date": "2018-04-10",
//           "id": 88,
//           "department": {
//             "name": "Schmidt Group Department",
//             "description": "And edge though serve. Agent add small early.\nSource against room answer lay. Man factor member success. According open international enough tax defense career land.",
//             "id": 18
//           },
//           "is_favoured": false
//         }
//       ]
//     }
// ]
export const getReport = async ({ candidate, employee }) => {
  const response = await $api.get(
    `${API_URL}/reports/candidate/${candidate.id}/employee/${employee.id}`,
    { validateStatus: () => true }
  );

  if (response.status !== 200) {
    return undefined;
  }

  const data = {
    ...response.data[0],
    score: response.data[0].compatibility_score,
  };

  return data;
};

export const createReport = async ({ candidate, employee }) => {
  const response = await $api.post(`${API_URL}/reports`, {
    compatibility_score: Math.random(),
    tarot_reading: loremIpsum({ count: 30, units: "words" }),
    candidate_id: candidate.id,
    employees_ids: [employee.id],
  });

  const data = response.data;

  return data;
};

export const getOrCreateReport = async ({ candidate, employee }) => {
  const report = await getReport({ candidate, employee });

  // если репорт есть - возвращаем
  if (!isEmpty(report)) {
    return report;
  }

  await createReport({
    candidate,
    employee,
  });

  return getReport({ candidate, employee });
};
