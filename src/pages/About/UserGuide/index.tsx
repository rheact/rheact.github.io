import { Col, Container, Row } from "reactstrap";
import "./style.css"

const UserGuidePage = () => {
    return (
        <>
        <h3 className="user-guide-title">Quick Start Guide:</h3>
        <div className="user-guide-text">This is a high level overview of the user guide. Please consult the detailed user guide for more details.</div>
        <div className="user-guide-text"><span className="user-guide-sub-title">Evaluate System</span> - used to parse Safety Data Sheets (SDS), generate hazard matrix, generate chemical compatibility matrix, and calculate adiabatic temperature changes.</div>
        <ul className="user-guide-list">
            <li>
            Click on "Evaluate System" and fill out relevant details of your system in the “Details” tab.
            </li>
            <li>
            Use "Load Previous Analysis" if you have a .json (or .rheact) file with preset properties from a previously saved RHEACT analysis.
            </li>
            <li>
            In the "Components" tab under "Evaluate System", upload downloaded Safety Data Sheets (SDS) from Millipore Sigma or use the "Search" button to download desired SDS.
            If needed, manually "Add a component" for chemicals without Sigma Aldrich SDS and enter information by clicking the edit button under "Actions". 
            Select reactants, products or diluents and enter their phases.
            </li>
            <li>
            Enter the "Process Parameters" tab under "Evaluate System".
            </li>
            <li>
            Generate Safety Report in "Analysis" Tab.
            </li>
        </ul>
        <div className="user-guide-text"><span className="user-guide-sub-title">PPE Evaluation</span> - used to provide PPE recommendations from SDS and PPE questionnaire.</div>
        <ul className="user-guide-list">
            <li>
            Click on "PPE Evaluation" and answer the questions in the "Questionnaire" tab.
            </li>
            <li>
            Click on "Report" tab and view PPE recommendations in a report format that can be printed as pdf with the "Print" button in the top left.
            </li>
        </ul>
        <div className="user-guide-text"><span className="user-guide-sub-title">MOC Guide</span> - used to provide recommendations during management of change events.</div>
        <ul className="user-guide-list">
            <li>
            Click on "MOC Guide" and enter the Project Details.
            </li>
            <li>
            Upload SDS from Millipore Sigma. If needed, manually "Add a component". Only H-numbers are required for the MOC recommendations. Enter them with a comma (e.g. H220, H280,...).
            </li>
            <li>
            Answer the questions in the "Questionnaire" tab
            </li>
            <li>
            Click on "Report" tab and view PPE recommendations in a report format that can be printed as pdf.
            </li>
        </ul>
        <div className="user-guide-text"><span className="user-guide-sub-title">Protective Action Criteria (PAC)</span> - provides a simple and standardized method of evaluating hazardous chemical release events.</div>
        <ul className="user-guide-list">
            <li>
            For this feature, use “SDS” for chemicals uploaded under "Evaluate System".
            </li>
            <li>
            Click on "Protective Action Criteria" tab, select the chemical you want to do the analysis on and answer the questions that follow.
            </li>
            <li>
            Then, a PAC toxicity rating with key parameters used in the calculation will be displayed.
            </li>
        </ul>
        <div className="user-guide-text">
        Note: RHEACT does not save any user-entered information in the back-end. 
        Users can save their progress ("SAVE AS JSON" at top of the page) or perform analysis from previously saved RHEACT files ("LOAD PREVIOUS ANALYSIS").
        </div>
        <h3 className="user-guide-title">Detailed User Guide:  
            <a target="_blank" href="https://docs.google.com/document/d/1yZA4sWsCgqMS00OPut-7Kr_PUZ0WzJB90H5rYM_jzF8/edit?usp=sharing">Live Version</a>
        </h3>
        {/* <h3 className="user-guide-title">Detailed User Guide Archived Version (Last Updated: 6/29/2022 1:00 AM ET)</h3>
        <div className="user-guide-pdf">
            <iframe title="file" src="/userGuide.pdf" style={{width: "100%", height: "100%"}} />
        </div> */}
        </>
    );
};

export default UserGuidePage;
