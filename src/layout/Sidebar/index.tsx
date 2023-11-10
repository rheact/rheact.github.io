import { RheactState } from 'model';
import R from 'pages/routes';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { NavLink as Link } from 'react-router-dom';
import { Nav, NavLink } from 'reactstrap';

import './sidebar.css';

type FormatButtonProps = {
    icon: string,
    route: string,
    label: string,
};

const NavButton: FC<FormatButtonProps> = function ({ icon, route, label }) {
    return (
        <NavLink
            tag={Link}
            to={route}
            className="my-1"
        >
            <i className={`bi ${icon} me-2`} />
            {' '}
            {label}
        </NavLink>
    );
};

type ToolPagesProps = {
    loadFn: Function
};

const ToolPages: FC<ToolPagesProps> = function ({ loadFn }) {
    const title = useSelector<RheactState, string | undefined>(state => state.info.projectTitle);

    return (
        <Nav vertical id="sidebar">
            <div className='d-flex justify-content-between align-items-center'>
                <span className="navbar-brand" style={{fontWeight: "bold"}}> RHEACT </span>
            </div>
            <div className='full-name'>Reactive Hazard Evaluation Analysis and Compilation Tool</div>
            <NavButton icon="bi-house" label='Welcome' route={R.ROUTE_WELCOME} />
            <NavButton icon="bi bi-question-circle" label='User Guide' route={R.ROUTE_USER_GUIDE} />
            <NavButton icon="bi bi-pencil" label='Evaluate System' route={R.ROUTE_EVALUATION} />
            <NavButton icon="bi-box" label='PPE Evaluation' route={R.ROUTE_PPE_EVALUATION} />
            <NavButton icon="bi bi-list-check" label='MOC Guide' route={R.ROUTE_MOC_GUIDE} />
            <NavButton icon="bi bi-calculator" label='Protective Action Criteria' route={R.ROUTE_PAC} />
            <NavButton icon="bi bi-link-45deg" label='Additional Safety Resources' route={R.ROUTE_RESOURCE_LINKS} />
            <NavButton icon="bi bi-file-earmark-medical" label='License' route={R.ROUTE_LICENSE} />
            <NavButton icon="bi bi-award" label='Acknowledgements' route={R.ROUTE_ACKNOWLEDGEMENTS} />
            <NavButton icon="bi bi-book" label='Project References' route={R.ROUTE_REFERENCES} />
            <NavButton icon="bi bi-envelope" label='Contact Us' route={R.ROUTE_CONTACT} />
        </Nav>
    );
};

export default ToolPages;
