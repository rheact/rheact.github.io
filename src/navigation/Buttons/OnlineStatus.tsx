import { useEffect, useState } from "react";
import { useTimeoutFn } from "react-use";
import { Button } from "reactstrap";
import api from 'api';

enum Status {
    Checking = 0,
    Offline = -1,
    Online = 1,
};

const getColor = (state: Status) => {
    if(state === Status.Online)
        return 'success'
    if(state === Status.Offline)
        return 'danger';
    
    return 'secondary';
}

const OnlineStatus = () => {
    const [state, setState] = useState<Status>(Status.Checking);

    function statusCheck() {
        api.checkLiveness().then(b => {
            if(b) setState(Status.Online);
            else setState(Status.Offline);
        })
    }

    useEffect(statusCheck, []);

    useTimeoutFn(() => statusCheck, 300 * 1000);

    return (
        <Button disabled outline color={getColor(state)}>
            {state === Status.Checking && "Checking"}
            {state === Status.Offline && "Offline"}
            {state === Status.Online && "Online"}
        </Button>
    );
};

export default OnlineStatus;
