import { Col, Container, Row } from "reactstrap";
import { TemperatureCard, PressureCard, HeatOfReactionCard } from "./ValueCards";
import SideReactions from "./SideReactions";
import BasisSelector from "./BasisSelector";
import CpInput from "./CpInput";
import TableEntry from "./TableEntry";

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

            <Row className="mt-2">
                <Col>
                    <BasisSelector />
                </Col>

            </Row>

            <Row className="mt-2">
                <Col>
                    <CpInput />
                </Col>
            </Row>

            <div className="mt-2">
                <TableEntry />
            </div>

            <Row className="mt-2">
                <Col>
                    <SideReactions />
                </Col>
            </Row>
        </Container>
    );
};

export default OperatingParamsPage;
