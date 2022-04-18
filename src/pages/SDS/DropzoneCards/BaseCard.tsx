import _ from "lodash";
import { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Card,
    CardBody,
    Col, Row
} from "reactstrap";
import { Chemical, RheactState } from "store";
import ChemicalCard from '../ChemicalCard';
import Dropzone from "./Dropzone";

export type EquationDropzoneProps = {
    label: "Reactants" | "Diluents" | "Products",
    name: "reactants" | "diluents" | "products",
    addAction: any,
    changeAction: any,
    removeAction: any,
    bg: string,
};

const BaseCard: FC<EquationDropzoneProps> = ({
    label,
    name,
    addAction,
    changeAction,
    removeAction,
    bg,
}) => {
    const dispatch = useDispatch();
    const numChemicals = useSelector<RheactState, number>((state) => (state.compound as any)["num" + label]);

    const addEmpty = useCallback(() => {
        const emptyChemical: Chemical = {
            productName: 'Untitled Chemical',
            casNo: 'Unknown',
            neglected: false
        };

        dispatch(addAction(emptyChemical));
    }, [addAction, dispatch]);

    return (
        <Card className={"border-" + bg}>
            <CardBody>
                <h4 className={"fw-bolder text-" + (bg || "")}>{label}</h4>
                <Row>
                    {/* Tell user how many chemicals are uploaded */}
                    <Col md={4}>
                        <div className="d-flex flex-column align-items-center justify-content-center h-100">
                            <span className="display-2">{numChemicals}</span>
                            <span>{label} uploaded</span>
                            <Button
                                color="link"
                                size="sm"
                                onClick={addEmpty}
                                >
                                    Add Empty Chemical
                            </Button>
                        </div>
                    </Col>

                    {/* Allow drag and drop of SDS */}
                    <Col md={8}>
                        <Dropzone addAction={addAction} />
                    </Col>
                </Row>

                <div className="mt-2 row row-cols-1 row-cols-md-3 g-4">
                    {_.range(numChemicals).map((i) => (
                        <div className="col" key={name + i}>
                            <ChemicalCard
                                from={name}
                                changeAction={changeAction}
                                removeAction={removeAction}
                                index={i}
                                key={`${label}/${i}`}
                            />
                        </div>
                    ))}
                </div>
            </CardBody>
        </Card>
    );
};

export default BaseCard;
