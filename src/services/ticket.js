import axios from "axios"
import allRoute from "../config/api"
import { unAuthorizedAction } from "../utils"

export const scanTicket = async (data,navigate) => {
    
    try {
        let payload={
            method: "POST",
            url: `${allRoute.ticket.scanTicket}`,
            data:data,
            headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`}
        }
        console.log(payload,"payload profitLossEventService")
        let allRoles = await axios(payload)
        return allRoles
    } catch (err) {
        // handleAxiosError(err)
        console.log("createEventService error",err)
        unAuthorizedAction(err.status)
        console.log("getAllRoles", err.response.data.message)
        alert(err.response.data.message)
        console.log("getAllRoles", err.message)
        return err.response
    }
}

export const bookTicket_service = async (data,navigate) => {
    
    try {
        let payload={
            method: "POST",
            url: `${allRoute.ticket.bookTicket}`,
            data:data,
            headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`}
        }
        console.log(payload,"payload profitLossEventService")
        let allRoles = await axios(payload)
        return allRoles
    } catch (err) {
        // handleAxiosError(err)
        console.log("createEventService error",err)
        unAuthorizedAction(err.status)
        console.log("getAllRoles", err.response.data.message)
        alert(err.response.data.message)
        console.log("getAllRoles", err.message)
        return err.response
    }
}

