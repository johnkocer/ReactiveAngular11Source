var express = require('express');
var router = express.Router();

const { v4: uuidv4 } = require('uuid');

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync');
const { json } = require('express');
 
const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ contacts: [], user: {} })
  .write()

router.get('/api/contacts', (req, res, next) => {
  let resData= db.get('contacts').value();
  console.log("[Contacts - GET ALL]", resData.length)
  console.table( resData.slice(0,5))
  res.status(200).json(resData);
});

router.get('/api/posts', (req, res, next) => {
  let resData= db.get('members').value();
  console.log("[Members - GET ALL]", resData.length)
  console.table( resData.slice(0,5))
  res.status(200).json(resData);
});

router.get('/api/comments', (req, res, next) => {
  let resData= db.get('products').value();
  console.log("[Products - GET ALL]", resData.length)
  console.table( resData.slice(0,5))
  res.status(200).json(resData);
});

router.post('/api/contacts', (req, res, next) => {
  let data = req.body;
  data.id = uuidv4();
  let item = db.get('contacts').push(data).last().value();
  console.log("[Contacts - POST]",  item)
  res.status(200).json(item);
});

router.get('/api/contacts/:id', (req, res, next) => {
  let id = req.params.id;
  let item = db.get('contacts').find({id}).value();
  console.log("[Contacts - GET  ] Item: ", item)
  res.status(200).json(item);
});

router.get('/api/contacts/byName/:name', (req, res, next) => {

  let name = req.params.name;
  let list = db.get('contacts').filter(t=>t.name.toLowerCase().includes(name.toLowerCase())).value();

  console.log(`[Contacts - GET  ] Search name: ${name} - Record Count: ${list.length} `)
  console.table( list.slice(0,5))

  res.status(200).json(list);
});


router.put('/api/contacts/:id', (req, res, next) => {
  let id = req.params.id;
  let item = db.get('contacts').find({id}).assign(req.body).value();
  console.log("[Contacts - PUT] ", item)
  
  res.status(200).json(item);
});

router.delete('/api/contacts/:id', (req, res, next) => {
  let id = req.params.id;
  let item = db.get('contacts').find({id}).value();
 let list= db.get('contacts').remove({id});
 // NOTE: if you don't use the list, the print values delete functionality does not work
 console.log("🚀 ~ file: index.js ~ line 76 ~ router.delete ~ list", list.value())
  console.log("[Contacts - DELETE]", item)

  res.status(200).json(item);
});

module.exports = router;