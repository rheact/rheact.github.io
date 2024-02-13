import { Col, Container, Row, Modal, ModalHeader, ModalBody } from "reactstrap";
import React from 'react';
import { useToggle } from "react-use";
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

    const [showModal, setShowModal] = useToggle(false);

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
                    RHEACT currently only supports SDS from Sigma-Aldrich.
                    The pdf parsing algorithm currently only works for SIGMA aldrich SDS downloaded in the United States. 
                    You can use the searchbar below to go to Sigma-Aldrich&apos;s SDS
                    lookup website and download the SDS PDFs. Typing the name
                    of a chemical would give completion suggestions.
                </Col>
                <div className="custom-alert">
                For non-US countries, kindly visit the Sigma-Aldrich website and adjust your location settings to the United States in order to access and download the US version of SDS PDFs&nbsp; 
                <span className="sds-instr" onClick={() => setShowModal(true)}>(Click here for instructions)</span>.
                </div>
                <Modal isOpen={showModal} size="lg" toggle={() => setShowModal()}>
                    <ModalBody>
                        <div className="sds-instr-wrapper">
                            <div>1. Click on the country selector located in the top right corner of the page.</div>
                            <img className="sds-instr-img" src="/step1.png" />
                        </div>
                        <div className="sds-instr-wrapper">
                            <div>2. Select the region 'North America' and choose the location 'United States', then click 'Continue' to apply the changes.</div>
                            <img className="sds-instr-img" src="/step2.png" />
                        </div>
                    </ModalBody>
                </Modal>
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
