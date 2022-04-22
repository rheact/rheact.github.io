import api from 'api';
import { FC, useEffect, useState } from "react";
import { useTimeoutFn } from "react-use";
import { Badge } from "reactstrap";

enum Status {
    Offline = 0,
    Online = 1,
};

const getColor = (state: Status) => {
    if(state === Status.Online)
        return 'success'
    if(state === Status.Offline)
        return 'danger';
    
    return 'secondary';
}

const OnlineStatus: FC<any> = ({ className }) => {
    const [state, setState] = useState<Status>(Status.Offline);

    function statusCheck() {
        api.checkLiveness().then(b => {
            if(b) setState(Status.Online);
            else setState(Status.Offline);
        })
    }

    useEffect(statusCheck, []);

    useTimeoutFn(() => statusCheck, 300 * 1000);

    return (
        <Badge outline color={getColor(state)}>
            {state === Status.Offline && "Offline"}
            {state === Status.Online && "Online"}
        </Badge>
    );
};

export default OnlineStatus;
