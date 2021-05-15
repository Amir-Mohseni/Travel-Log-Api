const express = require('express')
const LogEntry = require('../Models/LogEntry')
const { tryCatchWrapper } = require('../utils')

const router = express.Router()

router.get( '/api/logs', tryCatchWrapper( async (req,res) => {

  const places = await LogEntry.find()
  res.json({
    markers: places
  })
  
}))

router.post('/api/add', tryCatchWrapper( async (req,res) => { 

  console.log(req.body)

  const newLogEntry = new LogEntry(req.body)
  const savedLogEntry = await newLogEntry.save()
  res.json(savedLogEntry)

}))

module.exports = router