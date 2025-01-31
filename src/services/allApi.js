import commonApi from "./commonApi";
import SERVER_BASE_URL from "./serverUrl";

// register api 
export const registerApi = async (reqBody) => {
    return await commonApi("POST", `${SERVER_BASE_URL}/register`, reqBody)
  };
  // login

  export const loginApi = async (reqBody) => {
    return await commonApi("POST", `${SERVER_BASE_URL}/login`, reqBody)
  };
  // addRoooms
  export const addRoomApi = async(reqBody,reqHeader)=>{
    return await commonApi("POST",`${SERVER_BASE_URL}/admin-addRoom`,reqBody,reqHeader)
  }
  // home view
  export const homeApi = async()=>{
    return await commonApi("GET",`${SERVER_BASE_URL}/home`)
  }

  // get all users
  export const getUsersApi = async () => {
    return await commonApi("GET",`${SERVER_BASE_URL}/admin-getUsers`);
  };
  // 
//   // get bookings
export const getBookingsApi = async (username) => {
  return await commonApi("GET",`${SERVER_BASE_URL}/get-bookings/${username}`);
};
// export  const result = await axios.post(`${SERVER_BASE_URL}/book-room`, bookingDetails);

export const bookRoomApi = async(reqBody)=>{
  return await commonApi("POST",`${SERVER_BASE_URL}/book-room`,reqBody)
}
