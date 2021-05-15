require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const { errorMiddleWare, errorHandler } = require('./middlewares')
const mongoose = require('mongoose')
const logRoutes = require('./api/logs')


mongoose.connect( process.env.DBURL || 'mongodb://localhost:27017/TravelLog', { useNewUrlParser: true, useUnifiedTopology: true })

const app = express()

app.use(morgan('common'))
app.use(helmet())
app.use( express.json() )

if( process.env.NODE_ENV === 'production' ){

  app.use(cors({
    origin: process.env.CORS_ORIGIN
  }))

} else {
  app.use(cors())
}

app.get('/', (req,res) => {
  res.json({
    message: 'This Api is built for A travel log. the api has only two routes at the current time. /api/logs and /api/add.'
  })
})

app.use(logRoutes)

app.use( errorMiddleWare )
app.use( errorHandler )


const port = process.env.PORT || 3000

app.listen( port, () => {
  console.log(`Listening on port ${port}`)
})