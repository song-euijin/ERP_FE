import { Button, Nav, NavItem } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";

const EAS = [
  {
    title: "EAS 메뉴[수정필요]",
    href: "/EAS/starter",
    icon: "bi bi-speedometer2",
  },
];

const CRM = [
  {
    title: "CRM 메뉴[수정필요]",
    href: "/CRM/starter",
    icon: "bi bi-speedometer2",
  },
];
const PMS = [
  {
    title: "프로젝트 생성",
    href: "/PMS/starter",
    icon: "bi bi-speedometer2",
  },
  {
    title: "프로젝트 관리",
    href: "/PMS/ProjectList",
    icon: "bi bi-speedometer2",
  },
];

const Admin = [
  {
    title: "Admin 메뉴[수정필요]",
    href: "/Admin/starter",
    icon: "bi bi-speedometer2",
  },
  {
    title: "사용자 목록",
    href: "/Admin/UserList",
    icon: "bi bi-speedometer2",
  },
  {
    title: "사용자 등록",
    href: "/Admin/UserReg",
    icon: "bi bi-speedometer2",
  },
  {
    title: "공통 코드 목록",
    href: "/Admin/CCodeList",
    icon: "bi bi-speedometer2",
  },
  {
    title: "부서 관리",
    href: "/Admin/DeptManage",
    icon: "bi bi-speedometer2",
  },
];

const defalutSideBar = [
  {
    title: "Dashboard",
    href: "/starter",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Alert",
    href: "/alerts",
    icon: "bi bi-bell",
  },
  {
    title: "Badges",
    href: "/badges",
    icon: "bi bi-patch-check",
  },
  {
    title: "Buttons",
    href: "/buttons",
    icon: "bi bi-hdd-stack",
  },
  {
    title: "Cards",
    href: "/cards",
    icon: "bi bi-card-text",
  },
  {
    title: "Grid",
    href: "/grid",
    icon: "bi bi-columns",
  },
  {
    title: "Table",
    href: "/table",
    icon: "bi bi-layout-split",
  },
  {
    title: "Forms",
    href: "/forms",
    icon: "bi bi-textarea-resize",
  },
  {
    title: "Breadcrumbs",
    href: "/breadcrumbs",
    icon: "bi bi-link",
  },
  {
    title: "About",
    href: "/about",
    icon: "bi bi-people",
  },
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  const EASnumber = location.pathname.lastIndexOf("EAS");
  const CRMnumber = location.pathname.lastIndexOf("CRM");
  const PMSnumber = location.pathname.lastIndexOf("PMS");
  const Adminnumber = location.pathname.lastIndexOf("Admin");

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <Logo />
        {/* 세연로고  */}
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={() => showMobilemenu()}
        ></Button>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {EASnumber >= 1
            ? EAS.map((navi, index) => (
                <NavItem key={index} className="sidenav-bg">
                  <Link
                    to={navi.href}
                    className={
                      location.pathname === navi.href
                        ? "text-primary nav-link py-3"
                        : "nav-link text-secondary py-3"
                    }
                  >
                    <i className={navi.icon}></i>
                    <span className="ms-3 d-inline-block">{navi.title}</span>
                  </Link>
                </NavItem>
              ))
            : CRMnumber >= 1
            ? CRM.map((navi, index) => (
                <NavItem key={index} className="sidenav-bg">
                  <Link
                    to={navi.href}
                    className={
                      location.pathname === navi.href
                        ? "text-primary nav-link py-3"
                        : "nav-link text-secondary py-3"
                    }
                  >
                    <i className={navi.icon}></i>
                    <span className="ms-3 d-inline-block">{navi.title}</span>
                  </Link>
                </NavItem>
              ))
            : PMSnumber >= 1
            ? PMS.map((navi, index) => (
                <NavItem key={index} className="sidenav-bg">
                  <Link
                    to={navi.href}
                    className={
                      location.pathname === navi.href
                        ? "text-primary nav-link py-3"
                        : "nav-link text-secondary py-3"
                    }
                  >
                    <i className={navi.icon}></i>
                    <span className="ms-3 d-inline-block">{navi.title}</span>
                  </Link>
                </NavItem>
              ))
            : Adminnumber >= 1
            ? Admin.map((navi, index) => (
                <NavItem key={index} className="sidenav-bg">
                  <Link
                    to={navi.href}
                    className={
                      location.pathname === navi.href
                        ? "text-primary nav-link py-3"
                        : "nav-link text-secondary py-3"
                    }
                  >
                    <i className={navi.icon}></i>
                    <span className="ms-3 d-inline-block">{navi.title}</span>
                  </Link>
                </NavItem>
              ))
            : defalutSideBar.map((navi, index) => (
                <NavItem key={index} className="sidenav-bg">
                  <Link
                    to={navi.href}
                    className={
                      location.pathname === navi.href
                        ? "text-primary nav-link py-3"
                        : "nav-link text-secondary py-3"
                    }
                  >
                    <i className={navi.icon}></i>
                    <span className="ms-3 d-inline-block">{navi.title}</span>
                  </Link>
                </NavItem>
              ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
