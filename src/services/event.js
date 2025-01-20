import axios from "axios"
import allRoute from "../config/api"

import { unAuthorizedAction } from "../utils"

export const getAlEvent = async (data) => {
    try {
        let allRoles = await axios({
            method: "POST",
            url: allRoute.event.getAllEvent,
            data: data,
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }

        })
        return allRoles
    } catch (err) {
        // handleAxiosError(err)
        console.log("getAlEvent err",err)
        unAuthorizedAction(err.status)
        console.log("getAllRoles", err.response.data.message)
        alert(err.response.data.message)
        console.log("getAllRoles", err.message)
    }
}


export const createEventService = async (data, navigate) => {
    try {
        let allRoles = await axios({
            method: "POST",
            url: allRoute.event.createEvent,
            data: data,
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }

        })
        return allRoles
    } catch (err) {
        // handleAxiosError(err)
        unAuthorizedAction(err.status)
        console.log("createEventService error", err.status)
        
        console.log("getAllRoles", err.response.data.message)
        alert(err.response.data.message)
        console.log("getAllRoles", err.message)
    }
}
export const updateEventService = async (data, id) => {
    try {
        let allRoles = await axios({
            method: "POST",
            url: allRoute.event.updateEvent + `?eventId=${id}`,
            data: data,
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }

        })
        return allRoles
    } catch (err) {
        // handleAxiosError(err)
        unAuthorizedAction(err.status)
        console.log("createEventService error", err.status)
        
        console.log("getAllRoles", err.response.data.message)
        alert(err.response.data.message)
        console.log("getAllRoles", err.message)
    }
}



export const profitLossEventService = async (id, navigate) => {
    
    try {
        let payload = {
            method: "GET",
            url: `${allRoute.event.profitLostt}?eventId=${id}`,
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        }
        console.log(payload, "payload profitLossEventService")
        let allRoles = await axios(payload)
        return allRoles
    } catch (err) {
        // handleAxiosError(err)
        console.log("createEventService error", err)
        unAuthorizedAction(err.status)
        console.log("getAllRoles", err.response.data.message)
        alert(err.response.data.message)
        console.log("getAllRoles", err.message)
    }
}


export const uploadImageEvent = async (data, navigate) => {
    console.log("data inside uploadImageEvent", data)
    try {
        let payload = {
            method: "POST",
            url: `https://apidev.meradoc.com/prescription/api/v1/prescription/upload/image`,
            data,
            headers: {
                "Authorization": `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0M2QxMzk2ZDYzODZiMDAxMjgwYTZhMiIsInR5cGUiOiJET0NUT1IiLCJyb2xlIjoiR1AiLCJzZXNzaW9uSWQiOiI2Nzg3NTc5YWJhMDJhMjAwMTM4YTJmZWYiLCJpYXQiOjE3MzY5MjMwMzQsImV4cCI6MTc2MDU5NjYzNH0.NCD2KztOpf5NhYJV4RkEEWGUx917TF0R_zY61cXqmBM"}`,
                "content-Type": "multipart/form-data",
                "originToken":"ea905fcbecccb788fdde2651cf4ff7d1",
                "origin":"https://doctordev.meradoc.com"
            }
        }
        console.log(payload, "payload profitLossEventService")
        let allRoles = await axios(payload)
        return allRoles
    } catch (err) {
        // handleAxiosError(err)
        console.log("createEventService error", err)
        unAuthorizedAction(err.status)
        console.log("getAllRoles", err.response.data.message)
        alert(err.response.data.message)
        console.log("getAllRoles", err.message)
    }
}
export const getEventById = async (id, navigate) => {
    try {
        let allRoles = await axios({
            method: "GET",
            url: allRoute.event.getEventById+ `?eventId=${id}`,
            
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }

        })
        return allRoles
    } catch (err) {
        // handleAxiosError(err)
        unAuthorizedAction(err.status)
        console.log("createEventService error", err.status)
        
        console.log("getAllRoles", err.response.data.message)
        alert(err.response.data.message)
        console.log("getAllRoles", err.message)
    }
}

