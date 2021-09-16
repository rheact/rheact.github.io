import { ListGroup, ListGroupItem } from 'reactstrap';

const Submenu = () => {
  return (
    <ListGroup>
      <ListGroupItem active>
        <i className="bi-pencil-fill me-2" />
        Report Details
      </ListGroupItem>
      <ListGroupItem>
        <i className="bi-box me-2" />
        Operating Parameters
      </ListGroupItem>
      <ListGroupItem>
        <i className="bi-bezier me-2" />
        Side Reactions
      </ListGroupItem>
      <ListGroupItem>
        <i class="bi bi-exclamation-diamond-fill me-2"></i>
        Safety Data Sheets
      </ListGroupItem>
      <ListGroupItem>
        <i class="bi bi-file-earmark-bar-graph-fill me-2" />
        Results
      </ListGroupItem>
    </ListGroup>
  );
};

export default Submenu;
