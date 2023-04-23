import R from 'pages/routes';
import { NavLink as Link } from 'react-router-dom';
import { NavLink } from 'reactstrap';

import './style.css'

const WelcomePage = () => {
    return (
        <>
        <div className="welcome-center">
            <h2>RHEACT</h2>
            <h4 className="welcome-name">
                Reactive Hazard Evaluation Analysis and Compilation Tool
            </h4>
        </div>
        <div className="welcome-text">
        The prevalence of safety incidents in laboratory settings at academic, 
        industrial, and government research facilities has motivated the need for broad and systematic 
        changes in safety practices that go beyond mere compliance to established safety standards. 
        The development of a convenient web tool that conducts preliminary hazard analyses was identified as a need that can contribute towards reducing the occurrence and severity of safety incidents.
        </div>
        <div className="welcome-text">
        <span className="bold-text">RHEACT</span> provides the user with an initial evaluation of potential hazards and notifies them of any safety-concerns 
        associated with the reaction process before conducting a laboratory experiment. 
        This is achieved by collecting the relevant system information through Safety Data Sheet (SDS) and user-defined inputs, 
        conducting preliminary hazard analyses, and summarizing potential safety issues.
        </div>
        <div className="welcome-text">Furthermore, RHEACT has utility across a vast spectrum of chemical research and development (R&D) 
        laboratories and is especially targeted towards academic research and teaching chemical labs and small and mid-size enterprises' (SME) R&D labs. 
        Some of the capabilities provided in the current version of the tool include:</div>
        <ul className="no-bullets">
            <li>
                <i className="bi bi-file-earmark-text"></i>
                Parsing multiple Safety Data Sheets (SDSs) for chemical and safety information
            </li>
            <li>
                <i className="bi bi-exclamation-triangle"></i>
                Creating an operational chemical hazard matrix
            </li>
            <li>
                <i className="bi bi-droplet"></i>
                Generating a pairwise chemical compatibility matrix
            </li>
            <li>
                <i className="bi bi-calculator"></i>
                Calculating final reaction temperature after an adiabatic temperature change
            </li>
            <li>
                <i className="bi bi-clipboard-data"></i>
                Providing PPE recommendations from SDS and PPE questionnaire
            </li>
        </ul>
        <div className="welcome-text">
            We aim for RHEACT to be a quick preliminary screening tool that alerts users about hazards and pushes them to perform further analysis.
        </div>
        <div className="welcome-text">
            By using this tool you agree to the terms of the
            <NavLink
                id="license-link"
                tag={Link}
                to={R.ROUTE_LICENSE}
            >
                license
            </NavLink>.
        </div>
        </>
    );
};

export default WelcomePage;
