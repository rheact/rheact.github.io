import { NavLink as Link, NavbarBrand } from 'reactstrap';

const AppNavbar = function AppNavbar() {
    return (
        <div
            className="d-flex align-items-center shadow-sm px-3"
            style={{ borderTop: '0.5rem solid lime', backgroundColor: 'white' }}
        >
            <NavbarBrand className="text-black fs-5 fw-bold me-auto">
                RHEACT
            </NavbarBrand>
            <Link>Tool</Link>
            <Link>About</Link>
        </div>
    );
};

export default AppNavbar;
