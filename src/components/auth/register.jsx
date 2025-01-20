import { Autocomplete, Button, Snackbar, TextField } from "@mui/material";
import React, { useState } from "react";
import { getAllRoles, registerUser } from "../../services/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { navigate } from '../../utils'

function Register() {
  const [roleOption, setroleOption] = useState([]);
  const [formState, setformState] = useState({
    name: "",
    email: "",
    password: "",
    role: {},
  });
  const [open, setOpen] = useState();
  const navigate = useNavigate();
  const getRoles = async () => {
    try {
      let allRole = await getAllRoles();
      console.log("allRole", allRole);
      if (allRole?.status == 200 && allRole.data.status) {
        if (allRole.data?.data?.length) {
          let reviseRoles = allRole.data?.data.map((item) => {
            return {
              label: item.roleName,
              value: item._id,
            };
          });
          console.log(reviseRoles, "reviseRoles");
          setroleOption(reviseRoles);
        }
      } else {
        <Snackbar
          open={open}
          autoHideDuration={6000}
          // onClose={handleClose}
          message="Note archived"
          // action={action}
        />;
      }
    } catch (err) {
      console.log("getRoles err", err);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault()
    try {
      let payload = {
        name: formState.name,
        email: formState.email,
        password: formState.password,
        roleId: formState.role.value,
      };
      
      let registerdData = await registerUser(payload);
      console.log(registerdData, "registerdData");
      if(registerdData?.status==200&&registerdData?.data.status){
            alert(registerdData.data.message)
            navigate("/")
      }else{

      }
    } catch (err) {

        console.log("submitForm err",err)
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  console.log(formState, "formState");
  return (
    <div className="border border-danger h-100 d-flex align-items-center justify-content-center">
      <form className="formDiv p-3" onSubmit={submitForm}>
        <h2>Registration Page</h2>
        <div className="d-flex mt-3">
          <div className="col-md-6  px-2 m-0">
            <div className="">
              <TextField
                id="outlined-basic"
                required={true}
                type="text"
                label="Name"
                variant="outlined"
                className="w-100"
                onChange={(e) => {
                  setformState((prev) => {
                    return { ...prev, name: e.target.value };
                  });
                }}
              />
            </div>
          </div>
          <div className="col-md-6  px-2 m-0">
            <div>
              <TextField
                id="outlined-basic"
                type="email"
                required={true}
                label="Email"
                variant="outlined"
                className="w-100"
                onChange={(e) => {
                  setformState((prev) => {
                    return { ...prev, email: e.target.value };
                  });
                }}
              />
            </div>
          </div>
        </div>

        <div className="d-flex row mt-3">
          <div className="col-md-6">
            <div>
              <Autocomplete
                disablePortal
                options={roleOption}
                sx={{ width: "100%" }}
                onChange={(e, va) => {
                  setformState((prev) => {
                    return { ...prev, role: va };
                  });
                }}
                renderInput={(params) => (
                  <TextField className="w-100" required={true} {...params} label="Role" />
                )}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div>
              <TextField
                id="outlined-basic"
                type="password"
                label="password"
                required={true}
                variant="outlined"
                className="w-100"
                onChange={(e) => {
                  setformState((prev) => {
                    return { ...prev, password: e.target.value };
                  });
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-3">
          <Button variant="outlined" onClick={() => navigate("/")}>
            Login
          </Button>

          <Button variant="outlined" type="submit">Register</Button>
        </div>
      </form>
    </div>
  );
}

export default Register;
