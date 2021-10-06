import { Button, Collapse, Nav, Navbar, NavItem } from 'reactstrap';
import { NavLink } from 'reactstrap';

const ToolNavbar = () => {
  return (
    <>
      <Navbar className="d-flex justify-content-center p-0 shadow-sm" style={{ zIndex: 10, background: "linear-gradient(180deg, rgba(239,255,0,1) 0%, rgba(255,186,0,1) 100%)" }}>
        <span className="fs-5 fw-bold" style={{ fontFamily: "Futura" }}>RHEACT</span>
      </Navbar>
      <Navbar color="light" light expand="xs" className="px-2 d-flex justify-content-between">
        <Collapse isOpen>
          <Nav navbar>
            <NavItem>
              <NavLink to="/">Tool</NavLink>
            </NavItem>

            <NavItem>
              <NavLink to="/about">About</NavLink>
            </NavItem>
          </Nav>
        </Collapse>

        <div>
          <Button size="sm" color="success"> <i className="bi-save-fill" /> Save </Button>
          <Button size="sm" color="info" className="ms-1"> <i className="bi-cloud-upload-fill" /> Load </Button>
        </div>
      </Navbar>
    </>
  );
};

export default ToolNavbar;
