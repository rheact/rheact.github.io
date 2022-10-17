import { RheactState } from 'model';
import R from 'pages/routes';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { NavLink as Link } from 'react-router-dom';
import { Nav, NavLink } from 'reactstrap';
import LoadButton from '../Toolbar/Buttons/LoadButton';
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
            <NavButton icon="bi bi-question-circle-fill" label='User Guide' route={R.ROUTE_USER_GUIDE} />
            <span className='section-header'>Project</span>
            <div className='text-muted' style={{marginBottom: "1rem"}}>
                {title}
            </div>
            <div id="loadBtnWrapper">
                <LoadButton loadFn={loadFn} />
            </div>
            <NavButton icon="bi-pencil-fill" label='Details' route={R.ROUTE_OPERATION_DETAILS} />
            <NavButton icon="bi-gear" label='Components' route={R.ROUTE_SDS} />
            <NavButton icon="bi-box" label='Process Parameters' route={R.ROUTE_OPERATION_PARAMS} />
            <NavButton icon="bi-file-earmark-bar-graph-fill" label='Analysis' route={R.ROUTE_OPERATION_REPORT} />
            <span className='section-header'>PPE Evaluation</span>
            <NavButton icon="bi-box" label='Questionnaire' route={R.ROUTE_PPE_QUESTIONAIRE} />
            <NavButton icon="bi-file-earmark-bar-graph-fill" label='Report' route={R.ROUTE_PPE_REPORT} />
            <span className='section-header'>Documentation</span>
            <NavButton icon="bi bi-file-earmark-medical" label='License' route={R.ROUTE_LICENSE} />
            <NavButton icon="bi bi-award" label='Acknowledgements' route={R.ROUTE_ACKNOWLEDGEMENTS} />
            <NavButton icon="bi bi-book" label='Project Publications' route={R.ROUTE_PUBLICATIONS} />
            <NavButton icon="bi bi-envelope" label='Contact Us' route={R.ROUTE_CONTACT} />
        </Nav>
    );
};

export default ToolPages;
