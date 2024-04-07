import { FC } from "react";
import { Button, Navbar } from "reactstrap";
import SaveButton from './Buttons/SaveButton';

const Toolbar: FC = () => {
    return (
        <Navbar className="border-bottom">
            <SaveButton />
            <Button tag="a" target="_blank" href="https://forms.gle/VFi3uqFjVCutRDuj9" size="sm" className="ms-auto" color="secondary">
                <i className="bi bi-person-lines-fill me-1" />
                Send Feedback
            </Button>
        </Navbar>
    );
};

export default Toolbar;
