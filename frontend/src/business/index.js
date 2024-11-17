export const searchCandidate = (candidates, search) => {
  const text = search.toLowerCase().replaceAll(" ", "");

  return candidates.filter((candidate) => {
    return (
      candidate.full_name.toLowerCase().replaceAll(" ", "").includes(text) ||
      candidate.bio.toLowerCase().replaceAll(" ", "").includes(text) ||
      candidate.hard_skills
        .toLowerCase()
        .replaceAll(" ", "")
        .replaceAll(",", "")
        .includes(text) ||
      candidate.soft_skills
        .toLowerCase()
        .replaceAll(" ", "")
        .replaceAll(",", "")
        .includes(text)
    );
  });
};

export const searchEmployee = (employees, search) => {
  const text = search.toLowerCase().replaceAll(" ", "");

  return employees.filter((employee) => {
    return (
      employee.full_name.toLowerCase().replaceAll(" ", "").includes(text) ||
      employee.bio.toLowerCase().replaceAll(" ", "").includes(text) ||
      employee.hard_skills
        .toLowerCase()
        .replaceAll(" ", "")
        .replaceAll(",", "")
        .includes(text) ||
      employee.soft_skills
        .toLowerCase()
        .replaceAll(" ", "")
        .replaceAll(",", "")
        .includes(text)
    );
  });
};

export const searchTeam = (teams, search) => {
  const text = search.toLowerCase().replaceAll(" ", "");

  return teams.filter((team) => {
    return (
      team.name.toLowerCase().replaceAll(" ", "").includes(text) ||
      team.description.toLowerCase().replaceAll(" ", "").includes(text)
    );
  });
};
