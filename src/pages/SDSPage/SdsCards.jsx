import { useMemo } from 'react';
import _ from "lodash";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import {
    Alert,
    Card,
    CardBody,
    CardHeader,
    Col, Row
} from "reactstrap";
import server from "../../api";
import * as STORE from '../../store';
import CompoundCard from './CompoundCard';

const CompoundDropzone = ({
    label,
    name,
    addAction,
    changeAction,
    removeAction,
    bg,
}) => {
    const operatingParams = useSelector(
        (state) => state.operatingParams
    );
    const dispatch = useDispatch();
    const num = useSelector((state) => state.compound["num" + label]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (files) => {
            const parseFile = (f) => server.parsePDF(f, operatingParams)
                .then(data => dispatch(addAction(data)))
                .catch(e => alert(e));
            files.forEach(parseFile);
        },
    });

    return (
        <Card className={"border-" + bg}>
            <CardHeader className={"fw-bolder text-" + (bg || "")}>
                {label}
            </CardHeader>
            <CardBody>
                <Row>
                    <Col md={4}>
                        <div className="d-flex flex-column align-items-center justify-content-center h-100">
                            <span className="display-2">{num}</span>
                            <span>{label} uploaded</span>
                        </div>
                    </Col>

                    <Col md={8}>
                        <div {...getRootProps({ className: "dropzone" })}>
                            <input {...getInputProps()} />
                            <center>
                                <i className="bi-file-earmark-medical-fill" />
                            </center>
                            <p>
                                <br />
                                Drag and drop SDS files here
                                <br />
                                Or click to open file selector
                            </p>
                        </div>
                    </Col>
                </Row>

                <div className="mt-2">
                    {_.range(num).map((i) => (
                        <div className="mt-2" key={name}>
                            <CompoundCard
                                name={name}
                                changeAction={changeAction}
                                removeAction={removeAction}
                                index={i}
                            />
                        </div>
                    ))}
                </div>
            </CardBody>
        </Card>
    );
};

export const ReactantDropzone = () => {
    const props = {
        label: "Reactants",
        name: "reactants",
        bg: "warning",
        addAction: STORE.ADD_REACTANT,
        changeAction: STORE.CHANGE_REACTANT,
        removeAction: STORE.REMOVE_REACTANT,
    };

    return <CompoundDropzone {...props} />;
};

export const ProductDropzone = () => {
    const props = {
        label: "Products",
        name: "products",
        bg: "success",
        addAction: STORE.ADD_PRODUCT,
        changeAction: STORE.CHANGE_PRODUCT,
        removeAction: STORE.REMOVE_PRODUCT,
    };

    return <CompoundDropzone {...props} />;
};

export const DiluentDropzone = () => {
    const props = {
        label: "Diluents",
        name: "diluents",
        bg: "primary",
        addAction: STORE.ADD_DILUENT,
        changeAction: STORE.CHANGE_DILUENT,
        removeAction: STORE.REMOVE_DILUENT,
    };

    return <CompoundDropzone {...props} />;
};
