import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToggle } from "react-use";
import {
    Button,
    Card,
    CardBody,
    CardHeader, Collapse, Input, Table
} from "reactstrap";

const propMap = [
    {
        label: "Name",
        key: "productName",
    },
    {
        label: "CAS-No",
        key: "casNo",
    },
    {
        label: "hNumbers",
        key: "hNumbers",
        type: "textarea",
    },
    {
        label: "hStatements",
        key: "hStatements",
        type: "textarea",
    },
    {
        label: "Auto-ignition temperature (°C)",
        key: "autoIgnitionTemp",
    },
    {
        label: "Initial boiling point (°C)",
        key: "boilingPt",
    },
    {
        label: "Decomposition temperature (°C)",
        key: "decompositionTemp",
    },
    {
        label: "Flash point (°C)",
        key: "flashPt",
    },
    {
        label: "Mol. Weight (g/mol)",
        key: "molWt",
    },
    {
        label: "pH at 20°C (g/l)",
        key: "ph",
    },
    {
        label: "Relative density at 25°C (g/cm3)",
        key: "relDensity",
    },
    {
        label: "Upper explosion limit (% V)",
        key: "upperExplosionLim",
    },
    {
        label: "Lower explosion limit (% V)",
        key: "lowerExplosionLim",
    },
    {
        label: "Vapour density (Air = 1.0)",
        key: "vapourDensity",
    },
    {
        label: "Vapour pressure at 20°C (hPa)",
        key: "vapourPressure",
    },
    {
        label: "Viscosity",
        key: "viscosity",
    },
];

const CompoundCard = ({ name: from, index, changeAction, removeAction }) => {
    /** @type {import('store').Chemical} */
    const chemical = useSelector((state) => state.compound[from][index]);
    const dispatch = useDispatch();

    const getChangeProp = useCallback(
        (key) => (e) => {
            const update = { ...chemical };
            update[key] = e.target.value;
            dispatch(
                changeAction({
                    index,
                    update,
                })
            );
        },
        [changeAction, chemical, dispatch, index]
    );
    const onRemove = useCallback(
        () => dispatch(removeAction(index)),
        [dispatch, index, removeAction]
    );

    const [viewProps, toggleProps] = useToggle();

    return (
        <Card key={chemical.productName} color="light">
            <CardHeader className="h5 d-flex justify-content-between align-items-center">
                <div>
                    <span className="text-primary">{index + 1}. </span>
                    <b>{chemical.productName}</b>
                    <span> </span>
                    <span>(CAS-NO: {chemical.casNo})</span>
                </div>

                <div>
                    <Button
                        outline
                        className="me-2"
                        color="primary"
                        onClick={toggleProps}
                    >
                        <i className="bi bi-pencil me-1" />
                        Edit Properties
                    </Button>
                    <Button outline color="danger" onClick={onRemove}>
                        <i className="bi bi-x-lg me-1" />
                        Delete
                    </Button>
                </div>
            </CardHeader>
            <Collapse isOpen={viewProps}>
                <CardBody>
                    {/* <Row>
                    <Col>
                        <Label>Initial Weight Fraction</Label>
                        <Input
                            value={compound.molWtFraction}
                            invalid={!compound.molWtFraction}
                            onChange={getChangeProp("molWtFraction")}
                        />
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label>Specific heat capacity - Cp</Label>
                            <InputGroup>
                                <Input
                                    value={compound.cp}
                                    invalid={!compound.cp}
                                    onChange={getChangeProp("cp")}
                                />
                                <Button color="dark">cal/g/°C</Button>
                            </InputGroup>
                            <FormFeedback></FormFeedback>
                        </FormGroup>
                    </Col>
                </Row> */}

                    <Table bordered striped className="mt-4">
                        <tbody>
                            {propMap.map((e) => (
                                <tr key={e.label}>
                                    <td>{e.label}</td>
                                    <td>
                                        <Input
                                            value={chemical[e.key]}
                                            onChange={getChangeProp(e.key)}
                                            type={e.type}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>


                    {chemical.ppe_pages && chemical.ppe_pages[0] && (
                        <article className="d-flex flex-column">
                            <span className="h4">PPE Extractions</span>

                            {chemical.ppe_pages.map(data => (
                                <img key={data} alt={chemical.productName} src={data} />
                            ))}
                        </article>
                    )}
                </CardBody>
            </Collapse>
        </Card>
    );
};

export default CompoundCard;
