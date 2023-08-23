import React, { useEffect, useState } from 'react';
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';
function SignupScreen(props)
{

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const userRegister = useSelector(state => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const dispatch = useDispatch();

  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  }
    return (
        <div>
            <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <div className="border border-3 border-primary"></div>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-md-4">
                <h2 className="fw-bold mb-2 text-uppercase ">Sign Up</h2>
                <p className=" mb-5">Your Information </p>
                <div className="mb-3">

                  <Form onSubmit={submitHandler}>
                  <Form.Group
                      className="mb-3"
                      controlId="formBasicUserName"
                    >
                      <Form.Label>UserName</Form.Label>
                      <Form.Control  placeholder="Enter UserName" type="name" name="name" id="name" onChange={(e) => setName(e.target.value)} />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="text-center">
                        Email address
                      </Form.Label>
                      <Form.Control type="email" placeholder="Enter email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="formBasicPassword"
                    >
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>

                    
                    <div className="d-grid">
                      <Button variant="primary" type="submit">
                        Submit
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>

        </div>

    )
}

export default SignupScreen;