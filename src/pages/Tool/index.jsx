import { Col, Container, Row } from 'reactstrap';
import { HashRouter as MemoryRouter, Route, Switch } from 'react-router-dom';

import Submenu from './Submenu';

import R from './routes';
import GuidePage from './GuidePage';
import ReportDetailsPage from './ReportDetailsPage';
import OperatingParamsPage from './OperatingParamsPage';
import ResultsPage from './ResultsPage';

const ToolPage = () => {
  return (
    <MemoryRouter
      initialEntries={Object.keys(R)}
      initialIndex={1}
    >
        <Container fluid>
          <Row>
            <Col md={1}>
              <Submenu />
            </Col>
            <Col>
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

                <Route>
                  <GuidePage />
                </Route>
              </Switch>
            </Col>
          </Row>
        </Container>
    </MemoryRouter>
  );
};

export default ToolPage;
