import { Alert } from 'reactstrap';

const AlertReportOnly = () => {
  return (
    <Alert color="info" isOpen>
      Details in this section are for report-purposes only and have no impact on the calculations performed by the tool.
    </Alert>
  );
};

export default AlertReportOnly;
