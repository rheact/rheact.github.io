import { Chemical, RheactState } from "model";
import { ChangeEvent, FC, useCallback, useEffect, useRef } from "react";
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

    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
    
    useEffect(() => {
        const handleWheel = (e: any) => e.preventDefault();
        inputRef.current!.addEventListener("wheel", handleWheel) 

        return () => {
            inputRef.current!.removeEventListener("wheel", handleWheel);
        };
    }, []);
    

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
                    innerRef={inputRef}
                />
            </td>
        </tr>
    );
}

export default MfRow;
