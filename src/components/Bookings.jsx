import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert, ToastContainer, Toast } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import SERVER_BASE_URL from '../services/serverUrl';

const Bookings = () => {
  const [userBookings, setUserBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');
  const currentUser = JSON.parse(sessionStorage.getItem('user') || '{}'); // Handle null sessionStorage

  // Fetch user bookings
  const getAllUserBookings = async () => {
    if (!currentUser?.username) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${SERVER_BASE_URL}/get-bookings/${currentUser.username}`);
      setUserBookings(response.data);
    } catch (err) {
      console.error("Error fetching user bookings:", err);
      setError("Failed to fetch bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Cancel a booking
  const cancelBooking = async (bookingId) => {
    try {
      setLoading(true); // Show loading state
      const response = await axios.delete(`${SERVER_BASE_URL}/cancel-booking/${bookingId}`);
      setToastMessage(response.data.message); // Show success message
      setToastVariant('success');
      setShowToast(true);
      getAllUserBookings(); // Refresh bookings
    } catch (err) {
      console.error("Error canceling booking:", err);
      setToastMessage("Failed to cancel the booking. Please try again.");
      setToastVariant('danger');
      setShowToast(true);
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  // Fetch bookings on component mount
  useEffect(() => {
    getAllUserBookings();
  }, []);

  return (
    <Container className="my-4">
      <h3 className="text-center mb-4">My Bookings</h3>

      {/* Show loading spinner */}
      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}

      {/* Show error message if API fails */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Show message if no bookings are found */}
      {!loading && userBookings.length === 0 && (
        <Alert variant="info" className="text-center">
          No bookings found.
        </Alert>
      )}

      <Row className="d-flex justify-content-center">
        {userBookings.map((booking) => (
          <Col xs={12} md={6} key={booking._id}>
            <Card className="mb-3 shadow-sm">
              <Card.Body>
                <Card.Title className="fw-bold text-primary">Booking Details</Card.Title>
                <Card.Text>
                  <strong>Room:</strong> {booking.room} <br />
                  <strong>Check In:</strong> {booking.fromDate} <br />
                  <strong>Check Out:</strong> {booking.toDate} <br />
                  <strong>Amount:</strong> ₹{booking.totalamount} <br />
                  <strong>Status:</strong> 
                  <span className={`badge ${booking.status === "Confirmed" ? "bg-success" : "bg-warning"}`}>
                    {booking.status}
                  </span>
                </Card.Text>
                <Button variant="danger" onClick={() => cancelBooking(booking._id)}>
                  Cancel Booking
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Toast for showing messages */}
      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Booking</strong>
          </Toast.Header>
          <Toast.Body className={`text-${toastVariant}`}>
            {toastMessage}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default Bookings;