import React, { useEffect, useState } from 'react';
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

function SignupScreen(props)
{

    const submitHandler=()=>
    {

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

                  <Form>
                  <Form.Group
                      className="mb-3"
                      controlId="formBasicUserName"
                    >
                      <Form.Label>UserName</Form.Label>
                      <Form.Control  placeholder="Enter UserName" />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="text-center">
                        Email address
                      </Form.Label>
                      <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="formBasicPassword"
                    >
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" />
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