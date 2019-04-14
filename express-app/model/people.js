var mongoose = require('mongoose');
var personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  dob: { type: Date, default: Date.now },
  isloved: Boolean
});
mongoose.model('Person', personSchema);
