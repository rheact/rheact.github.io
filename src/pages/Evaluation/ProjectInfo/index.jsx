import { Alert, Col, Container, Row } from "reactstrap";
import ChemicalDetails from "./ChemicalDetails";
import ProjectCard from "./ProjectCard";
import ReactionCard from "./ReactionCard";

import '../../../style.css'

const ReportDetails = ({ nextButton }) => {
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
            {nextButton}
        </Container>
    );
};

export default ReportDetails;
