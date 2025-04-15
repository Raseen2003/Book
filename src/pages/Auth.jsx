import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { loginApi, registerApi } from '../services/allApi';

const Auth = ({ insideRegister }) => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const register = async (e) => {
    e.preventDefault();
    if (userInput.username && userInput.password && userInput.email) {
      try {
        const result = await registerApi(userInput);
        if (result.status === 200) {
          alert(`Welcome ${result.data?.username}, Please log in to Use!!!`);
          navigate('/login');
          setUserInput({ username: "", email: "", password: "" });
        } else if (result.status === 406) {
          const errorMessage = result.data?.message || 'User already exists. Please log in.';
          alert(errorMessage);
          setUserInput({ username: "", email: "", password: "" });
        } else {
          alert('An unexpected error occurred. Please try again.');
        }
      } catch (err) {
        console.log('Error during registration:', err);
        alert('An unexpected error occurred. Please try again.');
      }
    } else {
      alert("Please fill the form completely!!!");
    }
  };

  const login = async (e) => {
    e.preventDefault();
    if (userInput.password && userInput.email) {
      try {
        const result = await loginApi(userInput);
        if (result.status === 200) {
          sessionStorage.setItem("user", JSON.stringify(result.data.user));
          sessionStorage.setItem("token", result.data.token);
          setIsLogin(true);
  
          // Dispatch custom event
          const loginEvent = new Event('userLogin');
          window.dispatchEvent(loginEvent);
  
          // Check if the user is admin
          if (userInput.email === "admin" && userInput.password === "admin") {
            setTimeout(() => {
              navigate("/admin"); // Redirect to admin panel
              setUserInput({ username: "", email: "", password: "" });
              setIsLogin(false);
            }, 1000);
          } else {
            setTimeout(() => {
              navigate("/home"); // Redirect to home for non-admin users
              setUserInput({ username: "", email: "", password: "" });
              setIsLogin(false);
            }, 1000);
          }
        } else {
          if (result.response.status === 404) {
            alert(result.response.data);
          }
        }
      } catch (err) {
        console.log('Error during login:', err);
        alert('An unexpected error occurred. Please try again.');
      }
    } else {
      alert("Please fill the form completely!!!");
    }
  };
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col>
          <Card style={{ width: '25rem' }} className="p-4 shadow">
            <Card.Body>
              <h2 className="text-center mb-4">Sign {insideRegister ? 'Up' : 'In'} to your account</h2>
              <Form>
                {insideRegister && (
                  <Form.Group className="mb-3" controlId="formBasicusername">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                      value={userInput.username}
                      onChange={(e) => setUserInput({ ...userInput, username: e.target.value })}
                      type="text"
                      placeholder="username"
                      required
                    />
                  </Form.Group>
                )}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    value={userInput.email}
                    onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
                    type="email"
                    placeholder="Enter email"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    value={userInput.password}
                    onChange={(e) => setUserInput({ ...userInput, password: e.target.value })}
                    type="password"
                    placeholder="Password"
                    required
                  />
                </Form.Group>
                {insideRegister ? (
                  <div>
                    <Button onClick={register} variant="primary" type="submit" className="w-100">
                      Register
                    </Button>
                    <p>
                      Existing User? Please Click here to <Link to={'/login'}>Login</Link>
                    </p>
                  </div>
                ) : (
                  <div>
                    <Button onClick={login} variant="primary" type="submit" className="w-100">
                      Login
                      {isLogin && <Spinner className="ms-2" animation="border" variant="light" />}
                    </Button>
                    <p>
                      New User? Please Click here to <Link to={'/register'}>Register</Link>
                    </p>
                  </div>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;