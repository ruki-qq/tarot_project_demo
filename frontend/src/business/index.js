export const searchCandidate = (candidates, search) => {
  const text = search.toLowerCase().replaceAll(" ", "");

  return candidates.filter((candidate) => {
    return (
      candidate.name.toLowerCase().replaceAll(" ", "").includes(text) ||
      candidate.jobTitle.toLowerCase().replaceAll(" ", "").includes(text) ||
      candidate.skills
        .map((x) => x.toLowerCase())
        .join("")
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
