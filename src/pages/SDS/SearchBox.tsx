import { FC, useCallback, useEffect, useState } from "react";
import {
    Badge,
    Button,
    Form,
    Input
} from "reactstrap";

type SearchBoxProps = {
    className?: string,
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
        if (!stext || stext.length < 3) {
            setSuggestions([]);
        }

        const delayDebounceFn = setTimeout(() => {
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

            <div className="d-flex">
                <Input
                    bsSize="lg"
                    value={stext}
                    style={{ borderRadius: "32px" }}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Search Name or CAS number"
                />
                <Button className="ms-1" color="primary" type="submit">
                    <i className="bi bi-search" /> 
                </Button>
            </div>

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
