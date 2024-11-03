import express from 'express'

const app = express()

app.listen(1000, (req, res)=>{
    console.log('server running')
})