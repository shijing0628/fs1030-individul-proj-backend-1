const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid');
//const entriesDB = require('../../data/entriesDB.json')
const verifyToken = require("../../middleware/verifyToken");
const dbHandler = require('../dbhandler/dbHandler')
const { validationCheckEntry } = require('../../middleware/validationCheck')

//router.use(validationCheckEntry)

router.get('/entries', verifyToken, async (req, res, next) => {
 try {
  let entriesData = await dbHandler.getEntriesData()
  return res.status(200).json({ entriesData })

 }
 catch (err) {
  console.error(err)
  return next(err)
 }
})


router.get('/entries/:id', verifyToken, async (req, res) => {
 try {
  let entriesData = await dbHandler.getEntriesData()
  let entryData = entriesData.find(item => item.id == req.params.id)
  if (!entryData) {
   return res.status(404).json({ message: `entry ${req.params.id} not found.` })
  } else {
   return res.status(200).json({ entryData })
  }

 }
 catch (err) {
  console.error(err)
  return next(err)
 }
})


router.post('/entries', validationCheckEntry, async (req, res) => {
 try {

  let newUserInfo = { ...req.body, id: uuidv4() }
  await dbHandler.addEntryData(newUserInfo)
  let entriesData = await dbHandler.getEntriesData()
  return res.status(201).json({ entriesData })
 } catch (err) {
  console.error(err)
  return next(err)
 }
})






module.exports = router;