import axios from 'axios';
import React from 'react'




function handleAxiosError(error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios Error Details:");
  
      // Extract and log relevant error details
      if (error.response) {
        // The request was made, and the server responded with a status code outside the 2xx range
        console.error("Status Code:", error.response.status);
        console.error("Response Data:", error.response.data);
        console.error("Headers:", error.response.headers);
      } else if (error.request) {
        // The request was made, but no response was received
        console.error("No Response Received:", error.request);
      } else {
        // Something happened while setting up the request
        console.error("Request Error:", error.message);
      }
    } else {
      console.error("Non-Axios Error:", error);
    }
  }

   const unAuthorizedAction=(code)=>{
    
    console.log("unAuthorizedAction code",code)
    if(code==401){
        localStorage.removeItem("token")
        window.location.href = "/";
    }
  }

  const userInfoData = () => {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    return userInfo;
  };

const USER_STATUS_OBJ={ACTIVE:"ACTIVE",INACTIVE:"INACTIVE",BLOCKED:"BLOCKED"}

export {
    handleAxiosError,
    unAuthorizedAction,
    userInfoData,
    USER_STATUS_OBJ
}