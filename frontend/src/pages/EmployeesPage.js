import { candidates } from "../data";
import { Candidate } from "../components/Candidate";

export const EmployeesPage = () => {
  return (
    <div style={{ padding: "50px", background: "#f0f2f5" }}>
      {candidates.map((candidate) => (
        <Candidate candidate={candidate} />
      ))}
    </div>
  );
};
