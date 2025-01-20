import { Button, TextField } from "@mui/material";

import React, { useEffect, useRef, useState } from "react";
import { createEventService, getEventById, updateEventService, uploadImageEvent } from "../../services/event";
import { useNavigate } from "react-router-dom";
import FileUpload from "../common/FileUpload";
import MenuAppBar from "../common/Appbar";
import moment from "moment"
let listOfImageConcert=["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ-IpR1ZWqg4F6wAehLLeEXa_yDn_otjzBZg&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScE7xjp0bdVoIYq2FmS6vItz3nGWuS7eRqxw&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8QhMTBw_MDZplzWaMDvqu8rOs28cfuovnrw&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVl7Us8SMk8MDi9k121JEFXvD1ygX0si5Naw&s"]

const loadScript = (url, callback) => {
    let script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState) {
        script.onreadystatechange = function () {
            if (script.readyState === "loaded" || script.readyState === "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        script.onload = () => callback();
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
};
function AddEvent() {
  const [formState, setformState] = useState({
    name: "",
    location: "",
    date: "",
    description: "",
    image: "",
    ticket: {
      GENERAL: { size: 0, price: 0 },
      VIP: { size: 0, price: 0 },
      VVIP: { size: 0, price: 0 },
    },
  });
  const [error,setError]=useState(false)
//   new URLSearchParams(window.locatio)
  const [query,setQuery]=useState("")
  let autoCompleteRef =useRef()
  const [temptImage, settemptImage] = useState(null);
  const navigate = useNavigate();
  let autoComplete;
  const submitHandle = async (e) => {
    e.preventDefault();
    if(eventId){
        updateEventById()
        return

    }
    let image= listOfImageConcert[Math.floor(Math.random() * 4)]
    console.log(image,"image")
    formState.image=image
    let payloadData = formState;
    let savedData = await createEventService(payloadData, navigate);
    console.log(savedData, "savedData");
    if (savedData?.status == 200 && savedData.data.status) {
        alert(savedData.data.data.message)
        navigate("/event")
    } else {
        setformState
    }
  };
  let paramsFunc= new URLSearchParams(window.location.search)
  let eventId= paramsFunc.get("eventId")
  const getEventByIdFunc=async ()=>{
       let eventData=await getEventById(eventId)
       if(eventData.status==200&&eventData.data.status){
        setformState({
            name: eventData.data.data.name,
            location: eventData.data.data.location,
            date:moment( eventData.data.data.eventDateTime).format("YYYY-MM-DD"),
            description:eventData.data.data.description,
            image: eventData.data.data.image,
            ticket: eventData.data.data.ticketCount,
          })
       }
  }

  const updateEventById =async ()=>{
    let image= listOfImageConcert[Math.floor(Math.random() * 4)]
    console.log(image,"image")
    formState.image=image
    let payloadData = formState;
    let updatedData=await updateEventService(payloadData,eventId)
    console.log(updatedData,"updatedData")
    if( updatedData.status==200 &&updatedData.data.status){
        alert(updatedData.data.message)
        getEventByIdFunc()
    }
  }
  useEffect(()=>{

    eventId&&getEventByIdFunc()
  },[])
  console.log(window.location,"window.location")
  const fileTakeFunc = async (file) => {
    console.log("filefile", file);

    console.log("filefile", file[0]);
    const objectImage = URL.createObjectURL(file[0]);
    console.log(objectImage, "objectImage");
    settemptImage(objectImage);
    if (file[0]) {
      let formData = new FormData();
      console.log("formData", formData);
      formData.append("pdf", file[0]);
      let eventImageData = await uploadImageEvent(formData);
      console.log(eventImageData?.data?.data, "eventImageData");
      if (eventImageData?.status == 200 && eventImageData?.data?.data) {
        // setformState(eventImageData.data.data)path
        setformState((prev) => {
          return {
            ...prev,
            image: eventImageData.data.data.path,
          };
        });
      }
    }
  };
  console.log(formState, "formState");
  const handleScriptLoad = (updateQuery, autoCompleteRef) => {
    
    autoComplete = new window.google.maps.places.Autocomplete(
        autoCompleteRef.current,

        {
            // types: ["(cities)"],
            componentRestrictions: { country: "IN" },
        }
    );

    autoComplete.addListener("place_changed", () => {
        handlePlaceSelect(updateQuery);
    });
};

  useEffect(() => {
    // loadScript(
    //     `https://maps.googleapis.com/maps/api/js?key=${`AIzaSyCDj5_sbFOV36l59cFkjNPayJxKDVnViJw`}&libraries=places`,
    //     () => handleScriptLoad(setQuery, autoCompleteRef)
    // );
    let apiKey="AIzaSyCDj5_sbFOV36l59cFkjNPayJxKDVnViJw"
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`, () => {
        const autocomplete = new window.google.maps.places.Autocomplete(autoCompleteRef.current);
        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            console.log("place", place)
            // setQuery(place.formatted_address)
            // setformState(place.formatted_address)
            setformState((prev) => {
                return { ...prev, location: place.formatted_address };
              });
            // onPlaceSelected(place);
        });
    });
  }, [])
  const handleDateChange = (event) => {
    const inputDate = new Date(event.target.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnight for comparison

    if (inputDate < today) {
        setError(true);
    } else {
        setformState((prev) => {
            return { ...prev, date: event.target.value };
          });
        setError(false);
    }
    
    // setDate(event.target.value);
};
  return (
    <div>
        <MenuAppBar/>
      <form onSubmit={submitHandle} style={{paddingTop:"80px"}} className="px-5">
        <h2>Add Event</h2>
        <div className="">
          <div className="d-flex my-4">
            <TextField
              id="outlined-basic"
              type="text"
              label="name"
              required={true}
              variant="outlined"
              className="w-100 mx-2"
              value={formState.name}
              onChange={(e) => {
                setformState((prev) => {
                  return { ...prev, name: e.target.value };
                });
              }}
            />
            <TextField
              id="outlined-basic"
              type="text"
              label="location"
              inputRef={autoCompleteRef}
              required={true}
              variant="outlined"
              className="w-100 mx-2"
              InputLabelProps={{
                shrink: true,
            }}
            //   value={query}
              value={formState.location}
            //   onChange={(event) => setQuery(event.target.value)}
              onChange={(e) => {
                setformState((prev) => {
                  return { ...prev, location: e.target.value };
                });
              }}
            />
          </div>

          <div className="d-flex my-4">
            <TextField
              id="outlined-basic"
              type="date"
              label="Date"
              required={true}
              
              variant="outlined"
              className="w-100 mx-2"
              min={new Date()}
              value={formState.date}
              helperText={error ? "Please select a future date" : ""}
              slotProps={{
                input: {
                  min:  moment().format("YYYY-MM-DD"), // Restrict past dates
                },
              }}
              onChange={handleDateChange}
            />
            <TextField
              id="outlined-basic"
              type="text"
              label="description"
              required={true}
              variant="outlined"
              className="w-100 mx-2 "
              value={formState.description}
              onChange={(e) => {
                setformState((prev) => {
                  return { ...prev, description: e.target.value };
                });
              }}
            />
          </div>

          <div>
            <FileUpload fileTakeFunc={fileTakeFunc} />
            {temptImage && (
              <img
                style={{ width: "150px", height: "150px" }}
                src={temptImage}
              />
            )}
          </div>
          <div className=" mt-4">
            <h4>Tickets Count</h4>
            <div className="d-flex justify-content-center mt-5">
              <div className="mx-3">
                <div>General</div>
                <TextField
                  id="outlined-basic"
                  type="number"
                  label="size"
                  required={true}
                  variant="outlined"
                  className="w-100 mx-2 mt-2"
                  value={formState.ticket.GENERAL.size}
                  onChange={(e) => {
                    setformState((prev) => {
                      return {
                        ...prev,
                        ticket: {
                          ...prev.ticket,
                          GENERAL: {
                            ...prev.ticket.GENERAL,
                            size: e.target.value,
                          },
                        },
                      };
                    });
                  }}
                />
                <TextField
                  id="outlined-basic"
                  type="number"
                  label="Price"
                  required={true}
                  variant="outlined"
                  className="w-100 mx-2"
                  value={formState.ticket.GENERAL.price}
                  onChange={(e) => {
                    setformState((prev) => {
                      return {
                        ...prev,
                        ticket: {
                          ...prev.ticket,
                          GENERAL: {
                            ...prev.ticket.GENERAL,
                            price: e.target.value,
                          },
                        },
                      };
                    });
                  }}
                />
              </div>

              <div className="mx-3">
                <div>VIP</div>
                <TextField
                  id="outlined-basic"
                  type="number"
                  label="Size"
                  required={true}
                  variant="outlined"
                  className="w-100 mx-2"
                  value={formState.ticket.VIP.size}
                  onChange={(e) => {
                    setformState((prev) => {
                      return {
                        ...prev,
                        ticket: {
                          ...prev.ticket,
                          VIP: { ...prev.ticket.VIP, size: e.target.value },
                        },
                      };
                    });
                  }}
                />
                <TextField
                  id="outlined-basic"
                  type="number"
                  label="Price"
                  required={true}
                  variant="outlined"
                  className="w-100 mx-2 mt-2"
                  value={formState.ticket.VIP.price}
                  onChange={(e) => {
                    setformState((prev) => {
                      return {
                        ...prev,
                        ticket: {
                          ...prev.ticket,
                          VIP: { ...prev.ticket.VIP, price: e.target.value },
                        },
                      };
                    });
                  }}
                />
              </div>
              <div className="mx-3">
                <div>VVIP</div>
                <TextField
                  id="outlined-basic"
                  type="number"
                  label="Size"
                  required={true}
                  variant="outlined"
                  className="w-100 mx-2"
                  value={formState.ticket.VVIP.size}
                  onChange={(e) => {
                    setformState((prev) => {
                      return {
                        ...prev,
                        ticket: {
                          ...prev.ticket,
                          VVIP: { ...prev.ticket.VVIP, size: e.target.value },
                        },
                      };
                    });
                  }}
                />
                <TextField
                  id="outlined-basic"
                  type="number"
                  label="price"
                  required={true}
                  variant="outlined"
                  className="w-100 mx-2 mt-2"
                  value={formState.ticket.VVIP.price}
                  onChange={(e) => {
                    setformState((prev) => {
                      return {
                        ...prev,
                        ticket: {
                          ...prev.ticket,
                          VVIP: { ...prev.ticket.VVIP, price: e.target.value },
                        },
                      };
                    });
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Button
              variant="contained"
              className="ms-3"
              onClick={() => navigate("/event")}
            >
              All Event{" "}
            </Button>
            <Button variant="contained" className="ms-3" type="submit">
              {eventId?"Update": "Add"} Event
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddEvent;
