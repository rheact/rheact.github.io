import { useCallback } from 'react';
import { Alert, Button, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { useInput } from '../../../hooks';
import SigmaLogo from './sigma.png';


const SdsPage = () => {
  const searchInput = useInput();

  const onSearch = useCallback((e) => {
    e.preventDefault();
    const st = `https://www.sigmaaldrich.com/US/en/search/${searchInput.value}?focus=products&page=1&perPage=30&sort=relevance&term=${searchInput.value}&type=product`;
    window.open(st);
  }, [searchInput.value]);

  return (
    <Container>
      <Row>
        <Col>
          <Alert color="light">
            <Row>
              <Col xs={1}>
                <img width="100%" src={SigmaLogo}/>
              </Col>
              <Col className="fst-italic">
                RHEACT currently only supports SDS from Sigma-Aldrich. You can use the searchbar below to go to Sigma-Aldrich's SDS lookup website and download the SDS PDFs.
              </Col>
            </Row>
          </Alert>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={onSearch}>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText className="bg-info text-light">
                  <i className="bi-search" />
                </InputGroupText>
              </InputGroupAddon>

              <Input {...searchInput} placeholder="Name or CAS number" />

              <InputGroupAddon addonType="append">
                <Button color="dark" type="submit">Search</Button>
              </InputGroupAddon>
            </InputGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SdsPage;
