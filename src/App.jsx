import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
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
import DetailNarrativePage from "./pages/narratives/DetailNarrativePage";
import useAuthStore from "./store/authStore";
import DetailReportPage from "./pages/reports/DetailReportPage";
import PoliceSectorPage from "./pages/policeSector/PoliceSectorPage";

const protectedLoader = async () => {
  try {
    const { checkAuth } = useAuthStore.getState();
    await checkAuth();

    const user = useAuthStore.getState().user;
    if (!user) return redirect("/login");

    return null;
  } catch (error) {
    return redirect("/login");
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <ProtectedLayout />,
    loader: protectedLoader,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "narratives",
        children: [
          { index: true, element: <NarrativePage /> },
          { path: "create/:reportId", element: <CreateNarrativePage /> },
          { path: ":id", element: <DetailNarrativePage /> },
          { path: "edit/:id", element: <EditNarrativePage /> },
        ],
      },
      {
        path: "reports",
        children: [
          { index: true, element: <ReportPage /> },
          { path: "create", element: <CreateReportPage /> },
          { path: ":id", element: <DetailReportPage /> },
          { path: "edit/:id", element: <EditReportPage /> },
        ],
      },
      {
        path: "police-sectors",
        children: [{ index: true, element: <PoliceSectorPage /> }],
      },
      {
        path: "users",
        children: [
          { index: true, element: <UserPage /> },
          { path: "create", element: <CreateUserPage /> },
          { path: "edit/:id", element: <EditUserPage /> },
        ],
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
