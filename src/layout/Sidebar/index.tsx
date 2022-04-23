import { RheactState } from 'model';
import R from 'pages/routes';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { NavLink as Link } from 'react-router-dom';
import { Nav, NavLink } from 'reactstrap';
import OnlineStatus from './OnlineStatus';
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

const ToolPages: FC = function () {
    const title = useSelector<RheactState, string | undefined>(state => state.info.projectTitle);

    return (
        <Nav vertical id="sidebar">
            <div className='d-flex justify-content-between align-items-center'>
                <span className="navbar-brand"> Rheact </span>
                <span> <OnlineStatus/> </span>
            </div>
            <div className='text-muted'>
                {title}
            </div>

            <span className='section-header'>Project</span>
            <NavButton icon="bi-gear" label='Components' route={R.ROUTE_SDS} />
            <NavButton icon="bi-pencil-fill" label='Details' route={R.ROUTE_OPERATION_DETAILS} />
            <span className='section-header'>Operation</span>
            <NavButton icon="bi-box" label='Parameters' route={R.ROUTE_OPERATION_PARAMS} />
            <NavButton icon="bi-file-earmark-bar-graph-fill" label='Report' route={R.ROUTE_OPERATION_REPORT} />
            <span className='section-header'>PPE</span>
            <NavButton icon="bi-box" label='Questionnaire' route={R.ROUTE_PPE_QUESTIONAIRE} />
            <NavButton icon="bi-file-earmark-bar-graph-fill" label='Report' route={R.ROUTE_PPE_REPORT} />
        </Nav>
    );
};

export default ToolPages;
