const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const dbHandler = require('../dbhandler/dbHandler')
const { validationCheckAuth } = require('../../middleware/validationCheck')

router.use(validationCheckAuth)

const maxAge = 3 * 24 * 60 * 60 * 1000;
router.post('/', validationCheckAuth, async (req, res) => {
 try {

  const { email, password } = req.body;
  let authDatas = await dbHandler.getUsersData()

  if (authDatas) {
   let user = authDatas.find(item => item.email === email)

   if (!user) return res.status(401).json({ message: `Incorrect credentials provided for ${email}`, status: "FAILED", type: 'email' });

   let validPass = await bcrypt.compare(password, user.password)

   if (!validPass) return res.status(401).json({ message: `Incorrect credentials provided for ${password}`, status: "FAILED", type: 'password' });

   // create a token
   const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, { expiresIn: maxAge });

   if (token) {
    res.status(201).json({ token, status: "SUCCESS", data: authDatas });
   } else {
    return res.status(400).json({ message: "Cannot generate token.", status: "FAILED" })
   }
  } else {
   return res.status(400).json({ message: "register at first  then try again.", status: "FAILED" })
  }
 } catch (err) {
  console.error(err)
  return res.status(400).json({ message: err.message, status: "FAILED" })
 }
})




module.exports = router;