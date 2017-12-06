var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ProdsSchema = new Schema({
	name: {
		type: String,
		default: ''
	},
	category: {
		type: String,
		default: ''
	},
	price: {
		type: String,
		default: ''
	}
	//description:    { type: String, default: '' },
	//picture:        { type: String, default: '' },   
});

// use the schema instance to define your Prods model
mongoose.model('Prods', ProdSchema);