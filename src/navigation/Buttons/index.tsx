import { FC } from "react";
import { ButtonGroup } from "reactstrap";
import SaveButton from "./SaveButton";
import LoadButton from "./LoadButton";
import SettingsButton from "./SettingsButton";

const OpButtons: FC<any> = ({ className }) => (
    <ButtonGroup className={className}>
        <SaveButton />
        <LoadButton />
        <SettingsButton />
    </ButtonGroup>
);

export default OpButtons;
