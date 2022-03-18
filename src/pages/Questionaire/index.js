import { Button, ButtonGroup, Card, CardBody, CardFooter, Col, Container, ListGroup, ListGroupItem, Row } from "reactstrap";

const question_answer_map = {
    "Is your selected PPE constructed from materials that are compatible with the chemicals you’re using? (Link to material compatibility, e.g. www.coleparmer.com/chemical-resistance)": "",
    "Are you working with large quantities of chemicals which are eye irritants and may splash during the experiment? (Larger quantities of liquid)": "",
    "Are you working with large quantities of chemicals which are skin irritants, there is a skin absorption risk leading to other hazards (organ damage, etc.), which may splash during the experiment?": "",
    "Are you working with pressurized equipment or is there a risk of flying debris?": "",
    "Are you working with lasers or other sources of intense radiation?": "",
    "Are you working with flammable liquids or other flammable materials?": "",
    "Are you working with open flames or other significant sources of heat/energy?": "",
    "Are you working with larger quantities of extremely hazardous chemicals which may spill or splash? (e.g., HF cycling of liners)": "",
    "Are you working with  flammable liquids, flammable materials or pyrophoric materials?": "",
    "Are you working with heavy items which may be dropped onto your feet?": "",
    "Are you working with large volumes of chemicals that have significant reactive, skin contact, carcinogenic or reproductive hazards with the potential of splash or spill?": "",
    "Are you working with hot materials (>60°C) that have the potential of scalding?": "",
    "Are you working with very cold materials (<0°C) or cryogens?": "",
    "Are you working with sharps (e.g., broken glass, needles) that have a puncture risk?": "",
    "Are you working with powered electrical equipment in a manner that there is risk of shock hazards?": "",
    "Are you working in the presence of materials that can form fine particles of suspended dust that can be inhaled?": "",
    "Are you working with potentially airborne pathogens, hazardous gases, or volatile/aerosolized chemicals that may pose a serious toxicity or other inhalation hazard?": "",
    "Are you working in an environment with more than 70 dB of noise? (Ex: lawnmower). Consider doubling up on hearing protection for noises over 120 dB.": "",
};

function PPEQuestionSingle({ text, response }) {
    return (
        <ListGroupItem>
            <Row className="p-2">
                <Col sm={10}>
                {text}
                </Col>
                <Col className="d-flex align-items-center justify-content-end">
                    <ButtonGroup>
                        <Button outline color="success">Yes</Button>
                        <Button outline color="danger">No</Button>
                    </ButtonGroup>
                </Col>
            </Row>
        </ListGroupItem>
    );
}

export default function PPEQuestions() {
    return (
        <ListGroup>
            {Object.keys(question_answer_map).map(k => <PPEQuestionSingle text={k} />)}
        </ListGroup>
    );
}
