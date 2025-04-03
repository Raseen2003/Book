import React, { useState } from "react";
import { Card, Button, Modal, Carousel, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import SERVER_BASE_URL from "../services/serverUrl";
import { FaEye, FaBed, FaTag, FaCalendarCheck } from "react-icons/fa";

const Cards = ({ roomDetails, fromDate, toDate }) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleBookNow = () => {
    if (!fromDate || !toDate) {
      alert("Please select check-in and check-out dates.");
      return;
    }
    navigate('/Book', { state: { roomDetails, fromDate, toDate } });
  };

  return (
    <Card
      className="h-100 rounded-4 overflow-hidden border-0"
      style={{
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        boxShadow: "0 4px 24px rgba(0, 0, 0, 0.1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = "0 12px 32px rgba(0, 0, 0, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 24px rgba(0, 0, 0, 0.1)";
      }}
    >
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={`${SERVER_BASE_URL}/uploads/${roomDetails?.image1}`}
          style={{ 
            height: "240px", 
            objectFit: "cover",
            filter: "brightness(0.95)",
          }}
          className="rounded-top-4"
        />
        <div 
          className="position-absolute bottom-0 start-0 bg-dark text-white p-2 rounded-end"
          style={{ background: "rgba(0, 0, 0, 0.7)", fontSize: "1.2rem" }}
        >
          {roomDetails?.name}
        </div>
        <Badge 
          pill 
          className="position-absolute top-0 end-0 m-3 px-3 py-2"
          style={{ background: "rgba(0, 0, 0, 0.7)", fontSize: "0.9rem" }}
        >
          <FaTag className="me-2" />
          {roomDetails?.type}
        </Badge>
      </div>

      <Card.Body className="p-4 d-flex flex-column">
        <div className="mb-3">
          <Card.Title className="fw-bold fs-4 mb-2 text-dark">
            {roomDetails?.name}
          </Card.Title>
          <div className="d-flex align-items-center text-muted mb-2">
            <FaBed className="me-2" />
            <span className="small">Sleeps up to {roomDetails?.count} guests</span>
          </div>
        </div>

        <div className="mt-auto d-grid gap-2">
        <Button
            variant="dark"
            onClick={handleShow}
            className="d-flex align-items-center justify-content-center gap-2 py-2"
          >
            <FaEye />
             View Details
          </Button>
          
          <Button
            variant="dark"
            onClick={handleBookNow}
            className="d-flex align-items-center justify-content-center gap-2 py-2"
          >
            <FaCalendarCheck />
            Book Now
          </Button>
        </div>
      </Card.Body>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold fs-3">{roomDetails?.name}</Modal.Title>
        </Modal.Header>
        
        <Modal.Body className="pt-0">
          <Carousel indicators={false} className="rounded-4 overflow-hidden">
            {[roomDetails?.image2, roomDetails?.image3].map((img, index) => (
              <Carousel.Item key={index}>
                <img
                  src={`${SERVER_BASE_URL}/uploads/${img}`}
                  className="d-block w-100"
                  style={{ height: "400px", objectFit: "cover" }}
                  alt={`Room view ${index + 1}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>

          <div className="mt-4">
            <h5 className="fw-bold mb-3">About this room</h5>
            <p className="text-muted lh-lg" style={{ fontSize: "0.95rem" }}>
              {roomDetails?.description}
            </p>
            
            <div className="d-flex gap-3 mt-4">
              <div className="d-flex align-items-center text-muted">
                <FaBed className="me-2 fs-5" />
                <span>Sleeps {roomDetails?.count}</span>
              </div>
              <div className="d-flex align-items-center text-muted">
                <FaTag className="me-2 fs-5" />
                <span>{roomDetails?.type}</span>
              </div>
            </div>
          </div>
        </Modal.Body>
        
        <Modal.Footer className="border-0">
          <Button variant="outline-dark" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default Cards;
