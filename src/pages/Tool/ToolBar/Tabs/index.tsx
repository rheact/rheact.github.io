import { FC } from 'react';
import { NavLink as Link } from 'react-router-dom';
import { Nav, NavLink } from 'reactstrap';
import R from '../../routes';

type FormatButtonProps = {
    icon: string,
    route: string,
};

const FormatNavTab: FC<FormatButtonProps> = function ({ icon, route, children }) {
    return (
        <NavLink
            className="text-center"
            tag={Link}
            to={route}
        >
            <i className={icon} />
            {' '}
            {children}
        </NavLink>
    );
};

const ToolPages: FC<any> = function ({ classname }) {
    return (
        <Nav tabs className={classname}>
            <FormatNavTab icon="bi-box" route={R.ROUTE_OPERATION_DETAILS}>
                Operation Details
            </FormatNavTab>
            <FormatNavTab
                icon="bi-pencil-fill"
                route={R.ROUTE_REPORT_DETAILS}
            >
                Report Details
            </FormatNavTab>
            <FormatNavTab
                icon="bi bi-file-earmark-bar-graph-fill"
                route={R.ROUTE_RESULTS}
            >
                Report
            </FormatNavTab>
        </Nav>
    );
};

export default ToolPages;
