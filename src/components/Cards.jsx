import React, { useState } from "react";
import { Card, Button, Modal, Carousel } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import SERVER_BASE_URL from "../services/serverUrl";

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
      className="h-100 rounded"
      style={{ transition: "transform 0.3s ease, box-shadow 0.3s ease", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
      }}
    >
      <Card.Img
        variant="top"
        src={`${SERVER_BASE_URL}/uploads/${roomDetails?.image1}`}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Body className="text-center">
        <Card.Title className="fw-bold fs-4">{roomDetails?.name}</Card.Title>
        <h5>max count : {roomDetails?.count}</h5>
        <h5>{roomDetails?.type}</h5>
        <button
          onClick={handleShow}
          className="btn rounded me-3"
        >
          VIEW MORE
        </button>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{roomDetails?.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Carousel>
              <Carousel.Item>
                <img
                  src={`${SERVER_BASE_URL}/uploads/${roomDetails?.image2}`}
                  className="d-block w-100"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  src={`${SERVER_BASE_URL}/uploads/${roomDetails?.image3}`}
                  className="d-block w-100"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              </Carousel.Item>
            </Carousel>
            <div className="mt-3">
              <p>{roomDetails?.description}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <button
          className="btn rounded me-2"
          onClick={handleBookNow}
        >
          BOOK NOW
        </button>
      </Card.Body>
    </Card>
  );
};

export default Cards;
