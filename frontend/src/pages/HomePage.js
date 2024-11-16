import react from "react";
import Candidate from "../components/Candidate";
import { candidates, teams } from "../data";
import { TeamMatchingPage } from "./TeamMatchingPage";

export const HomePage = () => {
  const team = teams[0];

  return <TeamMatchingPage team={team} candidates={candidates} />;
};
