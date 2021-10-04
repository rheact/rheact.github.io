import { useEffect, useRef, useState } from 'react';
import { Card, CardBody, CardHeader, Input, Label } from 'reactstrap';

const ReactionCard = () => {
  const [eq, setEq] = useState("");
  const katexRef = useRef();

  useEffect(() => {
    if(eq) {
      window.katex.render(`\\ce\{ ${eq} \}`, katexRef.current, {
        throwOnError: false
      });
    }
    else {
      window.katex.render(`\\text{No equation}`, katexRef.current, {
        throwOnError: false
      });
    }
  }, [eq]);

  return (
    <Card>
      <CardHeader className="fw-bolder">
        Reaction Details
      </CardHeader>

      <CardBody>
        <Label>Complete Balanced Reaction</Label>
        <Input type="textarea" value={eq} onChange={e => setEq(e.target.value)}  />
        <div className="d-flex justify-content-end">
          <small className="text-muted">We use <a href="https://mhchem.github.io/MathJax-mhchem/">mhchem</a> chemical equations for rendering. </small>
        </div>
        <div className="text-center py-2" ref={katexRef} />

        <Label>Description of scope of project</Label>
        <Input type="textarea" />
      </CardBody>
    </Card>
  );
};

export default ReactionCard;
