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
                For users accessing the Sigma-Aldrich website from non-US countries, we kindly request you to visit the website and adjust your location settings to the United States. By doing so, you'll be able to access and download the US version of Safety Data Sheets (SDS) in PDF format. If you're unsure how to change your location settings, please follow the instructions provided&nbsp;
                <span className="sds-instr" onClick={() => setShowModal(true)}>(here)</span>.
                If you encounter any difficulties changing your location, we recommend clearing your browser cookies or using an incognito/private browsing mode.
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
