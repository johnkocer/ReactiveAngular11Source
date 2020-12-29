# AngularAddressBookApp
# Server
npm start 
# json-server
json-server db.json --routes routes.json --port=5000

# id fielst needs tobe string, number of id fielt is broken at the moment

router.delete('/api/contacts/:id', (req, res, next) => {
  let id = req.params.id;
  let item = db.get('contacts').find({id}).value();
 let list= db.get('contacts').remove({id});
##  // NOTE: if you don't use the list above, the print values delete functionality does not work
 console.log("🚀 ~ file: index.js ~ line 76 ~ router.delete ~ list", list.value())
  console.log("[Contacts - DELETE]", item)

  res.status(200).json(item);
});
