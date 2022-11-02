import { Col, Container, Row, NavLink } from "reactstrap";
import { NavLink as Link } from 'react-router-dom';
import R from 'pages/routes';
import ComponentTable from "./ComponentTable";
import Dropbox from "./Dropbox";
import SearchBox from "./SearchBox";
import SigmaLogo from "./sigma.png";

import "../../style.css"

const SDSPage = () => {
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
                    RHEACT currently only supports SDS from Sigma-Aldrich. You
                    can use the searchbar below to go to Sigma-Aldrich&apos;s SDS
                    lookup website and download the SDS PDFs. Typing the name
                    of a chemical would give completion suggestions.
                </Col>
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
            <NavLink
                tag={Link}
                to={R.ROUTE_OPERATION_DETAILS}
                className="nav-btn nav-btn-left"
            >
                Previous - Details
            </NavLink>
            <NavLink
                tag={Link}
                to={R.ROUTE_OPERATION_PARAMS}
                className="nav-btn nav-btn-right"
            >
                Next - Process Parameters
            </NavLink>
        </Container>
    );
};

export default SDSPage;
