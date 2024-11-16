import { Navigate } from "react-router-dom";
import { Login } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { CandidatesPage } from "./pages/CandidatesPage";
import { EmployeesPage } from "./pages/EmployeesPage";
import { EmployeePage } from "./pages/EmployeePage";
import { TeamsPage } from "./pages/TeamsPage";
import { TeamPage } from "./pages/TeamPage";
import { TeamMatchingPage } from "./pages/TeamMatchingPage";

export const API_URL = "http://localhost:8000";

export const routes = {
  unAuthorized: [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "*",
      element: <Navigate to="/login" />,
    },
  ],
  authorized: [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/team/:id",
      element: <TeamPage />,
    },
    {
      path: "/employee/:id",
      element: <EmployeePage />,
    },
    {
      path: "/team-matching/:id",
      element: <TeamMatchingPage />,
    },
    {
      path: "/candidates",
      element: <CandidatesPage />,
    },
    {
      path: "/employees",
      element: <EmployeesPage />,
    },
    {
      path: "/teams",
      element: <TeamsPage />,
    },
    {
      path: "/login",
      element: <Navigate to="/" />,
    },
  ],
};
