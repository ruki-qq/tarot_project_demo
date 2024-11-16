import axios from "axios";
import { candidates } from "../data";

export const createCandidate = async (candidate) => {
  // const reponse = axios.post();
  const entry = { id: Math.round(Math.random() * 1000), ...candidate };
  candidates.push(entry);
  return entry;
};
