import { Alert, Col, Container, Row, NavLink } from "reactstrap";
import { NavLink as Link } from 'react-router-dom';
import R from 'pages/routes';
import ChemicalDetails from "./ChemicalDetails";
import ProjectCard from "./ProjectCard";
import ReactionCard from "./ReactionCard";

import '../../style.css'

const ReportDetails = () => {
    return (
        <Container fluid className="mt-2">
            <Alert color="light" isOpen>
                Details in this section are for report-purposes only and have no impact on the calculations performed by the tool.
            </Alert>

            <Row className="g-2">
                <Col md={6}>
                    <ProjectCard />
                </Col>
                <Col md={6}>
                    <ChemicalDetails />
                </Col>
            </Row>

            <Row className="mt-2">
                <Col>
                    <ReactionCard />
                </Col>
            </Row>
            <NavLink
                tag={Link}
                to={R.ROUTE_SDS}
                className="nav-btn nav-btn-right"
            >
                Next - Components
            </NavLink>
        </Container>
    );
};

export default ReportDetails;
