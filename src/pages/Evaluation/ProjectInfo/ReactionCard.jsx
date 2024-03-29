import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Card, CardBody, Input, Label } from "reactstrap";
import * as STORE from "store";

const ReactionCard = () => {
    const dispatch = useDispatch();
    const { description, chemicalScheme } = useSelector(state => state.info);
    const katexRef = useRef();

    useEffect(() => {
        if (chemicalScheme) {
            window.katex.render(
                `\\ce{ ${chemicalScheme} }`,
                katexRef.current,
                {
                    throwOnError: false,
                }
            );
        } else {
            window.katex.render(`\\text{No equation}`, katexRef.current, {
                throwOnError: false,
            });
        }
    }, [chemicalScheme]);

    return (
        <Card>
            <CardBody>
                <div className="h5 fw-bolder">Reaction Details</div>
                <Alert color="light" isOpen>
                    RHEACT does not check if your reaction scheme is correct nor if you entered a non-balanced reaction.
                </Alert>
                <Label>Complete Balanced Reaction</Label>
                <Input
                    type="textarea"
                    value={chemicalScheme}
                    placeholder="Enter LaTeX equation"
                    onChange={(e) =>
                        dispatch(STORE.SET_CHEMICAL_SCHEME(e.target.value))
                    }
                />

                <div className="d-flex justify-content-end">
                    <small className="text-muted">
                        We use{" "}
                        <a target="_blank" href="https://mhchem.github.io/MathJax-mhchem/">
                            mhchem
                        </a>{" "}
                        chemical equations for rendering.{" "}
                    </small>
                </div>
                <div className="text-center py-5" ref={katexRef} />

                <Label>Description of scope of project</Label>
                <Input
                    type="textarea"
                    value={description}
                    placeholder="A brief summary of the project"
                    onChange={(e) => dispatch(STORE.SET_DESCRIPTION(e.target.value))}
                />
            </CardBody>
        </Card>
    );
};

export default ReactionCard;
