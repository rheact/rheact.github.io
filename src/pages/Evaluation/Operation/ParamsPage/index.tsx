import { Col, Container, Row } from "reactstrap";
import { TemperatureCard, PressureCard, HeatOfReactionCard } from "./ValueCards";
import SideReactions from "./SideReactions";
import BasisSelector from "./BasisSelector";
import CpInput from "./CpInput";
import MfEntry from "./MfInput";

import "../../../../style.css"

type OperatingParamsPageProps = {
    prevButton: React.ReactNode,
    nextButton: React.ReactNode
}

const OperatingParamsPage = ({ prevButton, nextButton }: OperatingParamsPageProps) => {
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
            {prevButton}
            {nextButton}
        </Container>
    );
};

export default OperatingParamsPage;
