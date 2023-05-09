import "./style.css"

const AcknowledgementsPage = () => {
    return (
        <div className="center-text">
            <div className="ack-text">Development of RHEACT is supported <span className="bold-text">primarily or in part</span> by the National Science Foundation under Cooperative Agreement No. EEC-1647722.</div>
            <div className="ack-img-wrapper">
                <img src="acknowledgementsPic.png"/>
            </div>
            <div className="ack-text">We thank CISTAR Universities (Purdue University, University of Notre Dame, Northwestern University, The University of New Mexico, The University of Texas at Austin), CISTAR Industry Partners (<a target="_blank" href="https://cistar.us/industry-innovation">https://cistar.us/industry-innovation</a>), 
            and P2SAC Industry Partners (<a target="_blank" href="https://engineering.purdue.edu/P2SAC/people/partners">https://engineering.purdue.edu/P2SAC/people/partners</a>) 
            for various feedback and insights that guided the development of this tool.
            </div>
            <div className="license-img-wrapper">
                <img className="license-img" src="cistar_logo.jpg"/>
                <img className="license-img" src="p2sac_logo.png"/>
            </div>
            <div className="ack-text">
                We thank the following for their various contributions to developing RHEACT during their PhD at Davidson School of Chemical Engineering, Purdue University:
                <span className="bold-text"> Sopuruchukwu Ezenwa, Brandon Bolton, Abhijit Talpade, Pushkar Ghanekar, Jeremy Arvay, Ravi Joshi.</span>
            </div>
            <div className="ack-text">
                The following web software developers that helped make this project possible: 
                <span className="bold-text"> Yueru Duan, Vikrant Gajria, Samuel Kravitz, Anirudh Tunga.</span>
            </div>
            <div className="ack-text">
                Project guidance was provided by <span className="bold-text">Prof. Ray Mentzer</span> (Purdue ChE, P2SAC), <span className="bold-text">Prof. Fabio H. Ribeiro</span> (Purdue ChE, CISTAR) and <span className="bold-text">Dr. Jay Devaraj</span> (Corteva)
            </div>
        </div>
    );
};

export default AcknowledgementsPage;
