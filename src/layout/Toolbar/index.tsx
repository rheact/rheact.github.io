import { FC } from "react";
import { Button, Navbar } from "reactstrap";
import SaveButton from './Buttons/SaveButton';

const Toolbar: FC = () => {
    return (
        <Navbar className="border-bottom">
            <SaveButton />
            <Button tag="a" target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLScN1-31M67Nl0pvTZXwR5VBTr0DETkqBpTNsoSZyKagykj_3w/viewform?usp=sf_link" size="sm" className="ms-auto" color="secondary">
                <i className="bi bi-person-lines-fill me-1" />
                Send Feedback
            </Button>
        </Navbar>
    );
};

export default Toolbar;
