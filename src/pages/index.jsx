import { HashRouter as MemoryRouter, Route, Switch } from "react-router-dom";
import GuidePage from "./GuidePage";
import OperatingParamsPage from "./OperatingParamsPage";
import ReportDetailsPage from "./ReportDetailsPage";
import ResultsPage from "./ResultsPage";
import Questionaire from './Questionaire';
import R from "./routes";
import ToolBar from "./ToolBar";

const ToolPage = () => {
    return (
        <MemoryRouter initialEntries={Object.keys(R)} initialIndex={1}>
            <ToolBar />
            <Switch>
                <Route path={R.ROUTE_REPORT_DETAILS}>
                    <ReportDetailsPage />
                </Route>

                <Route path={R.ROUTE_OPERATION_DETAILS}>
                    <OperatingParamsPage />
                </Route>

                <Route path={R.ROUTE_RESULTS}>
                    <ResultsPage />
                </Route>

                <Route path={R.ROUTE_PPE_QUESTIONAIRE}>
                    <Questionaire />
                </Route>

                <Route>
                    <GuidePage />
                </Route>
            </Switch>
        </MemoryRouter>
    );
};

export default ToolPage;
