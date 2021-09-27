import { Button, Collapse, Nav, Navbar, NavbarBrand, NavItem } from 'reactstrap';
import { NavLink } from 'reactstrap';

const ToolNavbar = () => {
  return (
    <>
      <Navbar color="primary" dark expand="xs" className="px-2 d-flex justify-content-between">
        <Collapse isOpen>
          <Nav navbar>
            <NavItem>
              <NavLink to="/">Tool</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/guide">Guide</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/about">About</NavLink>
            </NavItem>
          </Nav>
        </Collapse>

        <div className="d-flex align-items-center">
          <img alt="rheact" src="/rheact.png" height="32px" width="32px" />
          <NavbarBrand className="fw-bolder">RHEACT</NavbarBrand>
        </div>

        <div>
          <Button size="sm" outline color="success"> <i className="bi-save-fill" /> Save </Button>
          <Button size="sm" outline color="info" className="ms-1"> <i className="bi-cloud-upload-fill" /> Load </Button>
        </div>
      </Navbar>
    </>
  );
};

export default ToolNavbar;
