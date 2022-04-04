import { FC } from "react";
import { useCallback, useEffect, useState } from "react";
import {
    Badge,
    Button,
    Form,
    Input,
    InputGroup,
} from "reactstrap";

type SearchBoxProps = {
    className: string,
};

const SearchBox: FC<SearchBoxProps> = ({ className }) => {
    const [stext, setText] = useState<string>('');
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
            if (!stext || stext.length < 3) return;
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
        <Form onSubmit={onSearch} className={className}>
            <InputGroup>
                <Input
                    bsSize="lg"
                    value={stext}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Search Name or CAS number"
                />

                <Button color="dark" type="submit">
                    <i className="bi bi-search"/>
                </Button>
            </InputGroup>
            <div className="text-center">
                {stext && suggestions.map((s) => (
                    <Badge
                        key={s}
                        color="primary"
                        size="lg"
                        onClick={() => setText(s)}
                        className="m-2"
                        style={{ cursor: "pointer" }}
                    >
                        {s}
                    </Badge>
                ))}
            </div>
        </Form>
    );
};

export default SearchBox;