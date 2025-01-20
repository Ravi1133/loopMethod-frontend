// const baseURL="http://localhost:4000"
const baseURL="https://loopmethod-server.onrender.com"


let prefix=`${baseURL}/api/v1`
let imageupLoad={
    url:"https://apidev.meradoc.com/prescription/api/v1/prescription/upload/image",
    
}
let allRoute={
    user:{
        login:prefix+"/user/login",
        register:prefix+"/user/createUser",
        getAllRole:prefix+"/role/getRoles",
        getAlluser:prefix+"/user/getAllUser",
        blockUnblock:prefix+"/user/blockUser"
    },
    event:{
        getAllEvent:prefix+"/event/getAllEvent",
        getEventById:prefix+"/event/getEventById",
        createEvent:prefix+"/event/createEvent",
        profitLostt:prefix+"/event/profitLoss",
        updateEvent:prefix+"/event/updateEvent",
        upload:prefix+"/event/upload"
    },
    ticket:{
        scanTicket:prefix+"/ticket/scanTicket",
        bookTicket:prefix+"/ticket/bookTickets"
    },
    role:{
        gitLogs:prefix+"/role/getRoles"
    }
}

export  default allRoute