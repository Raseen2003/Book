import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { Table, Button, Container, Row, Col, Card } from "react-bootstrap";
import { addRoomApi, homeApi,getUsersApi, getAllBookingsApi, } from "../../services/allApi";


const { TabPane } = Tabs;

const tabStyle = {
  backgroundColor: "",
  color: "white",
  fontSize: "20px",
};



const Booked = () => {

  const handleClose = ()=>{
  
    setRoomDetails({
      name:"",rent:"",count:"",description:"",type:"",image1:"",image2:"",image3:""
    })
  }
const [roomData,setRoomData] = useState([])

useEffect(() => {
  getRoomDetailHandler();

},[])



  const [roomDetails,setRoomDetails] = useState({
    name:"",rent:"",count:"",description:"",type:"",image1:"",image2:"",image3:""
  })
  const getRoomDetailHandler = async () => {
      try {
        const result = await homeApi();
        if (result.status === 200) {
          setRoomData(result.data);
        } else {
          alert("An unexpected error occurred. Please try again.");
        }
      } catch (err) {
        console.log("Error during viewing rooms:", err);
        alert("An unexpected error occurred. Please try again.");
      }
    };


    const handleAddRoom = async (event) => {
      console.log("inside handleAddRoom");
      event.preventDefault();
  
      const { name, rent, count, description, type, image1, image2, image3 } = roomDetails;
      console.log(name, rent, count, description, type, image1, image2, image3);
  
      if (name && rent && count && description && type && image1 && image2 && image3) {
          // api call
          const reqBody = new FormData();
          reqBody.append("name", name);
          reqBody.append("rent", rent);
          reqBody.append("count", count);
          reqBody.append("description", description);
          reqBody.append("type", type);
          reqBody.append("image1", image1);
          reqBody.append("image2", image2);
          reqBody.append("image3", image3);
  
          const token = sessionStorage.getItem("token");
          if (token) {
              const reqHeader = {
                  "Content-Type": "multipart/form-data",
                  "Authorization": `Bearer ${token}`
              }
              // make api call
              try {
                  const result = await addRoomApi(reqBody, reqHeader);
                  if (result.status === 200) {
                      alert("Room added successfully");
                      setTimeout(() => {
                          handleClose();
                      }, 3000);
                  } else {
                      alert(result.response.data);
                  }
              } catch (err) {
                  console.error("API Error:", err);
                  if (err.response && err.response.status === 500) {
                      alert("Internal Server Error. Please try again later.");
                  } else {
                      alert(`Error: ${err.message}`);
                  }
              }
          }
      } else {
          alert("Fill the form completely!!!");
      }
  }
  
// get all users
const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await getUsersApi();
        if (result.status === 200) {
          setUsers(result.data); // Save fetched users in state
        } else {
          alert("Failed to fetch users.");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("An error occurred while fetching users.");
      }
    };

    fetchUsers();
  }, []);

  // get all bookings'
  const [bookings, setBookings] = useState([]);
  console.log(bookings);
  

  useEffect(() => {
      const fetchBookings = async () => {
          try {
              const result = await getAllBookingsApi();
              console.log(result.data);
              
              if (result.status === 200) {
                  setBookings(result.data);
              } else {
                  alert("Failed to fetch bookings.");
              }
          } catch (error) {
              console.error("Error fetching bookings:", error);
              alert("An error occurred while fetching bookings.");
          }
      };
      fetchBookings();
  }, []);
  

  return (
    <div className="mt-3 ml-3 bs">
      <h1 className="text-center">Admin Panel</h1>
      <Tabs defaultActiveKey="1">
      <TabPane
    className="text-white"
    tab={<span style={tabStyle}>Bookings </span>}
    key="1"
>
    <Container>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Username</th>
                    
                    <th>Room Name</th>
                    
                  
                    <th>From Date</th>
                    <th>To Date</th>
                    <th>Total Days</th>
                    <th>Total Amount</th>
                </tr>
            </thead>
            <tbody>
                {bookings.map((booking, index) => (
                    <tr key={booking._id}>
                        <td>{index + 1}</td>
                        <td>{booking.username || "N/A"}</td>
                       
                        <td>{booking.room || "N/A"}</td>
                        
                       
                        <td>{booking.fromDate}</td>
                        <td>{booking.toDate}</td>
                        <td>{booking.totaldays}</td>
                        <td>{booking.totalamount}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </Container>
</TabPane>

        <TabPane
          className="text-white"
          tab={<span style={tabStyle}>Add Rooms</span>}
          key="2"
        >
          {" "}
          <Container>
            {" "}
            <Card className="p-4 shadow-sm rounded">
              {" "}
              <h4 className="text-center mb-4">Add Room</h4>{" "}
              <form > 
                {" "}
                <Row>
                  {" "}
                  <Col md={6}>
                    {" "}
                    <div className="mb-3">
                      {" "}
                      <label htmlFor="formName" className="form-label">
                        {" "}
                        Name{" "}
                      </label>{" "}
                      <input value={roomDetails.name} onChange={e=>setRoomDetails({...roomDetails,name:e.target.value})}
                        type="text"
                        id="formName"
                        className="form-control"
                        placeholder="Enter name"
                      />{" "}
                    </div>{" "}
                    <div className="mb-3">
                      {" "}
                      <label htmlFor="formRentPerDay" className="form-label">
                        {" "}
                        Rent per day{" "}
                      </label>{" "}
                      <input value={roomDetails.rent} onChange={e=>setRoomDetails({...roomDetails,rent:e.target.value})}
                        type="text"
                        id="formRentPerDay"
                        className="form-control"
                        placeholder="Enter rent per day"
                      />{" "}
                    </div>{" "}
                    <div className="mb-3">
                      {" "}
                      <label htmlFor="formMaxCount" className="form-label">
                        {" "}
                        Max count{" "}
                      </label>{" "}
                      <input value={roomDetails.count} onChange={e=>setRoomDetails({...roomDetails,count:e.target.value})}
                        type="text"
                        id="formMaxCount"
                        className="form-control"
                        placeholder="Enter max count"
                      />{" "}
                    </div>{" "}
                    <div className="mb-3">
                      {" "}
                      <label htmlFor="formDescription" className="form-label">
                        {" "}
                        Description{" "}
                      </label>{" "}
                      <input value={roomDetails.description} onChange={e=>setRoomDetails({...roomDetails,description:e.target.value})}
                        type="text"
                        id="formDescription"
                        className="form-control"
                        placeholder="Enter description"
                      />{" "}
                    </div>{" "}
                  </Col>{" "}
                  <Col md={6}>
                    {" "}
                    <div className="mb-3">
                      {" "}
                      <label htmlFor="formType" className="form-label">
                        {" "}
                        Type{" "}
                      </label>{" "}
                      <input value={roomDetails.type} onChange={e=>setRoomDetails({...roomDetails,type:e.target.value})}
                        type="text"
                        id="formType"
                        className="form-control"
                        placeholder="Enter type"
                      />{" "}
                    </div>{" "}
                    <div className="mb-3">
                      {" "}
                      <label htmlFor="formImage1" className="form-label">
                        {" "}
                        Image 1{" "}
                      </label>{" "}
                      <input onChange={e=>setRoomDetails({...roomDetails,image1:e.target.files[0]})}
                        type="file"
                        id="formImage1"
                        className="form-control"
                      />{" "}
                    </div>{" "}
                    <div className="mb-3">
                      {" "}
                      <label htmlFor="formImage2" className="form-label">
                        {" "}
                        Image 2{" "}
                      </label>{" "}
                      <input onChange={e=>setRoomDetails({...roomDetails,image2:e.target.files[0]})}
                        type="file"
                        id="formImage2"
                        className="form-control"
                      />{" "}
                    </div>{" "}
                    <div className="mb-3">
                      {" "}
                      <label htmlFor="formImage3" className="form-label">
                        {" "}
                        Image 3{" "}
                      </label>{" "}
                      <input onChange={e=>setRoomDetails({...roomDetails,image3:e.target.files[0]})}
                        type="file"
                        id="formImage3"
                        className="form-control"
                      />{" "}
                    </div>{" "}
                  </Col>{" "}
                </Row>{" "}
                <Button onClick={handleAddRoom} variant="primary" type="submit" className="mt-3 btn-sm"> Add Room </Button>
              </form>{" "}
            </Card>{" "}
          </Container>{" "}
        </TabPane>{" "}
       
        <TabPane
          className="text-white"
          tab={<span style={tabStyle}>All Rooms</span>}
          key="3"
        >
          <Container>
            <h4 className="text-center mb-4">Rooms</h4>{" "}
            <Table striped bordered hover>
              {" "}
              <thead>
                {" "}
                <tr>
                
                  <th>Name</th> <th>Type</th>{" "}
                  <th>Rent Per Day</th> <th>Max Count</th> 
                </tr>{" "}
              </thead>{" "}
              <tbody>
                {" "}
                {
                  roomData.map(room=>(
                    <tr>
                    <td>{room?.name}</td> <td>{room?.type}</td> <td>{room?.rent}</td>{" "}<td>{room?.count}</td> 
                  </tr>
                  ))
                }
              </tbody>{" "}
            </Table>{" "}
          </Container>{" "}
        </TabPane>
        <TabPane
  className="text-white"
  tab={<span style={tabStyle}>Users</span>}
  key="4"
>
  <table className="table table-dark">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Username</th>
        <th scope="col">Email</th>
        <th scope="col">Password</th>
      </tr>
    </thead>
    <tbody>
    {users.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
      </tr>
       ))}
      {/* Add more rows as needed */}
    </tbody>
  </table>
</TabPane>

      </Tabs>
    </div>
  );
};

export default Booked;