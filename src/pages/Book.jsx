import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import 'bootstrap/dist/css/bootstrap.min.css';
import SERVER_BASE_URL from '../services/serverUrl';
import { bookRoomApi } from '../services/allApi';

const Book = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { roomDetails, fromDate, toDate } = location.state || {};

  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');

  const totalDays = dayjs(toDate, 'DD-MM-YYYY').diff(dayjs(fromDate, 'DD-MM-YYYY'), 'day') + 1;
  const totalAmount = totalDays * roomDetails?.rent;

  const currentUser = JSON.parse(sessionStorage.getItem('user')) || {};

  const bookRoom = async () => {
    if (!currentUser.username) {
      console.error("User is not logged in!");
      setAlertMessage("Please login to book a room.");
      setAlertVariant('danger');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        navigate("/register");
      }, 3000);
      return;
    }

    const bookingDetails = {
      room: roomDetails?.name,
      username: currentUser.username,
      fromDate,
      toDate,
      totalAmount,
      totalDays,
      status: "booked",
    };

    setIsLoading(true);

    try {
      const result = await bookRoomApi(bookingDetails);
      console.log("Booking Successful:", result.data);

      setAlertMessage("Booking Successful! You will be redirected to the home page shortly.");
      setAlertVariant('success');
      setShowAlert(true);

      // Hide the alert and navigate to home after 3 seconds
      setTimeout(() => {
        setShowAlert(false);
        navigate("/home");
      }, 3000);
    } catch (err) {
      console.error("Error booking room:", err);
      setAlertMessage("Failed to book the room. Please try again.");
      setAlertVariant('danger');
      setShowAlert(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Cleanup function to clear alerts when the component unmounts
    return () => {
      setShowAlert(false);
    };
  }, []);

  return (
    <Container className="my-4">
      <Row className="d-flex justify-content-center align-items-center">
        <Col xs={12} md={6}>
          <Card>
            <Card.Img variant="top" src={`${SERVER_BASE_URL}/uploads/${roomDetails?.image1}`} />
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Booking Summary</Card.Title>
              <Card.Text>
                <strong>ROOM:</strong> {roomDetails?.name}<br />
                <strong>From Date:</strong> {fromDate}<br />
                <strong>To Date:</strong> {toDate}<br />
                <strong>Max Count:</strong> {roomDetails?.count}<br />
              </Card.Text>
              <Card.Text>
                <strong>Total Days:</strong> {totalDays}<br />
                <strong>Rent Per Day:</strong> {roomDetails?.rent}<br />
                <strong>Total Amount:</strong> {totalAmount}<br />
              </Card.Text>
              <Button variant="primary" onClick={bookRoom} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                    <span className="ml-2">Booking...</span>
                  </>
                ) : (
                  "Book Now"
                )}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {showAlert && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            animation: 'fadeIn 0.5s',
          }}
        >
          <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
            <Alert.Heading>{alertVariant === 'success' ? 'Booking Successful!' : 'Booking Failed'}</Alert.Heading>
            <p>{alertMessage}</p>
          </Alert>
        </div>
      )}

      {/* Inline styles for the fade-in animation */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}
      </style>
    </Container>
  );
};

export default Book;