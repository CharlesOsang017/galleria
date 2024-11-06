import express from 'express'
import dotenv from 'dotenv'
import connectToDb from './db/connectToDb.js'

dotenv.config()
const app = express()

const port = process.env.PORT

app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
    connectToDb()
})