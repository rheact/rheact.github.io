import { FC } from "react";
import { Button, ButtonGroup, Navbar } from "reactstrap";
import SaveButton from './Buttons/SaveButton';
import LoadButton from './Buttons/LoadButton';

type ToolbarProps = {
    loadFn: Function
};

const Toolbar: FC<ToolbarProps> = ({ loadFn }) => {
    return (
        <Navbar className="border-bottom">
            <ButtonGroup>
                <SaveButton />
                <LoadButton loadFn={loadFn} />
            </ButtonGroup>
            <Button tag="a" href="https://www.google.com/" size="sm" className="ms-auto" color="secondary">
                <i className="bi bi-person-lines-fill me-1" />
                Send Feedback
            </Button>
        </Navbar>
    );
};

export default Toolbar;
