import { Alert, Col, Container, Row } from "reactstrap";
import ProjectDetailsCard from "./projectDetailsCard";
import ComponentsCard from './componentsCard';
import OperatingParametersCard from './operatingParametersCard';

import '../../../style.css'

type MOCProps = {
    prevButton?: React.ReactNode
    nextButton?: React.ReactNode
}

const DetailsPage = ({ nextButton }: MOCProps) => {
    return (
        <Container fluid className="mt-2">
            <div className="alert alert-success fade show">
                This RHEACT feature provides various recommendations to the user during a Management of Change (MOC) process. An MOC is used to ensure that the health, safety and environmental risks are properly evaluated and managed during various change events. The user first answers a series of questions and enters some operating parameters and chemical information. This information is used to recommend actions that the user needs to take for various change events. Link to MOC Guide Flowchart.
            </div>
            <Alert color="light" isOpen>
                Details in this section are for report-purposes only.
            </Alert>
            <Row className="mt-2">
                <Col>
                    <ProjectDetailsCard />
                </Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <ComponentsCard />
                </Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <OperatingParametersCard />
                </Col>
            </Row>
            {nextButton}
        </Container>
    );
};

export default DetailsPage;
