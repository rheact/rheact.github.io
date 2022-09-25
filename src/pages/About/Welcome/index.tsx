import { Col, Container, Row } from "reactstrap";
import './style.css'

const WelcomePage = () => {
    return (
        <>
        <div className="welcome-center">
            <h1>RHEACT</h1>
            <h3 className="welcome-name">
                Reactive Hazard Evaluation Analysis and Compilation Tool
            </h3>
        </div>
        <div className="welcome-text">
        RHEACT provides the user with a comprehensive initial evaluation of potential hazards
and notifies one of any safety-concerns associated with the reaction process before
conducting a laboratory experiment. This is achieved by collecting the relevant system
information from the user through Safety Data Sheet (SDS) or user-defined inputs. Some
of the capabilities provided in the current version of the tool include:
        </div>
        <ul className="no-bullets">
            <li>
                <i className="bi bi-file-earmark-text"></i>
                Parsing multiple
    Safety Data Sheets (SDSs) for chemical and safety information
            </li>
            <li>
            <i className="bi bi-exclamation-triangle"></i>
            Creating an operational
chemical hazard matrix and providing guidelines for PPE selection
            </li>
            <li>
            <i className="bi bi-droplet"></i>
            Generating a pairwise chemical compatibility matrix
            </li>
            <li>
            <i className="bi bi-calculator"></i>
            Calculating adiabatic temperature changes to
generate alerts if the final system temperature deviates due to material properties or
secondary reaction onsets (based on information provided by the user)
            </li>
        </ul>
        </>
    );
};

export default WelcomePage;
