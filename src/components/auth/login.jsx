import React, { useEffect, useState } from "react";
import { Autocomplete, Button, Paper, TextField } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { getAllRoles, loginUser } from "../../services/auth";
// import { navigate } from "../../utils";

function Login() {
  const navigate = useNavigate();
  const [formState, setformState] = useState({
    email: "",
    password: "",
    roleData:{label:"",value:""}
  });
  const [roles, setroles] = useState([]);

  const submitForm = async (e) => {
    e.preventDefault();
    let payload ={
        email:formState.email,
        password:formState.password,
        roleId:formState.roleData.value
        };
    
    
    let loginData = await loginUser(payload);
    console.log(loginData?.data, "loginData");
    if (loginData?.status == 200 && loginData.data.status) {
      if (loginData.data?.data?.token) {
        localStorage.setItem("token", loginData.data.data.token);
        localStorage.setItem("userInfo", JSON.stringify(loginData.data.data));
        navigate("/event");
      }
      alert(loginData?.data?.message);
    } else {
      alert(loginData?.data?.message);
    }
  };
  const getRoles = async () => {
    let roles = await getAllRoles();
    if (roles.status && roles.data.status) {
      setroles(roles.data.data);
    } else {
    }
  };
  useEffect(() => {
    getRoles();
  }, []);

  console.log(roles, "roles");
  console.log(formState,"formState in login user")
  console.log("added changes");
  return (
    <div className=" p-3 d-flex justify-content-center align-items-center h-100">
      <Paper elevation={2}>
        <form className="formDiv  p-3" onSubmit={submitForm}>
          <h1 className="text-center">Login Form</h1>
          <div style={{ fontSize: "20px" }} className="mt-4">
            <TextField
              id="outlined-basic"
              type="email"
              label="Email"
              required={true}
              variant="outlined"
              className="w-100"
              style={{ fontSize: "20px" }}
              value={formState.email}
              onChange={(e) => {
                setformState((prev) => {
                  return { ...prev, email: e.target.value };
                });
              }}
            />
          </div>
          <div className="mt-4">
            <TextField
              id="outlined-basic"
              type="password"
              label="Password"
              required={true}
              variant="outlined"
              className="w-100"
              value={formState.password}
              onChange={(e) => {
                setformState((prev) => {
                  return { ...prev, password: e.target.value };
                });
              }}
            />
          </div>
          <div className="mt-4">
            {/* <TextField
              id="outlined-basic"
              type="text"
              label="LogIn As"
              required={true}
              variant="outlined"
              className="w-100"
              value={formState.password}
              onChange={(e) => {
                setformState((prev) => {
                  return { ...prev, password: e.target.value };
                });
              }}
            /> */}
            <Autocomplete
              disablePortal
              options={roles.map((item)=>{return{label:item.roleName,value:item._id}})}
              sx={{ width: "100%" }}
              value={formState.roleData}
              onChange={(e,val)=>setformState((prev)=>{return {...prev,roleData:val}})}
              renderInput={(params) => <TextField {...params} label="User Type" />}
            />
          </div>
          <div className="d-flex justify-content-around mt-4">
            <Button variant="outlined" type="submit">
              {" "}
              Login
            </Button>
            <Button variant="outlined" onClick={() => navigate("/register")}>
              {" "}
              Register
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  );
}

export default Login;
