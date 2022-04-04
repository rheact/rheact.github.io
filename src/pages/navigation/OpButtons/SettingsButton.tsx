import { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import R from 'pages/routes';

const SettingsButton: FC<any> = () => {
    return (
        <Button tag={Link} to={R.ROUTE_SETTINGS} size="sm" color="dark" outline>
            <i className="bi-gear" /> Settings
        </Button>
    );
};

export default SettingsButton;
