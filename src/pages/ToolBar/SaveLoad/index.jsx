import { ButtonGroup } from "reactstrap";
import SaveButton from "./SaveButton";
import LoadButton from "./LoadButton";

const SaveLoadGroup = ({ className }) => (
    <ButtonGroup className={className}>
        <SaveButton />
        <LoadButton />
    </ButtonGroup>
);

export default SaveLoadGroup;
