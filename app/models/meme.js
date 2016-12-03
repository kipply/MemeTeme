// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var memeSchema = mongoose.Schema({
	name: String, 
	type: String,
	image: String, 
	rarity: Number, 
});

// create the model for users and expose it to our app
var Meme = mongoose.model('Meme', memeSchema);
module.exports = Meme;
