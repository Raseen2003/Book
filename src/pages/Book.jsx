import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { useLocation,useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import 'bootstrap/dist/css/bootstrap.min.css';
import SERVER_BASE_URL from '../services/serverUrl';
import axios from 'axios';
import { bookRoomApi } from '../services/allApi';

const Book = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { roomDetails, fromDate, toDate } = location.state || {};

  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  console.log(roomDetails);
  console.log(fromDate);
  console.log(toDate);

  // Calculate total days
  const totalDays = dayjs(toDate, 'DD-MM-YYYY').diff(dayjs(fromDate, 'DD-MM-YYYY'), 'day')+1;

  // Calculate total amount
  const totalAmount = totalDays * roomDetails?.rent;

  // const handlePayNow = () => {
  //   setIsLoading(true);
  //   // Simulate payment processing
  //   setTimeout(() => {
  //     setIsLoading(false);
  //     setShowAlert(true);
  //     setTimeout(() => {
  //       setShowAlert(false);
  //       navigate('/home');
  //     }, 3000); 
  //   }, 2000); // Simulates a 2-second payment processing time
  // };
  const currentUser = JSON.parse(sessionStorage.getItem('user')) || {};
  async function bookRoom() {
    if (!currentUser.username) {
      console.error("User is not logged in!");
      alert("Please login to book a room.");
      setTimeout(() => {
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
  
    try {
      const result = await bookRoomApi(bookingDetails);
      console.log("Booking Successful:", result.data);
      alert("Booking Successful. Redirecting to bookings page...");
      setTimeout(() => {
        navigate("/bookings");
      }, 2000);
    } catch (err) {
      console.error("Error booking room:", err);
    }
  }
  
  
  return (
    <Container className="my-4">
      <Row className="d-flex justify-content-center align-items-center">
        <Col xs={12} md={6}>
          <Card>
            <Card.Img variant="top" src= {`${SERVER_BASE_URL}/uploads/${roomDetails?.image1}`} />
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
              <Button variant="primary" onClick={bookRoom} >
                Pay Now
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    
      
    </Container>
  );
};

export default Book;
