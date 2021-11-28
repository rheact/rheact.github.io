import { useCallback } from 'react';
import { Alert, Button, Col, Form, Input, InputGroup, InputGroupText, Row } from 'reactstrap';
import { useInput } from '../../../hooks';
import { } from '../store';
import './dropzone.css';
import SigmaLogo from './icons/sigma.png';

const SearchBox = () => {
  const searchInput = useInput();
  const onSearch = useCallback((e) => {
    e.preventDefault();
    const st = `https://www.sigmaaldrich.com/US/en/search/${searchInput.value}?focus=products&page=1&perPage=30&sort=relevance&term=${searchInput.value}&type=product`;
    window.open(st);
  }, [searchInput.value]);
  return (
    <Form onSubmit={onSearch}>
      <InputGroup>
        <InputGroupText>
          <img width="64px" src={SigmaLogo} alt="sigma-algrich-logo" />
        </InputGroupText>

        <Input {...searchInput} placeholder="Search Name or CAS number" />

        <Button color="dark" type="submit">Go</Button>
      </InputGroup>
    </Form>
  );
};

export const AlertAldrichOnly = () => {
  return (
      <Alert color="light">
        <Row>
          <Col className="fst-italic">
            RHEACT currently only supports SDS from Sigma-Aldrich. You can use the searchbar below to go to Sigma-Aldrich's SDS lookup website and download the SDS PDFs.
          </Col>
        </Row>

        <Row className="mt-2">
          <SearchBox />
        </Row>
      </Alert>
  );

};
