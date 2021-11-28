import { useCallback } from "react";
import { Button } from "reactstrap";
import GenerateButton from "./GenerateButton";
import './results.css';
import HazardStatements from "./sections/HazardStatements";
import HazardMatrix from "./sections/HazardMatrix";
import CameoMatrix from './sections/CameoMatrix';
import CalculationBlock from "./sections/CalculationBlock";

const ReportSection = () => {
  return (
    <section id="printable">
      <div className="d-flex justify-content-between">
        <h1 className="fw-bolder">RHEACT Safety Report</h1>
        <span>Generated: {new Date().toLocaleString()}</span>
      </div>

      <hr />

      <CalculationBlock className="mt-2" />
      <HazardStatements className="mt-2" />
      <CameoMatrix className="mt-2" />
      <HazardMatrix className="mt-2" />

    </section>
  );
};

const ResultsPage = () => {
  const onPrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <>
      <div className="w-100 d-flex align-items-center p-2 border" style={{ backgroundColor: 'white' }}>
        <Button className="ms-auto" color="secondary">
          <i className="bi bi-person-lines-fill me-1" />
          Send Feedback
        </Button>

        <Button color="primary" className="ms-1" onClick={onPrint}>
          <i className="bi bi-printer-fill me-1" />
          Print
        </Button>
      </div>

      <div className="mt-2">
        <GenerateButton />
      </div>

      <article className="p-5">
        <ReportSection />
      </article>
    </>
  );
};

export default ResultsPage;
