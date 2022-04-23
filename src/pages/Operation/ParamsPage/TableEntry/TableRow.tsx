import { Chemical, RheactState } from "model";
import { ChangeEvent, FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, InputGroup, InputGroupText } from "reactstrap";

type TableRowProps = {
    changeAction: any,
    listname: string,
    index: number,
};

const TableRow: FC<TableRowProps> = ({ changeAction, listname, index }) => {
    const dispatch = useDispatch();
    const cp = useSelector<RheactState>(state =>  state.operatingParams.cp) as string;
    const chemical = useSelector<RheactState>(state =>  (state.compound as any)[listname][index]) as Chemical;

    const getChangeProp = useCallback(
        (key: keyof Chemical) => (e: ChangeEvent<HTMLInputElement>) => {
            const update: any = { ...chemical };
            update[key] = e.target.value as any;
            dispatch(
                changeAction({
                    index,
                    update,
                })
            );
        },
        [changeAction, index, chemical, dispatch]
    );

    const onNeglect = useCallback(
        () => {
            const update: Chemical = { ...chemical };
            update.neglected = !update.neglected;
            dispatch(
                changeAction({
                    index,
                    update,
                })
            );
        },
        [changeAction, index, chemical, dispatch]
    );

    return (
        <tr>
            <td>{chemical.productName}</td>
            <td>{chemical.molWt}</td>
            <td>
                <Input
                    value={chemical.molWtFraction}
                    onChange={getChangeProp('molWtFraction')}
                    className={!chemical.molWtFraction ? 'border-danger' : ''}
                    type="number"
                />
            </td>
            <td>
                <InputGroup>
                    <Input
                        disabled={!!cp || chemical.neglected}
                        value={chemical.cp}
                        onChange={getChangeProp('cp')}
                        className={!chemical.cp && !cp ? 'border-danger' : ''}
                        type="number"
                    />
                    <InputGroupText className="bg-dark text-white">cal/g/°C</InputGroupText>
                </InputGroup>
            </td>
            <td>
                <Button
                    color={chemical.neglected ? 'danger' : 'success'}
                    outline
                    onClick={onNeglect}
                >
                    {chemical.neglected && (<i className="bi bi-x-lg" />)}
                    {!chemical.neglected && (<i className="bi bi-check-lg" />)}
                </Button>
            </td>
        </tr>
    );
}

export default TableRow;
