import { Col, Container, Row } from "reactstrap";
import AlertReportOnly from "./AlertReportOnly";
import ChemicalDetails from "./ChemicalDetails";
import ProjectCard from "./ProjectCard";
import ReactionCard from "./ReactionCard";
import SideReactions from "./SideReactionsCard";

const ReportDetails = () => {
    return (
        <Container className="mt-2">
            <AlertReportOnly />

            <Row>
                <Col>
                    <ReactionCard />
                </Col>
            </Row>

            <Row className="mt-2 g-2">
                <Col md={6}>
                    <ProjectCard />
                </Col>
                <Col md={6}>
                    <ChemicalDetails />
                </Col>
            </Row>

            <Row className="mt-2">
                <Col>
                    <SideReactions />
                </Col>
            </Row>
        </Container>
    );
};

export default ReportDetails;
