import { TemperatureCard } from "pages/Operation/ParamsPage/ValueCards";
import { Alert, Col, Container, Row } from "reactstrap";
import { DiluentDropzone, ProductDropzone, ReactantDropzone } from "./DropzoneCards";
import SearchBox from "./SearchBox";
import SigmaLogo from "./sigma.png";

const SDSPage = () => {
    return (
        <Container className="mt-2">

            <Row className="mt-2">
                <Col className="d-flex align-items-center" xs={1}>
                    <img
                        width="100%"
                        src={SigmaLogo}
                        alt="sigma-algrich-logo"
                    />
                </Col>
                <Col xs={11} className="text-muted fst-italic">
                    RHEACT currently only supports SDS from Sigma-Aldrich. You
                    can use the searchbar below to go to Sigma-Aldrich&apos;s SDS
                    lookup website and download the SDS PDFs. Typing the name
                    of a chemical would give completion suggestions.
                </Col>
            </Row>

            <Row className="justify-content-center mt-2">
                <SearchBox />
            </Row>

            <Alert color="light" className="fst-italic rounded mt-2">
                Please enter the operation temperature here if you want the C<sub>p</sub>
                of the SDS that you upload to be estimated from a backend database.
                <TemperatureCard />
            </Alert>

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

export default SDSPage;
