import { useMemo } from "react";
import { Card, CardBody, Container, Col, Row } from 'reactstrap';
import * as STORE from 'store';
import MOCComponentsTable from "./mocComponentsTable";
import SearchBox from "../../Evaluation/SDS/SearchBox";
import SigmaLogo from "../../Evaluation/SDS/sigma.png";
import { AddEmptyChemicalButton } from '../../Evaluation/SDS/Dropbox';
import ComponentDropzone from "../../Evaluation/SDS/Dropbox/ComponentDropzone";

import "../../../style.css"

const Dropbox = () => {

    const addAction = useMemo(() => {
        return STORE.ADD_CHEMICAL;
    }, []);

    return (
        <Container fluid>
            <Row>
                <Col md={9}>
                    <ComponentDropzone addAction={addAction} />
                </Col>
                <Col md={3} className="d-flex flex-column justify-content-center">
                    <div className="text-center">
                        <AddEmptyChemicalButton addAction={addAction} />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

const ComponentsCard = () => {
    return (
        <Card>
            <CardBody>
                <div className="h5 fw-bolder">Components</div>
                <Container>
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

                    <Row className="justify-content-center my-5">
                        <SearchBox />
                    </Row>

                    <div className="mt-2">
                        <Dropbox />
                    </div>

                    <div className="mt-2">
                        <MOCComponentsTable />
                    </div>
                </Container>
            </CardBody>
        </Card>
    );
};

export default ComponentsCard;
