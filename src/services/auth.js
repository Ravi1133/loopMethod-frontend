import allRoute from "../config/api"
import axios from "axios"
import { unAuthorizedAction } from "../utils"
// import { handleAxiosError } from "../utils"
// const {default:axios}=require("axios")
export const getAllRoles = async () => {
    try {
        let allRoles = await axios.post(allRoute.user.getAllRole)
        return allRoles
    } catch (err) {
        // unAuthorizedAction(err.status)
        console.log("getAllRoles", err)
    }
}

export const registerUser = async (data) => {
    try {
        let allRoles = await axios({
            method: "POST",
            url: allRoute.user.register,
            data: data
        })
        return allRoles
    } catch (err) {
        // unAuthorizedAction(err.status)
        // handleAxiosError(err)
        console.log("getAllRoles", err.response.data.message)
        alert(err.response.data.message)
        console.log("getAllRoles", err.message)
    }
}
export const loginUser = async (data) => {
    try {
        let allRoles = await axios({
            method: "POST",
            url: allRoute.user.login,
            data: data
        })
        return allRoles
    } catch (err) {
        // handleAxiosError(err)
        // unAuthorizedAction(err.status)
        console.log("getAllRoles", err.response.data.message)
        alert(err.response.data.message)
        console.log("getAllRoles", err.message)
    }
}

export const getAlluser = async (data) => {
    try {
        let allRoles = await axios({
            method: "POST",
            url: allRoute.user.getAlluser,
            data: data,
            headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`}
        })
        return allRoles
    } catch (err) {
        // handleAxiosError(err)
        console.log("getAllRoles check", err)

        unAuthorizedAction(err.status)
        console.log("getAllRoles", err.response.data.message)
        alert(err.response.data.message)
        console.log("getAllRoles", err.message)
    }
}

export const blockUser_service = async (data) => {
    try {
        let allRoles = await axios({
            method: "POST",
            url: allRoute.user.blockUnblock,
            data: data,
            headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`}
        })
        return allRoles
    } catch (err) {
        // handleAxiosError(err)
        console.log("getAllRoles check", err)

        unAuthorizedAction(err.status)
        console.log("getAllRoles", err.response.data.message)
        alert(err.response.data.message)
        console.log("getAllRoles", err.message)
    }
}



