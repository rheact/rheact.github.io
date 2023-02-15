import { Col, Container, Row } from "reactstrap";
import "./style.css"

const UserGuidePage = () => {
    return (
        <>
        <h2 className="user-guide-title">Quick Start Guide:</h2>
        <ul className="user-guide-list">
            <li>
            Load RHEACT website in Chrome, Firefox, or Safari.
            </li>
            <li>
            Click on "Load Previous Analysis" underneath the PROJECT Section if you have a .json (or .rheact) file with preset properties from a previous analysis. 
            If you do not have a previous analysis to load, fill in the project details in the "Details" Section.
            </li>
            <li>
            Upload previously downloaded Safety Data Sheets (SDS) from Millipore Sigma or use the "Search" button to download desired SDS. 
            If needed, manually "Add a component" for chemicals without Sigma Aldrich SDS and enter information by clicking the edit button under "Actions". 
            Following upload, select if each chemical is a "Reactant", "Product" or "Diluent".
            </li>
            <li>
            Enter Process Parameters, known side reactions.
            </li>
            <li>
            Generate safety report in the "Analysis Tab".
            </li>
            <li>
            Answer "PPE questionnaire" under "PPE EVALUATION" and view PPE recommendation under "Report".
            </li>
        </ul>
        <div className="user-guide-text">
        Note: RHEACT does not save any user-entered information in the back-end. 
        Users can save their progress ("SAVE AS JSON" at top of the page) or perform analysis from previously saved files ("LOAD PREVIOUS ANALYSIS").
        </div>
        <h2 className="user-guide-title">Detailed User Guide: 
            <a target="_blank" href="https://docs.google.com/document/d/1yZA4sWsCgqMS00OPut-7Kr_PUZ0WzJB90H5rYM_jzF8/edit?usp=sharing">Live Version</a>
        </h2>
        <h2 className="user-guide-title">Detailed User Guide Archived Version (Last Updated: 6/29/2022 1:00 AM ET)</h2>
        <div className="user-guide-pdf">
            <iframe title="file" src="/userGuide.pdf" style={{width: "100%", height: "100%"}} />
        </div>
        </>
    );
};

export default UserGuidePage;
