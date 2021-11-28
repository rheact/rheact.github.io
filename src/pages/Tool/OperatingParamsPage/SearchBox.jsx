import { useCallback, useEffect, useState } from "react";
import {
    Alert,
    Badge,
    Button,
    Col,
    Form,
    Input,
    InputGroup,
    InputGroupText,
    Row,
} from "reactstrap";
import "./dropzone.css";
import SigmaLogo from "./icons/sigma.png";

const SearchBox = () => {
    const [stext, setText] = useState();
    const [suggestions, setSuggestions] = useState([]);

    const onSearch = useCallback(
        (e) => {
            e.preventDefault();
            const surl = `https://www.sigmaaldrich.com/US/en/search/${stext}?focus=products&page=1&perPage=30&sort=relevance&term=${stext}&type=product`;
            window.open(surl);
        },
        [stext]
    );

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (!stext) return;
            fetch(
                `https://pubchem.ncbi.nlm.nih.gov/rest/autocomplete/compound/${stext}/json?limit=7`
            )
                .then((res) => res.json())
                .then((data) => setSuggestions(data.dictionary_terms.compound))
                .catch((e) => {
                    console.warn("Failed to get suggestions: ", e);
                });
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [stext]);

    return (
        <Form onSubmit={onSearch}>
            <InputGroup>
                <InputGroupText>
                    <img
                        width="64px"
                        src={SigmaLogo}
                        alt="sigma-algrich-logo"
                    />
                </InputGroupText>

                <Input
                    value={stext}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Search Name or CAS number"
                />

                <Button color="dark" type="submit">
                    Go
                </Button>
            </InputGroup>
            <div className="text-center">
                {stext && suggestions.map((s) => (
                    <Badge color="primary" size="lg" onClick={() => setText(s)} className="m-2" style={{ cursor: "pointer" }}>{s}</Badge>
                ))}
            </div>
        </Form>
    );
};

export const AlertAldrichOnly = () => {
    return (
        <Alert color="light">
            <Row>
                <Col className="fst-italic">
                    RHEACT currently only supports SDS from Sigma-Aldrich. You
                    can use the searchbar below to go to Sigma-Aldrich's SDS
                    lookup website and download the SDS PDFs. Typing the name
                    of a chemical would give completion suggestions.
                </Col>
            </Row>

            <Row className="mt-4">
                <SearchBox />
            </Row>
        </Alert>
    );
};
