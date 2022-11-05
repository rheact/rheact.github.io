import { Col, Container, Row } from "reactstrap";
import React from 'react';
import ComponentTable from "./ComponentTable";
import Dropbox from "./Dropbox";
import SearchBox from "./SearchBox";
import SigmaLogo from "./sigma.png";

import "../../../style.css"

type SDSPageProps = {
    prevButton: React.ReactNode,
    nextButton: React.ReactNode
}

const SDSPage = ({ prevButton, nextButton}: SDSPageProps) => {
    return (
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
                <ComponentTable />
            </div>
            {prevButton}
            {nextButton}
        </Container>
    );
};

export default SDSPage;
