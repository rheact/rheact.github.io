import { ListGroup, ListGroupItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import R from './routes';

const Submenu = () => {
  return (
    <ListGroup>
      <ListGroupItem tag={NavLink} to={R.ROUTE_REPORT_DETAILS}>
        <i className="bi-pencil-fill me-2" />
        Report Details
      </ListGroupItem>

      <ListGroupItem tag={NavLink} to={R.ROUTE_OPERATION_DETAILS} className="text-danger">
        <i className="bi-box me-2" />
        Operating Parameters
      </ListGroupItem>

      <ListGroupItem tag={NavLink} to={R.ROUTE_SIDE_REACTIONS}>
        <i className="bi-bezier me-2" />
        Side Reactions
      </ListGroupItem>

      <ListGroupItem tag={NavLink} to={R.ROUTE_SDS} className="text-danger">
        <i class="bi bi-exclamation-diamond-fill me-2"></i>
        Safety Data Sheets
      </ListGroupItem>

      <ListGroupItem tag={NavLink} to={R.ROUTE_RESULTS}>
        <i class="bi bi-file-earmark-bar-graph-fill me-2" />
        Results
      </ListGroupItem>
    </ListGroup>
  );
};

export default Submenu;
