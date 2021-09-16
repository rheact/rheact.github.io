import { Collapse, Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';

const ToolNavbar = () => {
  return (
    <Navbar color="light" light expand="xs" className="px-2">
      <NavbarBrand className="fw-bolder">RHEACT</NavbarBrand>
      <Collapse className="ms-auto" isOpen navbar>
        <Nav navbar>
          <NavItem>
            <NavLink>Tool</NavLink>
          </NavItem>
          <NavItem>
            <NavLink>Guide</NavLink>
          </NavItem>
          <NavItem>
            <NavLink>About</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default ToolNavbar;
