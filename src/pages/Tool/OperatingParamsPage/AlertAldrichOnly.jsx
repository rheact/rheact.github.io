import { Alert, Row, Col} from 'reactstrap';
import SigmaLogo from './icons/sigma.png';

const AlertAldrichOnly = () => {
  return (
      <Alert color="light">
        <Row>
          <Col xs={1}>
            <img width="100%" src={SigmaLogo} />
          </Col>
          <Col className="fst-italic">
            RHEACT currently only supports SDS from Sigma-Aldrich. You can use the searchbar below to go to Sigma-Aldrich's SDS lookup website and download the SDS PDFs.
          </Col>
        </Row>
      </Alert>
  );

};

export default AlertAldrichOnly;
