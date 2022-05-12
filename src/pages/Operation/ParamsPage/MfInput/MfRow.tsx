import { Chemical, RheactState } from "model";
import { ChangeEvent, FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "reactstrap";

type MfRowProps = {
    changeAction: any,
    listname: string,
    index: number,
};

const MfRow: FC<MfRowProps> = ({ changeAction, listname, index }) => {
    const dispatch = useDispatch();
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
        </tr>
    );
}

export default MfRow;
