import { FC } from "react";
import { ButtonGroup } from "reactstrap";
import SaveButton from "./SaveButton";
import LoadButton from "./LoadButton";

const OpButtons: FC<any> = ({ className }) => (
    <ButtonGroup className={className}>
        <SaveButton />
        <LoadButton />
    </ButtonGroup>
);

export default OpButtons;
