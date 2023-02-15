import { FC, FormEvent, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useToggle } from "react-use";
import { Button, ButtonGroup, InputGroup, Input, Modal, ModalBody, ModalHeader, Table } from "reactstrap";
import { InputType } from "reactstrap/types/lib/Input";
import { Chemical } from "model";
import * as STORE from 'store';

import "./style.css"

type PropertyMap = {
    label: string,
    key: keyof Chemical,
    type?: InputType,
};

const propMap: PropertyMap[] = [
    {
        label: "Name",
        key: "productName",
    },
    {
        label: "Mol. Weight (g/mol)",
        key: "molWt",
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


type ChemicalRowProps = {
    chemical: Chemical,
    section: "Reactant" | "Product" | "Diluent",
    index: number,
    changeAction: any,
    removeAction: any,
};

const sectionColorMap = {
    "Reactant": "text-danger",
    "Product": "text-success",
    "Diluent": "text-info",
}

const ChemicalRow: FC<ChemicalRowProps> = ({ chemical, section, index, changeAction, removeAction }) => {
    const dispatch = useDispatch();
    const [viewProps, toggleProps] = useToggle(false);

    const getChangeProp = useCallback(
        (key: keyof Chemical) => (e: FormEvent<HTMLInputElement>) => {
            const update: any = { ...chemical };
            update[key] = e.currentTarget.value;
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

    const onChangeSection = useCallback(
        (newSection) => {
            // Remove curr section
            switch(section) {
                case 'Reactant':
                    dispatch(STORE.REMOVE_REACTANT(index))
                    break;
                case 'Product':
                    dispatch(STORE.REMOVE_PRODUCT(index))
                    break;
                case 'Diluent':
                    dispatch(STORE.REMOVE_DILUENT(index))
                    break;
                default:
                    console.log('Cannot remove ', section)
            }
            // Add new section
            switch(newSection) {
                case 'Reactant':
                    dispatch(STORE.ADD_REACTANT(chemical))
                    break;
                case 'Product':
                    dispatch(STORE.ADD_PRODUCT(chemical))
                    break;
                case 'Diluent':
                    dispatch(STORE.ADD_DILUENT(chemical))
                    break;
                default:
                    console.log('Cannot add ', newSection)
            }
        },
        [dispatch]
    );

    const onChangePhase = useCallback(
        (newPhase) => {
            dispatch(STORE.CHANGE_CHEMICAL_PHASE({section, index, newPhase}))
        },
        [dispatch]
    )

    return (
        <tr>
            <td>
                <Input className={"fw-bold " + sectionColorMap[section] + " comp-type-dropdown"} type="select" value={section} onChange={e => onChangeSection(e.target.value)}>
                    <option>Reactant</option>
                    <option>Product</option>
                    <option>Diluent</option>
                </Input>
            </td>
            <td>
                {chemical.casNo}
            </td>
            <td>
                {chemical.productName}    
            </td>
            <td>
                {chemical.molWt}    
            </td>
            <td>
                <InputGroup>
                    <Input 
                        className={"fw-bold comp-type-dropdown"} 
                        type="select" value={chemical.phase} 
                        onChange={e => onChangePhase(e.target.value)}
                        invalid={!chemical.phase}
                    >
                        <option></option>
                        <option>Solid</option>
                        <option>Liquid</option>
                        <option>Gas</option>
                    </Input>
                    <div className="invalid-feedback">
                        Please select a phase!
                    </div>
                </InputGroup>  
            </td>
            <td>
                <ButtonGroup size="sm">
                    <Button color="link" onClick={toggleProps}><i className="bi bi-pencil-fill"/></Button>
                    <Button color="link" onClick={onRemove} className="text-danger"><i className="bi bi-x-lg"/></Button>
                </ButtonGroup>
            </td>

            <Modal isOpen={viewProps} size='xl'>
                <ModalHeader toggle={toggleProps}>
                    Edit Compound
                </ModalHeader>
                <ModalBody>
                    <Table bordered className="mt-4">
                        <tbody>
                            {propMap.map((property) => (
                                <tr key={property.label}>
                                    <td>{property.label}</td>
                                    <td>
                                        <Input
                                            value={chemical[property.key] as string}
                                            onChange={getChangeProp(property.key)}
                                            type={property.type}
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
                </ModalBody>
            </Modal>
        </tr>
    );
};

export default ChemicalRow;
