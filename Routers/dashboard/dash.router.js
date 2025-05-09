 import express from "express"
import { getDashboardCounts, getRecentItems } from "../../controller/dashboardinfo.controller.js"
 const summeryRoute=express.Router()

 summeryRoute.get("/",getDashboardCounts)
 summeryRoute.get('/recent',getRecentItems)


 export default summeryRoute
