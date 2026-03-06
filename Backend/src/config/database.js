const dns = require('dns')
dns.setServers(['8.8.8.8', '8.8.4.4'])
dns.setDefaultResultOrder('ipv4first')


require('dotenv').config()
const mongoose = require("mongoose")

async function connectToDb(){
    await mongoose.connect(process.env.MONGO_URI)

    console.log("connected to database")

}

module.exports = connectToDb