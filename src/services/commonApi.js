import axios from 'axios';

const commonApi = async (httpMethod, url, reqBody, reqHeader) => {
  const reqConfig = {
    method: httpMethod,
    url,
    data: reqBody,
    headers: reqHeader ? reqHeader : { "Content-Type": "application/json" }
  };

  try {
    const response = await axios(reqConfig);
    console.log("API Response:", response);
    return response;
  } catch (error) {
    console.error("API Error:", error);
    return error.response ? error.response : error;
  }
};

export default commonApi;
