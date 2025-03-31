import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicLayout from "./layouts/public/PublicLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import NarrativePage from "./pages/narratives/NarrativePage";
import CreateNarrativePage from "./pages/narratives/CreateNarrativePage";
import EditNarrativePage from "./pages/narratives/EditNarrativePage";
import ReportPage from "./pages/reports/ReportPage";
import CreateReportPage from "./pages/reports/CreateReportPage";
import EditReportPage from "./pages/reports/EditReportPage";
import ProtectedLayout from "./layouts/protected/ProtectedLayout";
import UserPage from "./pages/users/UserPage";
import CreateUserPage from "./pages/users/CreateUserPage";
import EditUserPage from "./pages/users/EditUserPage";
import DashboardPage from "./pages/DashboardPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <ProtectedLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "narratives",
        element: <NarrativePage />,
      },
      {
        path: "narratives/create",
        element: <CreateNarrativePage />,
      },
      {
        path: "narratives/edit/:id",
        element: <EditNarrativePage />,
      },
      {
        path: "reports",
        element: <ReportPage />,
      },
      {
        path: "reports/create",
        element: <CreateReportPage />,
      },
      {
        path: "reports/edit/:id",
        element: <EditReportPage />,
      },
      {
        path: "users",
        element: <UserPage />,
      },
      {
        path: "users/create",
        element: <CreateUserPage />,
      },
      {
        path: "users/edit/:id",
        element: <EditUserPage />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
