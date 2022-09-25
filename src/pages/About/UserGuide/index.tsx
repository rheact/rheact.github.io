import { Col, Container, Row } from "reactstrap";
import "./style.css"

const UserGuidePage = () => {
    return (
        <>
        <div>Disclaimer</div>
        <h2 className="user-guide-title">Quick Start Guide:
            <a target="_blank" href="https://docs.google.com/document/d/1yZA4sWsCgqMS00OPut-7Kr_PUZ0WzJB90H5rYM_jzF8/edit?usp=sharing">Live Version</a>
        </h2>
        <h2 className="user-guide-title">Quick Start Guide Achive (Last Updated: 6/29/2022 1:00AM ET)</h2>
        <div className="user-guide-pdf">
            <iframe title="file" src="/userGuide.pdf" style={{width: "100%", height: "100%"}} />
        </div>
        </>
    );
};

export default UserGuidePage;
