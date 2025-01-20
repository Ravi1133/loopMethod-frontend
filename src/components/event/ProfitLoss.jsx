import React, { useEffect, useState } from "react";
import { profitLossEventService } from "../../services/event";
import { useNavigate } from "react-router-dom";
import MenuAppBar from "../common/Appbar";
import { Button } from "@mui/material";

function ProfitLoss() {
  let [profitLossState, setprofitLossState] = useState({});
  const [isLoading, setisLoading] = useState(null);
  let navigate = useNavigate();
  let urlData = new URLSearchParams(window.location.search);
  let eventId = urlData.get("eventId");

  const getProfitLoss = async () => {
    setisLoading(true);
    let profiLossData = await profitLossEventService(eventId, navigate);
    console.log(profiLossData?.data?.data, "profiLossData.data.data");
    if (profiLossData.status == 200 && profiLossData?.data?.status) {
      setprofitLossState(profiLossData?.data?.data);
      setisLoading(false);
    }
  };
  console.log(profitLossState, "profitLossState");
  useEffect(() => {
    if (eventId) {
      getProfitLoss();
    }
  }, []);

  //   console.log(profitLossState?.allCount[1].VIP,"profitLossState?.allCount")
  const expectedRevenue = () => {};
  const lossCalculation = (a, b) => {
    return a - b;
  };
  const calculationFunc = () => {
    const eventData = {
        "_id": "678c7f286beda161f4ba8cbe",
        "name": "Basi Event",
        "ticketCount": {
            "GENERAL": { "size": 1, "price": 500 },
            "VIP": { "size": 5, "price": 2000 },
            "VVIP": { "size": 1, "price": 3000 }
        },
        "description": "test Show",
        "eventDateTime": "2025-01-29T00:00:00.000Z",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8QhMTBw_MDZplzWaMDvqu8rOs28cfuovnrw&s",
        "location": "Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001, India",
        "createdAt": "2025-01-19T04:27:20.681Z",
        "updatedAt": "2025-01-20T07:26:58.371Z",
        "__v": 0,
        "allCount": [
            { "GENERAL": 49 },
            { "VIP": 5 },
            { "VVIP": 4 }
        ]
    };
    
    // Calculate total ticket count, remaining tickets, total revenue, total loss, and expected revenue
    let totalTicketCount = 0;
    let remainingTicketCount = {
        GENERAL: 0,
        VIP: 0,
        VVIP: 0
    };
    let totalRevenue = 0;
    let totalLoss = 0;
    let expectedRevenue = 0;
    Object.keys(eventData.ticketCount).forEach((ticketType) => {
        // Ensure all values are numbers and default to 0 if NaN
        const totalTickets = isNaN(eventData.ticketCount[ticketType].size) ? 0 : eventData.ticketCount[ticketType].size;
        const soldTickets = isNaN(eventData.allCount.find(ticket => ticket[ticketType])?.[ticketType]) 
                             ? 0 
                             : eventData.allCount.find(ticket => ticket[ticketType])?.[ticketType];
    
        const remainingTickets = totalTickets - soldTickets;
    
        // Add to total ticket count
        totalTicketCount += totalTickets;
    
        // Add to remaining ticket count
        remainingTicketCount[ticketType] = remainingTickets;
    
        // Calculate revenue from sold tickets
        totalRevenue += soldTickets * (isNaN(eventData.ticketCount[ticketType].price) ? 0 : eventData.ticketCount[ticketType].price);
    
        // Calculate loss from unsold tickets
        totalLoss += remainingTickets * (isNaN(eventData.ticketCount[ticketType].price) ? 0 : eventData.ticketCount[ticketType].price);
    
        // Calculate expected revenue for all tickets (sold + unsold)
        expectedRevenue += totalTickets * (isNaN(eventData.ticketCount[ticketType].price) ? 0 : eventData.ticketCount[ticketType].price);
    });
    console.log("Total Ticket Count:", totalTicketCount);
    console.log("Remaining Ticket Count:", remainingTicketCount);
    console.log("Total Revenue from Sold Tickets:", totalRevenue);
    console.log("Total Loss from Unsold Tickets:", totalLoss);
    console.log("Expected Revenue (All Tickets):", expectedRevenue);
  };
  calculationFunc()
//   profitLossState?.ticketCount&& console.log(calculationFunc(profitLossState),"profitLossStateCalculation")


  return (
    <div>
      <MenuAppBar />

      <div style={{ paddingTop: "80px" }} className="px-5">
        <div> Event Name: {profitLossState?.name}</div>
        <div> Event Description:{profitLossState?.name}</div>
        <div>Event Location :{profitLossState.location}</div>
        {!isLoading
          ? profitLossState.allCount && (
              <table className="w-100 mt-4">
                <thead className="border px-4">
                  <th>Type</th>
                  <th>Genral</th>
                  <th>VIP</th>
                  <th>VVIP</th>
                </thead>
                <tbody className="border px-4">
                  <tr>
                    <td>Price</td>
                    <td>{profitLossState?.ticketCount?.GENERAL.price}</td>
                    <td>{profitLossState?.ticketCount?.VIP.price}</td>
                    <td>{profitLossState?.ticketCount?.VVIP.price}</td>
                  </tr>
                  <tr>
                    <td>Total Count</td>
                    <td className="text-info">
                      {profitLossState?.ticketCount?.GENERAL.size +
                        +profitLossState?.allCount[0]?.GENERAL}
                    </td>
                    <td className="text-info">
                      {profitLossState?.ticketCount?.VIP.size +
                        +profitLossState?.allCount[1]?.VIP}
                    </td>
                    <td className="text-info">
                      {profitLossState?.ticketCount?.VVIP.size +
                        +profitLossState?.allCount[2]?.VVIP}
                    </td>
                  </tr>
                  <tr>
                    <td>Ticket Sold</td>
                    <td className="text-success">
                      {+profitLossState?.allCount[0]?.GENERAL}
                    </td>
                    <td className="text-success">
                      {+profitLossState?.allCount[1]?.VIP}
                    </td>
                    <td className="text-success">
                      {+profitLossState?.allCount[2]?.VVIP}
                    </td>
                  </tr>
                  <tr>
                    <td>Remaining Tickets</td>
                    <td className="text-danger">
                      {profitLossState?.ticketCount?.GENERAL.size}
                    </td>
                    <td className="text-danger">
                      {profitLossState?.ticketCount?.VIP.size}
                    </td>
                    <td className="text-danger">
                      {profitLossState?.ticketCount?.VVIP.size}
                    </td>
                  </tr>
                  <tr>
                    <td>Expected Revenue</td>
                    <td className="text-info">
                      ₹
                      {(+profitLossState?.allCount[0]?.GENERAL +
                        profitLossState?.ticketCount?.GENERAL.size) *
                        +profitLossState?.ticketCount?.GENERAL.price}
                    </td>
                    <td className="text-info">
                      ₹
                      {(+profitLossState?.allCount[0]?.VIP +
                        profitLossState?.ticketCount?.VIP.size) *
                        +profitLossState?.ticketCount?.VIP.price}
                    </td>
                    <td className="text-info">
                      ₹
                      {(+profitLossState?.allCount[0]?.VVIP +
                        profitLossState?.ticketCount?.VVIP.size) *
                        +profitLossState?.ticketCount?.VVIP.price}
                    </td>
                  </tr>
                  <tr>
                    <td>Earn Revenue</td>
                    {/* profitLossState?.allCount[1].VIP */}
                    <td className="text-success">
                      ₹
                      {profitLossState?.allCount[0]?.GENERAL *
                        +profitLossState?.ticketCount?.GENERAL.price}
                    </td>
                    <td className="text-success">
                      ₹
                      {profitLossState?.allCount[1]?.VIP *
                        +profitLossState?.ticketCount?.VIP.price}
                    </td>
                    <td className="text-success">
                      ₹
                      {profitLossState?.allCount[2]?.VVIP *
                        +profitLossState?.ticketCount?.VVIP.price}
                    </td>
                  </tr>
                  <tr>
                    <td>Running Loss</td>
                    {/* profitLossState?.allCount[1].VIP */}
                    <td className="text-danger">
                      ₹
                      {(+profitLossState?.allCount[0]?.GENERAL +
                        profitLossState?.ticketCount?.GENERAL.size) *
                        +profitLossState?.ticketCount?.GENERAL.price -
                        profitLossState?.allCount[0]?.GENERAL *
                          +profitLossState?.ticketCount?.GENERAL.price}
                    </td>
                    <td className="text-danger">
                      ₹
                      {(+profitLossState?.allCount[0]?.VIP +
                        profitLossState?.ticketCount?.VIP.size) *
                        +profitLossState?.ticketCount?.VIP.price -
                        profitLossState?.allCount[1]?.VIP *
                          +profitLossState?.ticketCount?.VIP.price}
                    </td>
                    <td className="text-danger">
                      {" "}
                      ₹
                      {(+profitLossState?.allCount[0]?.VVIP +
                        profitLossState?.ticketCount?.VVIP.size) *
                        +profitLossState?.ticketCount?.VVIP.price -
                        profitLossState?.allCount[2]?.VVIP *
                          +profitLossState?.ticketCount?.VVIP.price}
                    </td>
                  </tr>
                </tbody>
              </table>
            )
          : "...Loading"}
        <Button
          variant="contained"
          className="fs-4 mt-3"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
}

export default ProfitLoss;
