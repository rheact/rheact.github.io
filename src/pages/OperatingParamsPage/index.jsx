import { Col, Container, Row } from "reactstrap";
import { CpCard, HeatCard, PressureCard, TemperatureCard } from "./ParamCards";
import { DiluentDropzone, ProductDropzone, ReactantDropzone } from "./SdsCards";
import { AlertAldrichOnly } from "./SearchBox";

const OperatingParamsPage = () => {
    return (
        <Container className="mt-2">
            {/* Operating Parameters */}

            <h4>Operation Parameters</h4>

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

            {/* SDS Upload */}

            <h4 className="mt-5">SDS Upload</h4>

            <Row className="mt-2">
                <AlertAldrichOnly />
            </Row>

            <div className="mt-2">
                <ReactantDropzone />
            </div>

            <div className="mt-2">
                <ProductDropzone />
            </div>

            <div className="mt-2">
                <DiluentDropzone />
            </div>
        </Container>
    );
};

export default OperatingParamsPage;
