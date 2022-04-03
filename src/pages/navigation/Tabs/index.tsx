import { FC } from 'react';
import { NavLink as Link } from 'react-router-dom';
import {  Nav, NavLink } from 'reactstrap';
import R from '../../routes';

type FormatButtonProps = {
    icon: string,
    route: string,
    label: string,
};

const FormatNavTab: FC<FormatButtonProps> = function ({ icon, route, label }) {
    return (
        <NavLink
            className="text-center text-black"
            tag={Link}
            to={route}
        >
            <i className={icon} />
            {' '}
            {label}
        </NavLink>
    );
};

const ToolPages: FC<any> = function ({ classname }) {
    const tabs = [
        {
            icon: "bi-gear",
            route: R.ROUTE_SDS,
            label: "SDS",
        },
        {
            icon: "bi-box",
            route: R.ROUTE_OPERATION_PARAMS,
            label: "Operation Parameters",
        },
        {
            icon: "bi-file-earmark-bar-graph-fill",
            route: R.ROUTE_OPERATION_REPORT,
            label: "Operation Report",
        },
        {
            icon: "bi-file-earmark-bar-graph-fill",
            route: R.ROUTE_PPE_QUESTIONAIRE,
            label: "PPE Questionaire",
        },
        {
            icon: "bi-file-earmark-bar-graph-fill",
            route: R.ROUTE_PPE_REPORT,
            label: "PPE Report",
        },
        {
            icon: "bi-pencil-fill",
            route: R.ROUTE_OPERATION_DETAILS,
            label: "Optional Information",
        },
    ];
    return (
        <Nav tabs className={classname}>
            {tabs.map((e) => (
                <FormatNavTab
                    key={e.label}
                    icon={e.icon}
                    route={e.route}
                    label={e.label}
                />
            ))}
        </Nav>
    );
};

export default ToolPages;
