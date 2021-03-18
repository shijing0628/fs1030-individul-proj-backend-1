const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid');
const dbHandler = require('../dbhandler/dbHandler')
const bcrypt = require('bcrypt');
const { validationCheckUser } = require('../../middleware/validationCheck')
const saltRounds = 10;

router.use(validationCheckUser)

//user post request
router.post('/', validationCheckUser, async (req, res) => {
 const { name, email, password } = req.body;
 try {

  let usersData = await dbHandler.getUsersData()
  if (usersData) {
   const emailExist = await usersData.find(item => item.email == email)
   if (emailExist) return res.status(409).json({ message: "Email already exists.", status: "FAILED" })

   //hash password
   let hashedPW = await bcrypt.hash(password, saltRounds)
   let userRegister = {
    id: uuidv4(),
    name,
    email,
    password: hashedPW
   }

   await dbHandler.addUserData(userRegister)
   return res.status(200).send({ id: userRegister.id, name: userRegister.name, email: userRegister.email, status: 'SUCCESS' })
  }
  else {
   let hashedPW = await bcrypt.hash(password, saltRounds)
   let userRegister = {
    id: uuidv4(),
    name,
    email,
    password: hashedPW
   }

   await dbHandler.addUserData(userRegister)
   return res.status(200).send({ id: userRegister.id, name: userRegister.name, email: userRegister.email, status: 'SUCCESS' })
  }

 } catch (err) {
  console.error(err)
  return res.status(400).json({ message: err.message, status: "FAILED" })
 }
})



module.exports = router;