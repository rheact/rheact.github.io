import { FC } from "react";
import { ButtonGroup } from "reactstrap";
import SaveButton from "./SaveButton";
import LoadButton from "./LoadButton";
import OnlineStatus from "./OnlineStatus";

const OpButtons: FC<any> = ({ className }) => (
    <ButtonGroup className={className}>
        <SaveButton />
        <LoadButton />
        <OnlineStatus />
    </ButtonGroup>
);

export default OpButtons;
