import { useCallback, useEffect } from 'react';
import { Button, Container, Col, Row } from 'reactstrap';
import { useDispatch, useSelector } from "react-redux";
import GenerateButton from './GenerateButton';
import Alerts from './sections/Alerts';
import HazardStatements from './sections/HazardStatements';
import HazardMatrix from './sections/HazardMatrix';
import CameoMatrix from './sections/CameoMatrix';
import CalculationBlock from './sections/CalculationBlock';
import { Report, RheactState, OperatingParams, ProjectInfo } from 'model'
import * as STORE from "store";

import "./style.css"

const ReportSection = function ReportSection() {
    const dispatch = useDispatch();
    const { generationTime } = useSelector<RheactState>(state => state.results) as Report;
    const {
        nameOfResearcher,
        projectTitle,
        labLocation,
        principalInvestigator,
        organization,
    } = useSelector<RheactState>(state => state.info) as ProjectInfo;
    const {
        reactionClass,
        reactionScale,
        physicalState,
        keyReactantQuantity,
    } = useSelector<RheactState>(state => state.operatingParams) as OperatingParams;
    useEffect(() => {
        dispatch(STORE.SET_TIME(''));
     }, []);

    return (
        <section id="printable">
            <div className="d-flex justify-content-between">
                <h1 className="fw-bolder">RHEACT Safety Report</h1>
                {generationTime &&
                <span>
Generated:
                    {generationTime}
                </span>
}
            </div>

            <hr />
            <Container fluid className="mt-2" id="reportDetail" style={{display: "none"}}>
            <Row className="g-2">
                <div className="h5 fw-bolder">Project Information</div>
                <div>Project Title: {projectTitle}</div>
                <div>Name of Researcher: {nameOfResearcher || "N/A"}</div>
                <div>Principal Investigator: {principalInvestigator || "N/A"}</div>
                <div>Lab Location: {labLocation || "N/A"}</div>
                <div>Organization: {organization || "N/A"}</div>
                <div className="h5 fw-bolder">Chemical Details</div>
                <div>Reaction Class: {reactionClass || "N/A"}</div>
                <div>Reaction Scale: {reactionScale ? reactionScale + "kg" : "N/A"}</div>
                <div>Key Reagent Quantity: {keyReactantQuantity ? keyReactantQuantity + "moles" : "N/A"}</div>
                <div>State: {physicalState}</div>
            </Row>
            </Container>
            <Alerts className="mt-2" />
            <CalculationBlock className="mt-2" />
            <HazardStatements className="mt-2" />
            <CameoMatrix className="mt-2" />
            <HazardMatrix className="mt-2" />

        </section>
    );
};

const ResultsPage = function () {
    const onPrint = useCallback(() => {
        window.print();
    }, []);

    return (
        <>
            <div className="w-100 d-flex align-items-center p-2" style={{ backgroundColor: 'white' }}>
                <Button color="primary" className="ms-1" onClick={onPrint}>
                    <i className="bi bi-printer-fill me-1" />
          Print
                </Button>
            </div>

            <div className="mt-2">
                <GenerateButton />
            </div>

            <article className="p-5">
                <ReportSection />
            </article>
        </>
    );
};

export default ResultsPage;
