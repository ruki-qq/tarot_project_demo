import { Navigate } from "react-router-dom";
import { Login } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { CandidatesPage } from "./pages/CandidatesPage";
import { CandidatePage } from "./pages/CandidatePage";
import { EmployeesPage } from "./pages/EmployeesPage";
import { EmployeePage } from "./pages/EmployeePage";
import { TeamsPage } from "./pages/TeamsPage";
import { TeamPage } from "./pages/TeamPage";
import { TeamMatchingPage } from "./pages/TeamMatchingPage";
import { EmployeeMatchingPage } from "./pages/EmployeeMatchingPage";
import { CandidateMatchingPage } from "./pages/CandidateMatchingPage";
import { NewCandidatePage } from "./pages/NewCandidatePage";
import { Register } from "./pages/RegisterPage";
import { NewEmployeePage } from "./pages/NewEmployeePage";

export { API_URL } from "./api";

export const routes = {
  unAuthorized: [
    {
      path: "/signin",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Register />,
    },
    {
      path: "*",
      element: <Navigate to="/signin" />,
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
      path: "/candidate/:id",
      element: <CandidatePage />,
    },
    {
      path: "/team-matching/:id",
      element: <TeamMatchingPage />,
    },
    {
      path: "/employee-matching/:id",
      element: <EmployeeMatchingPage />,
    },
    {
      path: "/candidate-matching/:id",
      element: <CandidateMatchingPage />,
    },
    {
      path: "/candidates/new",
      element: <NewCandidatePage />,
    },
    {
      path: "/employees/new",
      element: <NewEmployeePage />,
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
