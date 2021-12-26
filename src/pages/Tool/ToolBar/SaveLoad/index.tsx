import { FC } from "react";
import { ButtonGroup } from "reactstrap";
import SaveButton from "./SaveButton";
import LoadButton from "./LoadButton";

const SaveLoadGroup: FC<any> = ({ className }) => (
    <ButtonGroup className={className}>
        <SaveButton />
        <LoadButton />
    </ButtonGroup>
);

export default SaveLoadGroup;
