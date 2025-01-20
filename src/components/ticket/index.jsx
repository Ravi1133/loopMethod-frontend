import React, { useEffect, useState } from 'react'
import { scanTicket } from '../../services/ticket'

function ScanTicket() {
  const [ticketData,setticketData]=useState({
    "_id": "",
    "eventId": "",
    "userId": "",
    "category": "",
    "status": ""
})
const [isLoading,setisLoading]=useState(null)
  console.log("inside scan TicketId")
    let pageSearch =new URLSearchParams(window.location.search)
    let ticketId= pageSearch.get("ticketId")
    console.log("ticketId",ticketId)
    const scanTicketFunc=async()=>{
      setisLoading(true)
       let scanned_ticketData= await scanTicket({ticketId})
       console.log("scanned_ticketData",scanned_ticketData)

       if(scanned_ticketData.status==200 && scanned_ticketData.data.status){
        setticketData(scanned_ticketData.data.data)
        alert(scanned_ticketData.data.message)  
       }else{
        setticketData(scanned_ticketData.data.data)

        // alert(scanned_ticketData.data.data.message)  
       }
       setisLoading(false)
    }
    useEffect(() => {
      console.log("inside effect")
      ticketId&& scanTicketFunc()
    }, [])
    console.log("ticketData",ticketData)
  return (
    <div>{isLoading?"Scanning....":`ticket is ${ticketData.status}`}</div>
  )
}

export default ScanTicket