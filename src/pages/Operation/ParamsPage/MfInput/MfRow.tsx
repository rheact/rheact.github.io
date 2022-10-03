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
        const handleArrowKey = (e: any) => {
            if(e.key === "ArrowUp" || e.key === "ArrowDown") {
                e.preventDefault();
            }

        }
        inputRef.current!.addEventListener("wheel", handleWheel) 
        inputRef.current!.addEventListener("keydown", handleArrowKey)

        return () => {
            if(inputRef.current) {
                inputRef.current!.removeEventListener("wheel", handleWheel);
                inputRef.current!.removeEventListener("keydown", handleArrowKey)
            }
        };
    }, []);
    

    return (
        <tr>
            <td>{chemical.productName}</td>
            <td>{chemical.molWt}</td>
            <td>
                <Input
                    invalid={!chemical.molWtFraction || parseFloat(chemical.molWtFraction) < 0 || parseFloat(chemical.molWtFraction) > 1}
                    value={chemical.molWtFraction}
                    onChange={getChangeProp('molWtFraction')}
                    type="number"
                    innerRef={inputRef}
                />
                <div id="totalMassFractionFeedback" className="invalid-feedback">
                    {!chemical.molWtFraction ? <>Mass fraction cannot be empty!</> : <>Mass fraction must be in range [0, 1]</>}
                </div>
            </td>
        </tr>
    );
}

export default MfRow;
