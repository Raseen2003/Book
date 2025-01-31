import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Cards from "../components/Cards";
import { homeApi } from "../services/allApi";
import { DatePicker } from 'antd';
import dayjs from "dayjs";

const Home = () => {
  useEffect(() => {
    viewRoomHandler();
  }, []);

  const [viewRoom, setViewRoom] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const { RangePicker } = DatePicker;

  const viewRoomHandler = async () => {
    try {
      const result = await homeApi();
      if (result.status === 200) {
        setViewRoom(result.data);
      } else {
        alert('An unexpected error occurred. Please try again.');
      }
    } catch (err) {
      console.log('Error during viewing rooms:', err);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  const filterByDate = (dates) => {
    if (dates && dates.length === 2) {
      const formattedCheckIn = dayjs(dates[0]).format('DD-MM-YYYY');
      const formattedCheckOut = dayjs(dates[1]).format('DD-MM-YYYY');
      setFromDate(formattedCheckIn);
      setToDate(formattedCheckOut);
    } else {
      console.log('Dates are not properly selected');
    }
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f8f9fa" }}>
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={3}>
          <RangePicker format='DD-MM-YYYY' onChange={filterByDate} style={{ width: '100%' }} />
        </Col>
        <Col xs={12} md={3}>
          <Form.Control
            type="text"
            placeholder="Search Rooms"
            style={{ fontSize: "14px" }}
          />
        </Col>
        <Col xs={12} md={2}>
          <Form.Select style={{ fontSize: "14px" }}>
            <option>All</option>
            <option>Deluxe</option>
            <option>Standard</option>
            <option>Suite</option>
          </Form.Select>
        </Col>
      </Row>
      <Row>
        {viewRoom.map(room => (
          <Col xs={12} md={4} lg={3} className="mb-4" key={room.id}>
            <Cards roomDetails={room} fromDate={fromDate} toDate={toDate} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
