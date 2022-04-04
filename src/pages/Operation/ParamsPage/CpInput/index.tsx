import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Card, CardBody, CardHeader, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { SET_CP } from 'store';
import CpManual from "./ManualEntry";
import TableEntry from "./TableEntry";

const ROUTE_MANUAL = 0;
const ROUTE_TABLE = 1;

const CpInput = () => {
    const dispatch = useDispatch();
    const [route, setRoute] = useState<number>(ROUTE_MANUAL);

    useEffect(() => {
        if(route == ROUTE_TABLE) {
            dispatch(SET_CP(undefined));
        }
    }, [route, dispatch]);

    return (
        <Card>
            <CardHeader className="fw-bold">C<sub>p</sub> (mix)</CardHeader>
            <CardBody>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            active={route === ROUTE_MANUAL}
                            onClick={() => setRoute(ROUTE_MANUAL)}
                            >
                            Enter Manually
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            active={route === ROUTE_TABLE}
                            onClick={() => setRoute(ROUTE_TABLE)}
                        >
                            Enter Weight Fractions
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={route}>
                    <TabPane tabId={0}>
                        <CpManual />
                    </TabPane>
                    <TabPane tabId={1}>
                        <TableEntry />
                    </TabPane>
                </TabContent>
            </CardBody>
        </Card>
    );
};

export default CpInput;
