import { FC } from "react";
import { Container, ListGroup, ListGroupItem, ListGroupItemHeading } from "reactstrap";
import Extractions from "./Extractions";
import Recommendations from "./Recommendations";

import './style.css'

type ResultsProps = {
    prevButton: React.ReactNode
}

const PPEResultsPage: FC<ResultsProps> = ({ prevButton }) => {
    return (
        <Container id="printable">
            <h2>Typical Minimum Personal Protective Equipment (PPE)</h2>
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

            <h2>PPE Recommendations from Questionnaire</h2>
            <Recommendations />

            <h2>Extracted PPE from SDS</h2>
            <Extractions />
            {prevButton}
        </Container>
    );
};

export default PPEResultsPage;
