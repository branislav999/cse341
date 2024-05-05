const express = require('express');
const app = express();
 
app.get('/', (req, res) => {
  res.send("Karadjordje Petrovic");
});
 
app.listen(process.env.PORT || 3000, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || 3000));
});