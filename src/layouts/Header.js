import React from "react";
import { Link ,useLocation } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import { ReactComponent as LogoWhite } from "../assets/images/logos/xtremelogowhite.svg";
import user1 from "../assets/images/users/user1.jpg";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  let location = useLocation();

  const EASnumber = location.pathname.lastIndexOf('EAS');
  const CRMnumber = location.pathname.lastIndexOf('CRM');
  const PMSnumber = location.pathname.lastIndexOf('PMS');
  const Adminnumber = location.pathname.lastIndexOf('Admin');
  
  return (
    <Navbar color="primary" dark expand="md">
      <Collapse navbar isOpen={isOpen} style={{paddingLeft:'91%'}}>
        <Nav className="me-auto" navbar>
          <UncontrolledDropdown inNavbar nav>
            <DropdownToggle caret nav>
              {EASnumber >= 1 ? 'EAS' 
              : CRMnumber >= 1 ? 'CRM' 
              : PMSnumber >= 1 ? 'PMS' 
              : Adminnumber >= 1 ? 'Admin Page'
              : '시스템 선택'}
            </DropdownToggle>
            <DropdownMenu end>
            <Link to="EAS/starter" className="nav-link">
            <DropdownItem>EAS</DropdownItem>
            </Link>
            <Link to="/CRM/starter" className="nav-link">
            <DropdownItem>CRM</DropdownItem>
            </Link>
            <Link to="/PMS/starter" className="nav-link">
            <DropdownItem>PMS</DropdownItem>
            </Link>
            <DropdownItem divider />
            <Link to="/Admin/starter" className="nav-link">
            <DropdownItem>Admin Page</DropdownItem>
            </Link>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
