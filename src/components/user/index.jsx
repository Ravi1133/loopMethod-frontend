import React, { useEffect, useState } from "react";
import { blockUser_service, getAlluser } from "../../services/auth";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PaginationPage from "../common/Pagination";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import MenuAppBar from "../common/Appbar";
import { USER_STATUS_OBJ } from "../../utils";

function Index() {
  const [users, setusers] = useState([]);
  const [paginationData, setpaginationData] = useState({});
  const [page, setpage] = useState(1);
  const [limit, setlimit] = useState(10);
  const navigate = useNavigate();
  const getAllUserFunc = async () => {
    let payload = {
      page: page,
      limit: 10,
    };
    let userData = await getAlluser(payload);
    console.log(userData, "userData");
    if ((userData?.status == 200) & userData?.data?.status) {
      setusers(userData.data.data.list);
      setpaginationData(userData.data.data.pageMeta);
    } else {
    }
  };
  useEffect(() => {
    getAllUserFunc();
  }, [page]);

  const onChangeFunc = (data, value) => {
    console.log(data, "onChangeFunc", value);
    setpage(value);
  };
  console.log(users, "users");
  const textGive = (text, action) => {
    if (text == USER_STATUS_OBJ.ACTIVE) {
      return { text: USER_STATUS_OBJ.BLOCKED.slice(0, 5), color: "red",normal: USER_STATUS_OBJ.BLOCKED};
    } else {
      return { text: USER_STATUS_OBJ.ACTIVE, color: "green" ,normal: USER_STATUS_OBJ.ACTIVE};
    }
  };

  const blockUnblock = async (row) => {
    textGive(row.status).text;
    let payload = {
      status: textGive(row.status).normal,
      idToBlock:row._id
    };
    let blockUser = await blockUser_service(payload);
    console.log("blockUser", blockUser);
    if (blockUser?.status == 200 && blockUser.data?.status) {
      getAllUserFunc();
      alert(blockUser.data?.message);
    }
  };
  return (
    <div>
      <MenuAppBar />
      <div
        className="d-flex justify-content-between px-4"
        style={{ paddingTop: "90px" }}
      >
        <h2>All User</h2>
        <Button
          variant="contained"
          className="ms-3"
          onClick={() => navigate("/event")}
        >
          Event{" "}
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: "17px" }}>Name</TableCell>
              <TableCell sx={{ fontSize: "17px" }} align="right">
                Email
              </TableCell>
              <TableCell sx={{ fontSize: "17px" }} align="right">
                Role Name
              </TableCell>
              <TableCell sx={{ fontSize: "17px" }} align="right">
                Status
              </TableCell>
              <TableCell sx={{ fontSize: "17px" }} align="right">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  fontSize: "18px",
                }}
              >
                <TableCell sx={{ fontSize: "16px" }} component="th" scope="row">
                  {row?.name}
                </TableCell>
                <TableCell sx={{ fontSize: "16px" }} align="right">
                  {row.email}
                </TableCell>
                <TableCell sx={{ fontSize: "16px" }} align="right">
                  {row.roleName}
                </TableCell>
                <TableCell sx={{ fontSize: "16px" }} align="right">
                  {row.status}
                </TableCell>
                <TableCell
                  sx={{ fontSize: "16px", color: textGive(row.status).color }}
                  align="right"
                  onClick={() => blockUnblock(row)}
                >
                  {textGive(row.status).text}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="mt-4 d-flex justify-content-end">
        <PaginationPage
          count={paginationData.totalPages}
          onChangeFunc={onChangeFunc}
        />
      </div>
    </div>
  );
}

export default Index;
