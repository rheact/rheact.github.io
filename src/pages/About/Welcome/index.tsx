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
        The prevalence of safety incidents in laboratory settings at academic, industrial, and government research 
        facilities has motivated the need for broad and systematic changes in safety practices.
        The development of a convenient web tool for preliminary hazard analyses was identified as a need 
        that can contribute towards reducing the occurrence and severity of lab safety incidents.
        </div>
        <div className="welcome-text">
        <span className="bold-text">RHEACT</span> enables the initial evaluation of potential hazards and 
        helps users quickly identify some safety-concerns associated with their experimental procedure before conducting a lab experiment.
        </div>
        <div className="welcome-text">Furthermore, RHEACT has utility across a vast spectrum of chemical research and development (R&D) laboratories. 
        RHEACT is especially targeted towards academic research & teaching chemical labs as well as industrial research laboratories at small, and mid-sized enterprises (SME). 
        Some of the capabilities in RHEACT Beta version include:</div>
        <ul className="no-bullets">
            <li>
                <i className="bi bi-file-earmark-text"></i>
                Parsing multiple Safety Data Sheets (SDS) for chemical and safety information
            </li>
            <li>
                <i className="bi bi-exclamation-triangle"></i>
                Creating a visual matrix of physical and health hazards of chemicals
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
                <i className="bi bi-patch-check"></i>
                Providing PPE recommendations from SDS and PPE questionnaire
            </li>
            <li>
                <i className="bi bi-list-stars"></i>
                Providing Management of Change (MOC) recommendations
            </li>
            <li>
                <i className="bi bi-eyedropper"></i>
                Protective Action Criteria (PAC) for evaluating uncontrolled releases of hazardous chemicals
            </li>
        </ul>
        <div className="welcome-text">
            We aim for RHEACT to be a quick preliminary screening tool that alerts users about hazards and suggests further hazard analysis to ensure safety.
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
