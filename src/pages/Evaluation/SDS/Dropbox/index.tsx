import { FC, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Container, Row } from "reactstrap";
import { ADD_REACTANT } from "store";
import { Chemical } from "model";
import ComponentDropzone from "./ComponentDropzone";

type AddEmptyChemicalButtonProps = {
    addAction: any,
};

const AddEmptyChemicalButton: FC<AddEmptyChemicalButtonProps> = ({ addAction }) => {
    const dispatch = useDispatch();

    const addEmpty = useCallback(() => {
        const emptyChem: Chemical = {
            productName: "Unknown Component",
            casNo: "Unknown",
            neglected: false,
            phase: 'Solid'
        };

        dispatch(addAction(emptyChem));
    }, [dispatch, addAction]);

    return (
        <Button onClick={addEmpty} color="primary">Add a Component</Button>
    );
}

const Dropbox = () => {

    const addAction = useMemo(() => {
        return ADD_REACTANT;
    }, []);

    return (
        <Container fluid>
            <Row>
                <Col md={9}>
                    <ComponentDropzone addAction={addAction} />
                </Col>
                <Col md={3} className="d-flex flex-column justify-content-center">
                    <div className="text-center">
                        <AddEmptyChemicalButton addAction={addAction} />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Dropbox;
