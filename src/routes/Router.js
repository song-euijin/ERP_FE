import { lazy } from "react";
import { Navigate } from "react-router-dom";
import UserInfo from "../views/Admin/UserInfo.js";
import UserList from "../views/Admin/UserList.js";
import UserReg from "../views/Admin/UserReg.js";
import CCodeList from "../views/Admin/CCodeList.js";
import DeptManage from "../views/Admin/DeptManage.js";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages!! ****/

const Starter = lazy(() => import("../views/Starter.js"));
const EASStarter = lazy(() => import("../views/EAS/Starter.js"));
const CRMStarter = lazy(() => import("../views/CRM/Starter.js"));
const PMSStarter = lazy(() => import("../views/PMS/Starter.js"));
const ProjectList = lazy(() => import("../views/PMS/ProjectList.js"));
const AdminStarter = lazy(() => import("../views/Admin/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/starter" /> },
      { path: "/starter", exact: true, element: <Starter /> },
      { path: "/EAS/starter", exact: true, element: <EASStarter /> },
      { path: "/CRM/starter", exact: true, element: <CRMStarter /> },
      { path: "/PMS/starter", exact: true, element: <PMSStarter /> },
      { path: "/PMS/ProjectList", exact: true, element: <ProjectList /> },
      { path: "/Admin/starter", exact: true, element: <AdminStarter /> },
      { path: "/Admin/UserList", exact: true, element: <UserList /> },
      { path: "/Admin/UserReg", exact: true, element: <UserReg /> },
      { path: "/Admin/UserInfo", exact: true, element: <UserInfo /> },
      { path: "/Admin/CCodeList", exact: true, element: <CCodeList /> },
      { path: "/Admin/DeptManage", exact: true, element: <DeptManage /> },
      { path: "/about", exact: true, element: <About /> },
      { path: "/alerts", exact: true, element: <Alerts /> },
      { path: "/badges", exact: true, element: <Badges /> },
      { path: "/buttons", exact: true, element: <Buttons /> },
      { path: "/cards", exact: true, element: <Cards /> },
      { path: "/grid", exact: true, element: <Grid /> },
      { path: "/table", exact: true, element: <Tables /> },
      { path: "/forms", exact: true, element: <Forms /> },
      { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
    ],
  },
];

export default ThemeRoutes;
