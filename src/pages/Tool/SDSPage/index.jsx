import { Alert, Col, Container, Row } from "reactstrap";
import { DiluentDropzone, ProductDropzone, ReactantDropzone } from "./SdsCards";
import SearchBox from "./SearchBox";
import SigmaLogo from "./sigma.png";

const SDSPage = () => {
    return (
        <Container className="mt-2">
            <Alert className="fst-italic rounded">
                <Row>
                    <Col xs={11}>
                        RHEACT currently only supports SDS from Sigma-Aldrich. You
                        can use the searchbar below to go to Sigma-Aldrich's SDS
                        lookup website and download the SDS PDFs. Typing the name
                        of a chemical would give completion suggestions.
                    </Col>
                    <Col className="d-flex align-items-center" xs={1}>
                        <img
                            width="100%"
                            src={SigmaLogo}
                            alt="sigma-algrich-logo"
                        />
                    </Col>
                </Row>
                <Row>
                    <SearchBox className="mt-2" />
                </Row>
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
