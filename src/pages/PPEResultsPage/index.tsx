import { FC } from "react";
import { Container } from "reactstrap";
import Extractions from "./extractions";

const PPEResultsPage: FC<any> = () => {
    return (
        <Container id="printable">
            <h2>Extractions</h2>
            <Extractions />
        </Container>
    );
};

export default PPEResultsPage;
