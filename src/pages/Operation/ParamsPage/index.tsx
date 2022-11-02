import { Col, Container, Row, NavLink } from "reactstrap";
import { NavLink as Link } from 'react-router-dom';
import R from 'pages/routes';
import { TemperatureCard, PressureCard, HeatOfReactionCard } from "./ValueCards";
import SideReactions from "./SideReactions";
import BasisSelector from "./BasisSelector";
import CpInput from "./CpInput";
import MfEntry from "./MfInput";

import "../../../style.css"

const OperatingParamsPage = () => {
    return (
        <Container className="mt-2">
            <Row className="mt-2 g-1">
                <Col sm={4}>
                    <TemperatureCard />
                </Col>
                <Col sm={4}>
                    <PressureCard />
                </Col>
                <Col sm={4}>
                    <HeatOfReactionCard />
                </Col>
            </Row>

            <div className="mt-2">
                <BasisSelector />
            </div>

            <div className="mt-2">
                <MfEntry />
            </div>

            <div className="mt-2">
                <CpInput />
            </div >

            <div className="mt-2">
                <SideReactions />
            </div>
            <NavLink
                tag={Link}
                to={R.ROUTE_SDS}
                className="nav-btn nav-btn-left"
            >
                Previous - Components
            </NavLink>
            <NavLink
                tag={Link}
                to={R.ROUTE_OPERATION_REPORT}
                className="nav-btn nav-btn-right"
            >
                Next - Generate Report
            </NavLink>
        </Container>
    );
};

export default OperatingParamsPage;
