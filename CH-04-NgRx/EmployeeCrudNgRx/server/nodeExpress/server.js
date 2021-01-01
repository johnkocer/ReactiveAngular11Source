const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;
const products = require('./db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// app.get('/products', (req, res) => {
//   console.log("[Employees - GET ALL]", res.length)
//   let data=  res.json(products);
//   debugger
//   console.log( data.req.params.products)
//   res.on("data", function(chunk) {
//     console.log("BODY: " + chunk);
//   });
//  return data;
// });
app.get('/products', (req, res) =>{

  let resData = Object.values(products)
  console.log("[Produts - GET ALL]", resData.length)

  console.table(resData.slice(0,5));
  console.log(JSON.stringify(resData.slice(0,5)));
   return res.json(products);
});
// }).on('error', function(e) {
//   console.log("Got error: " + e.message);
// }); 

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
