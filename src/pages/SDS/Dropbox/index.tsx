import { FC, useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, ButtonGroup, Col, Container, Row } from "reactstrap";
import { ADD_DILUENT, ADD_PRODUCT, ADD_REACTANT } from "store";
import { Chemical, ComponentList as Category } from "model";
import ComponentDropzone from "./ComponentDropzone";

type ListSelectButtonProps = {
    target: Category,
    current: Category,
    set: Function,
};

const ListSelectButton: FC<ListSelectButtonProps> = ({ target, current, set }) => {
    return (
        <Button color="dark"
                outline
                active={current === target}
                onClick={() => set(target)}>
            {target}
        </Button>
    );
}

type AddEmptyChemicalButtonProps = {
    addAction: any,
};

const AddEmptyChemicalButton: FC<AddEmptyChemicalButtonProps> = ({ addAction }) => {
    const dispatch = useDispatch();

    const addEmpty = useCallback(() => {
        const emptyChem: Chemical = {
            productName: "Unknown Product",
            casNo: "Unknown",
            neglected: false,
        };

        dispatch(addAction(emptyChem));
    }, [dispatch, addAction]);

    return (
        <Button onClick={addEmpty} color="link">Add Empty Component</Button>
    );
}

const Dropbox = () => {
    const [category, setCategory] = useState<Category>(Category.reactant);

    const addAction = useMemo(() => {
        if(category === Category.reactant)
            return ADD_REACTANT;

        if(category === Category.product)
            return ADD_PRODUCT;

        return ADD_DILUENT;
    }, [category]);

    return (
        <Container fluid>
            <Row>
                <Col md={9}>
                    <ComponentDropzone addAction={addAction} />
                </Col>
                <Col md={3} className="h-100 align-items-center">
                    <span className="text-muted">Add uploaded files to:</span>
                    <ButtonGroup>
                        <ListSelectButton target={Category.reactant} current={category} set={setCategory} />
                        <ListSelectButton target={Category.product} current={category} set={setCategory} />
                        <ListSelectButton target={Category.diluent} current={category} set={setCategory} />
                    </ButtonGroup>

                    <div className="text-center">
                        <AddEmptyChemicalButton addAction={addAction} />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Dropbox;
