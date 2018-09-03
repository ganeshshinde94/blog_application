var mongoose = require('mongoose');

var BlogSchema= new mongoose.Schema({
  title        : {type: String, required:'cannot be empty'},
  subTitle     : {type: String, required:'cannot be empty'},
  comImage     : {type: String, required:'cannot be empty'},
  blog         : {type: String, required:'cannot be empty'},
  date         : {type: Date, default:Date.now}
});

module.exports= mongoose.model("Blog",BlogSchema);
