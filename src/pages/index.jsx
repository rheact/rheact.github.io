import { BrowserRouter, Route, Switch } from "react-router-dom";
import R from "./routes";
import ToolBar from "./navigation";
import GuidePage from "./GuidePage";
import SDSPage from "./SDSPage";
import OperatingParamsPage from "./OperatingParamsPage";
import ReportDetailsPage from "./ReportDetailsPage";
import ResultsPage from "./ResultsPage";
import Questionaire from './Questionaire';
import PPEResultsPage from './PPEResultsPage';
import SettingsPage from './SettingsPage';

const ToolIndex = () => {
    return (
        <BrowserRouter initialEntries={Object.keys(R)} initialIndex={1}>
            <ToolBar />
            <Switch>
                <Route path={R.ROUTE_SDS}>
                    <SDSPage />
                </Route>

                <Route path={R.ROUTE_OPERATION_DETAILS}>
                    <ReportDetailsPage />
                </Route>

                <Route path={R.ROUTE_OPERATION_PARAMS}>
                    <OperatingParamsPage />
                </Route>

                <Route path={R.ROUTE_OPERATION_REPORT}>
                    <ResultsPage />
                </Route>

                <Route path={R.ROUTE_PPE_QUESTIONAIRE}>
                    <Questionaire />
                </Route>

                <Route path={R.ROUTE_PPE_REPORT}>
                    <PPEResultsPage />
                </Route>

                <Route path={R.ROUTE_SETTINGS}>
                    <SettingsPage />
                </Route>

                <Route>
                    <GuidePage />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default ToolIndex;
