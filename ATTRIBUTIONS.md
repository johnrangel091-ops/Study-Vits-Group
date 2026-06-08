import { createBrowserRouter } from "react-router";
import { AppLayout } from "./components/AppLayout";
import { LandingPage } from "./components/LandingPage";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { Dashboard } from "./components/Dashboard";
import { WorkGenerator } from "./components/WorkGenerator";
import { PDFSummarizer } from "./components/PDFSummarizer";
import { ICFESSimulator } from "./components/ICFESSimulator";
import { UserProfile } from "./components/UserProfile";
import { SubscriptionPage } from "./components/SubscriptionPage";
import { AdminPanel } from "./components/AdminPanel";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/registro",
    Component: RegisterPage,
  },
  {
    path: "/app",
    Component: AppLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "generador", Component: WorkGenerator },
      { path: "resumen-pdf", Component: PDFSummarizer },
      { path: "simulacros", Component: ICFESSimulator },
      { path: "perfil", Component: UserProfile },
      { path: "suscripcion", Component: SubscriptionPage },
      { path: "admin", Component: AdminPanel },
    ],
  },
]);
