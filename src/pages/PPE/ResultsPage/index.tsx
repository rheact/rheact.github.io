import { FC } from "react";
import { Container, ListGroup, ListGroupItem, ListGroupItemHeading } from "reactstrap";
import Extractions from "./Extractions";
import Recommendations from "./Recommendations";

import './style.css'

type ResultsProps = {
    prevButton: React.ReactNode
}

const links = [
    'https://www.osha.gov/Publications/osha3151.pdf',
    'https://ehs.ucmerced.edu/researchers-labs/ppe/selection',
    'https://www.era-environmental.com/blog/personal-protective-equipment-how-to-read-an-sds',
    'https://www.usf.edu/administrative-services/environmental-health-safety/documents/hazard_control_ppe_guide.pdf',
    'https://www.ehs.washington.edu/system/files/resources/ppeguidelines.pdf',
    'https://www.purdue.edu/ehps/rem/laboratory/Personal/PPE/gloveselection.pdf',
];

const PPEResultsPage: FC<ResultsProps> = ({ prevButton }) => {
    return (
        <>
        <Container id="printable">
            <h3 className="ppe-title">Typical Minimum Personal Protective Equipment (PPE)</h3>
            <ListGroup className="ppe-table">
                <ListGroupItem>
                    <ListGroupItemHeading>
                        Safety glasses with side shields
                    </ListGroupItemHeading>
                </ListGroupItem>

                <ListGroupItem>
                    <ListGroupItemHeading>
                        General lab coat
                    </ListGroupItemHeading>
                </ListGroupItem>

                <ListGroupItem>
                    <ListGroupItemHeading>
                        Long pants
                    </ListGroupItemHeading>
                </ListGroupItem>

                <ListGroupItem>
                    <ListGroupItemHeading>
                        Close-toed shoes
                    </ListGroupItemHeading>
                </ListGroupItem>

                <ListGroupItem>
                    <ListGroupItemHeading>
                        Nitrile gloves (most but not all cases)
                    </ListGroupItemHeading>
                </ListGroupItem>
            </ListGroup>

            <h3>PPE Recommendations from Questionnaire</h3>
            <Recommendations />
            <div className="d-flex flex-column ppe-links">
                <span>
                    The following links can guide the PPE selection process:
                </span>
                {links.map((link) => (
                    <a target="_blank" key={link} href={link}>
                        {link}
                    </a>
                ))}
            </div>
            <h3>Extracted PPE from SDS</h3>
            <Extractions />
        </Container>
        {prevButton}
        </>
    );
};

export default PPEResultsPage;
