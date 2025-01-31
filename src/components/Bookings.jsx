import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import SERVER_BASE_URL from '../services/serverUrl';

const Bookings = () => {
  const [userBookings, setUserBookings] = useState([]);
  const currentUser = JSON.parse(sessionStorage.getItem('user')) || {};

  // Fetch user bookings
  const getAllUserBookings = async () => {
    try {
      const result = await axios.get(`${SERVER_BASE_URL}/get-bookings/${currentUser.username}`);
      setUserBookings(result.data);
    } catch (err) {
      console.error("Error fetching user bookings:", err);
    }
  };

  // Cancel a booking
  const cancelBooking = async (bookingId) => {
    try {
      const result = await axios.delete(`${SERVER_BASE_URL}/cancel-booking/${bookingId}`);
      alert(result.data.message); // Show success message

      // Refresh the booking list
      getAllUserBookings();
    } catch (err) {
      console.error("Error canceling booking:", err);
      alert("Failed to cancel the booking. Please try again.");
    }
  };

  // Fetch bookings on component mount
  useEffect(() => {
    getAllUserBookings();
  }, []);

  return (
    <Container className="my-4">
      <Row className="d-flex justify-content-center">
        {userBookings.map((booking) => (
          <Col xs={12} md={6} key={booking._id}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Booking Details</Card.Title>
                <Card.Text>
                  <strong>Room:</strong> {booking.room} <br />
                  <strong>Check In:</strong> {booking.fromDate} <br />
                  <strong>Check Out:</strong> {booking.toDate} <br />
                  <strong>Amount:</strong> {booking.totalamount} <br />
                  <strong>Status:</strong> {booking.status}
                </Card.Text>
                <Button variant="danger" onClick={() => cancelBooking(booking._id)}>
                  Cancel Booking
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Bookings;
  