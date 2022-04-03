import { FC } from "react";
import { Container, ListGroup, ListGroupItem, ListGroupItemHeading } from "reactstrap";
import Extractions from "./Extractions";
import Recommendations from "./Recommendations";

const PPEResultsPage: FC<any> = () => {
    return (
        <Container id="printable">
            <h2>Typical Minimum PPE</h2>
            <ListGroup>
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

            <h2>Recommendations from Questionnaire</h2>
            <Recommendations />

            <h2>Extractions</h2>
            <Extractions />
        </Container>
    );
};

export default PPEResultsPage;
