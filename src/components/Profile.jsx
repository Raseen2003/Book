import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")

  useEffect(()=>{
    if(sessionStorage.getItem("user")){
  const users =  JSON.parse(sessionStorage.getItem("user"));
      setUsername(users.username.split(" ")[0]);
      setEmail(users.email)

    }

  },[])
  
  return (
    <div className="my-4">
      <Row className="d-flex justify-content-center">
        <Col xs={12} md={8}>
          <Card>
            <Card.Header>
              <Nav variant="tabs" defaultActiveKey="#profile">
                <Nav.Item>
                  <Nav.Link href="#profile">My Profile</Nav.Link>
                </Nav.Item>
              
              </Nav>
            </Card.Header>
            <Card.Body>
              <Card.Title>Profile Information</Card.Title>
              <Card.Text>
                <strong>Name:</strong>{username}<br />
                <strong>Email:</strong>{email}<br />
                <br />
              </Card.Text>
             
                <Button variant="primary">Edit</Button>
              
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
