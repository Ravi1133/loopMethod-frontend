import React, { useEffect, useState } from "react";
import { getAlluser } from "../../services/auth";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PaginationPage from "../common/Pagination";
import { getAlEvent } from "../../services/event";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "./style.css";
import { bookTicket_service } from "../../services/ticket";
import MenuAppBar from "../common/Appbar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { debounce, userInfoData } from "../../utils";
// import { Button } from "bootstrap";
let defaultTiocketToBook={
  GENERAL: 0,
  VIP: 0,
  VVIP: 0,
}
function Index() {
  const [events, setevents] = useState([]);
  const [paginationData, setpaginationData] = useState({});
  const [page, setpage] = useState(1);
  const [limit, setlimit] = useState(10);
  const [openTicketModel, setopenTicketModel] = useState(false);
  const [selctedEvent, setselctedEvent] = useState({});
  const [openEventoption, setopenEventoption] = useState(null);
  const [isLoading,setisLoading]=useState(null)
  const [ticketToBook, setticketToBook] = useState(defaultTiocketToBook);
  const [isBooking,setIsBooking]=useState(null)
  const navigate = useNavigate();
  const getAllEventFunc = async () => {
    setisLoading(true)
    let payload = {
      page: page,
      limit: 10,
    };
    let userData = await getAlEvent(payload);

    console.log(userData, "userData");
    if ((userData?.status == 200) && userData?.data.status) {
      setevents(userData.data.data.list);
      setpaginationData(userData.data.data.pageMeta);
      setisLoading(false)
    } else {
    }
  };
  useEffect(() => {
    getAllEventFunc();
  }, [page,openTicketModel]);

  const onChangeFunc = (data, value) => {
    console.log(data, "onChangeFunc", value);
    setpage(value);
  };
  console.log(events, "events");

  let bookTicketFunc = async () => {
    setIsBooking(true)
    let ticketCount=0
    Object.values(ticketToBook).map((item)=>{
      ticketCount=ticketCount+item
    })
    if(!ticketCount){
      alert("Please give your number")
      return
    }
    if(Object.values(ticketToBook)){

    }
    let payload = {
      eventId: selctedEvent._id,
      category: {
        GENERAL: ticketToBook.GENERAL,
        VIP: ticketToBook.VIP,
        VVIP: ticketToBook.VVIP,
      },
    };
    let result = await bookTicket_service(payload);
    if ((result.status == 200) & result.data.status) {
      setopenTicketModel(false);
      setselctedEvent({});
      setticketToBook(defaultTiocketToBook);
      alert(result.data.message);
      getAllEventFunc();
    } else {
      // alert(result.data.message)
    }
    setIsBooking(false)
    setopenTicketModel(false)
  };
  

  const handleOpenInMaps = (address) => {
    // Construct the Google Maps URL
    console.log();
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address
    )}`;

    // Open the URL in a new tab
    window.open(googleMapsUrl, "_blank");
  };

  console.log(ticketToBook,"ticketToBook")
  

  return (
    <div className="">
      <MenuAppBar />
      <div
        className="d-flex justify-content-between "
        style={{ paddingTop: "80px" }}
      >
        <h2>All Event</h2>
        {userInfoData()?.roleData?.event?.create&&<Button variant="contained" onClick={() => navigate("/addEvent")}>
          Add Event
        </Button>}
      </div>
      {/* <TableContainer component={Paper} className="w-100">
        <Table sx={{ minWidth: 650 }} aria-label="simple table" className="w-100">
          <TableHead className="w-100">
            <TableRow className="w-100">
              <TableCell>Sr No</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Location</TableCell>
              <TableCell align="right">Description</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody className="w-100">
            {events?.map((row, index) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {page * index + 1}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
      {/* <div className="mt-4 d-flex justify-content-end">
        <PaginationPage
          count={paginationData.totalPages}
          onChangeFunc={onChangeFunc}
        />
      </div> */}
      <div className="row">
         {!isLoading? events?.map((row, index) => (
          <div className="col-md-4 p-4 d-flex justify-content-center" id={`paper${index}`}>
            <Paper className="p-3" position="static"  >
              <div style={{ width: "300px" }}>
                <h1 className="text-center">{row.name}</h1>
                {/* <Menu
                  id={`paper${index}`}
                  anchorEl={openEventoption}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(openEventoption)}
                  onClose={() => setopenEventoption(false)}
                >
                  <MenuItem onClick={() => navigate(`/profitLoss?eventId=${row._id}`)}>
                    Check Event
                  </MenuItem>
                  <MenuItem onClick={() => navigate(`/updateEvent?eventId=${row._id}`)}>
                    Update Event
                  </MenuItem>
                </Menu> */}
                <MoreVertIcon
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "0",
                    fontSize: "20px",
                  }}
                  onClick={() => setopenEventoption(true)}
                />
                <div className="d-flex justify-content-center  m-auto">
                  {" "}
                  <img
                    className="m-auto border blur-border-container"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwQMo9iSNxJj5HFsafTmreGoO_8fCYsPDxtg&s"
                  />
                </div>
              </div>
              <h4 className="text-center">{row.description}</h4>
              <div>
                <div>
                  <div className="d-flex justify-content-between">
                    {Object.keys(row.ticketCount).map((item) => {
                      return <div>{item}</div>;
                    })}
                  </div>
                  <div className="d-flex justify-content-between">
                    {" "}
                    {Object.values(row.ticketCount).map((item) => {
                      return <div>{item?.size}</div>;
                    })}
                  </div>
                  <div></div>
                  <div></div>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between px-2">
                {userInfoData()?.roleData?.ticket?.create&&<Button
                  variant="contained"
                  onClick={() => {
                    setopenTicketModel(true);
                    setselctedEvent(row);
                  }}
                >
                  Book Tickets{" "}
                </Button>}
                <div>
                  <LocationOnIcon
                    style={{ fontSize: "24px" }}
                    onClick={() => handleOpenInMaps(row.location)}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
              {userInfoData()?.roleData?.event?.create&&<div><Button variant="contained" onClick={()=>{ navigate(`/profitLoss?eventId=${row._id}`)}}>Check Event</Button></div>}
              {userInfoData()?.roleData?.event?.update&&<Button variant="contained" onClick={() => navigate(`/updateEvent?eventId=${row._id}`)}>Update Event</Button>}
              </div>
            </Paper>
          </div>
        )):"...Loading"}
      </div>
      <Modal
        open={openTicketModel}
        onClose={() =>{
          setticketToBook(defaultTiocketToBook)
           setopenTicketModel(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="d-flex justify-content-center align-items-center h-100">
          <Box
            className="bookTicket"
            sx={{
              width: "500px",
              height: "350px",
              backgroundColor: "white",
              padding: "16px",
            }}
          >
            <h1 className="text-center">Book Tickets</h1>
            <h3 className="text-center">{selctedEvent.name}</h3>
            <table className="border w-100 " style={{ height: "200px" }}>
              <thead className="w-100">
                <th>Category</th>
                <th>Price</th>
                <th>Available Count</th>
              </thead>
              <tbody>
                <tr>
                  <td>General</td>
                  <td>{selctedEvent.ticketCount?.GENERAL?.price}</td>
                  <td>{selctedEvent.ticketCount?.GENERAL?.size}</td>
                </tr>
                <tr className="">
                  <td> VIP</td>
                  <td>{selctedEvent.ticketCount?.VIP?.price}</td>
                  <td>{selctedEvent.ticketCount?.VIP?.size}</td>
                </tr>
                <tr>
                  <td> VVIP</td>
                  <td>{selctedEvent.ticketCount?.VVIP?.price}</td>
                  <td>{selctedEvent.ticketCount?.VVIP?.size}</td>
                </tr>
                <tr style={{ marginTop: "120px" }}>
                  <td>
                    {" "}
                    <TextField
                      id="outlined-basic"
                      type="number"
                      label="General"
                      required={true}
                      variant="outlined"
                      className="w-75 mx-2"
                      value={ticketToBook.GENERAL}
                      onChange={(e) =>{
                        console.log(e.target.value,"e.target.value")
                        if(e.target.value <1|| e.target.value> selctedEvent.ticketCount?.GENERAL?.size){
                          return
                        }
                        setticketToBook((prev) => {
                          return { ...prev, GENERAL: +e.target.value };
                        })}
                      }
                    />
                    <div>₹{selctedEvent.ticketCount?.GENERAL.price *ticketToBook.GENERAL}</div>
                  </td>
                  <td>
                    {" "}
                    <TextField
                      id="outlined-basic"
                      type="number"
                      label="VIP"
                      required={true}
                      variant="outlined"
                      className="w-75 p-0"
                      value={ticketToBook.VIP}
                      onChange={(e) =>{
                        if(e.target.value <0|| e.target.value> selctedEvent.ticketCount?.VIP?.size){
                          return
                        }
                        setticketToBook((prev) => {
                          return { ...prev, VIP: +e.target.value };
                        })}
                      }
                    />
                    <div>₹{selctedEvent.ticketCount?.VIP.price *ticketToBook.VIP}</div>

                  </td>
                  <td>
                    {" "}
                    <TextField
                      id="outlined-basic"
                      type="number"
                      label="VVIP"
                      required={true}
                      variant="outlined"
                      className="w-75 "
                      value={ticketToBook.VVIP}
                      onChange={(e) =>{
                        if(e.target.value <0|| e.target.value> selctedEvent.ticketCount?.VVIP?.size){
                          return
                        }
                        setticketToBook((prev) => {
                          return { ...prev, VVIP: +e.target.value };
                        })}
                      }
                    />
                    <div>₹{selctedEvent.ticketCount?.VVIP.price *ticketToBook.VVIP}</div>

                  </td>
                </tr>
                <tr><td colSpan={4} className="border text-center">Total--{(selctedEvent.ticketCount?.VVIP.price *ticketToBook.VVIP)+(selctedEvent.ticketCount?.VIP.price *ticketToBook.VIP)+(selctedEvent.ticketCount?.GENERAL.price *ticketToBook.GENERAL)}</td></tr>
              </tbody>
            </table>
            <Box className="d-flex justify-content-center mt-4  ">
              <Button variant="contained"  onClick={debounce(()=>{ 
                bookTicketFunc()
                },2000)}>
                Book
              </Button>
              <Button
                variant="contained"
                className="ms-3"
                onClick={() =>{
                  setticketToBook(defaultTiocketToBook)
                  setopenTicketModel(false)}}
              >
                Close
              </Button>
            </Box>
          </Box>
        </div>
      </Modal>
    </div>
  );
}

export default Index;
