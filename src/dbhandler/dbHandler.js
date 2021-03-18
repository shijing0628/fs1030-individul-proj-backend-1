const fs = require('fs');
const path = require('path')

const usersfile = path.resolve(`${process.env.DB_FILE_LOCATION_USERDB}`)
const entriesfile = path.resolve(`${process.env.DB_FILE_LOCATION_ENTRIESDB}`)


const getEntriesData = async () => {
 try {
  const data = await fs.promises.readFile(entriesfile, 'utf-8')
  let entryData = JSON.parse(data)
  return entryData
 } catch (err) {
  console.error(err)
  throw err
 }
}

const addEntryData = async (data) => {
 try {
  if (fs.existsSync(entriesfile)) {
   const dbData = await fs.promises.readFile(entriesfile)
   let obj = JSON.parse(dbData)
   obj.push(data)
   let jsonData = JSON.stringify(obj, null, 2);
   let datas = fs.promises.writeFile(entriesfile, jsonData)
   return datas
  }
  else {
   let jsonData = JSON.stringify([data], null, 2);
   let firstItem = await fs.promises.writeFile(entriesfile, jsonData)
   return firstItem
  }
 }
 catch (err) {
  console.error(err)
  throw err
 }
}


const getUsersData = async () => {
 try {
  if (fs.existsSync(usersfile)) {
   const data = await fs.promises.readFile(usersfile)
   let usersData = JSON.parse(data)
   return usersData
  }
 } catch (err) {
  console.error(err)
  throw err
 }
}


const addUserData = async (data) => {
 try {
  if (fs.existsSync(usersfile)) {
   const userDbData = await fs.promises.readFile(usersfile, 'utf8')
   let obj = JSON.parse(userDbData)
   obj.push(data);
   let jsonData = JSON.stringify(obj, null, 2);
   let datas = await fs.promises.writeFile(usersfile, jsonData)
   return datas
  } else {
   let jsonData = JSON.stringify([data], null, 2);
   let firstUser = await fs.promises.writeFile(usersfile, jsonData)
   return firstUser
  }
 }
 catch (err) {
  console.error(err)
  throw err
 }
}

module.exports = {
 getEntriesData,
 addEntryData,
 getUsersData,
 addUserData
}

