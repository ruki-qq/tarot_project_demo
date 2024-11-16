import react from "react";
import { useSearchParams } from "react-router-dom";

export const OraclePage = () => {
  const query = new URLSearchParams(window.location.search);

  console.log({ query: [...query.entries()] });

  const [searchParams, setSearhParams] = useSearchParams(query);

  console.log({ searchParams });
  return JSON.stringify(searchParams.team, null, 2);
};
