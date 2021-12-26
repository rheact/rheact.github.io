import { Col, Container, Row } from "reactstrap";
import { CpCard, HeatCard, PressureCard, TemperatureCard } from "./ParamCards";
import SideReactions from "./SideReactions";

const OperatingParamsPage = () => {
    return (
        <Container className="mt-2">
            <Row className="mt-2 g-1">
                <Col md={3} sm={6}>
                    <TemperatureCard />
                </Col>
                <Col md={3} sm={6}>
                    <PressureCard />
                </Col>
                <Col md={3} sm={6}>
                    <HeatCard />
                </Col>
                <Col md={3} sm={6}>
                    <CpCard />
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

export default OperatingParamsPage;
