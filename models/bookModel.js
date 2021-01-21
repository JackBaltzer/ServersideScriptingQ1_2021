const mongoose = require("mongoose");
const { Schema } = mongoose; // teknik der trækker et objekt ud af et andet objekt...
 
const bookModel = new Schema({
   title: { type: String },
   author: { type: String },
	pages: { type: Number },
	imageName: {type:String},
   isRead: { type: Boolean, default: false }
});
 
module.exports = mongoose.model("Book", bookModel);