import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, CardHeader, Input, Label } from "reactstrap";
import { SET_CHEMICAL_SCHEME, SET_DESCRIPTION } from "../../../store/reducer";

const ReactionCard = () => {
    const dispatch = useDispatch();
    const { description, chemicalScheme } = useSelector((store) => store);
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
            <CardHeader className="fw-bolder">Reaction Details</CardHeader>

            <CardBody>
                <Label>Complete Balanced Reaction</Label>
                <Input
                    type="textarea"
                    value={chemicalScheme}
                    placeholder="Enter LaTeX equation"
                    onChange={(e) =>
                        dispatch(SET_CHEMICAL_SCHEME(e.target.value))
                    }
                />

                <div className="d-flex justify-content-end">
                    <small className="text-muted">
                        We use{" "}
                        <a href="https://mhchem.github.io/MathJax-mhchem/">
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
                    onChange={(e) => dispatch(SET_DESCRIPTION(e.target.value))}
                />
            </CardBody>
        </Card>
    );
};

export default ReactionCard;
