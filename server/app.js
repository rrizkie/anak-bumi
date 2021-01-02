require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require ('cors')
const router = require('./route')


app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.use(router)

app.listen(port,()=>{
    console.log(`on port:${port}`)
})

module.exports = app