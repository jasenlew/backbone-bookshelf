// An object containing an array of books (objects with properties)
var bookData = {
			 
  "books": [
    {"category": "cooking", 
     "year": 2009, 
     "price": 22.00, 
     "title": "Breakfast for Dinner", 
     "author": "Amanda Camp"},

    {"category": "cooking",
     "year": 2014, 
     "price": 21.00, 
     "title": "21 Burgers for the 21st Century",
      "author": "Stuart Reges"},

    {"category": "JavaScript",
     "year": 2011,
      "price": 55.00, 
     "title": "HackReactor: A Place with People",
      "author": "Bernie Bennings"},

    {"category": "JavaScript",
     "year": 2012,
      "price": 35.50, 
      "title": "Closure for Fun and Profit",
     "author": "Linda Lunga"},

   {"category": "cooking", "year": 2009, "price": 22.00, 
     "title": "Chocolate", "author": "Tina Uruguay"},

    {"category": "cooking", "year": 2004, "price": 16.00, 
     "title": "Pizza for the 21st Century", "author": "Stan Hurrys"},

    {"category": "JavaScript", "year": 1998, "price": 12.00, 
   "title": "Adreneline Driven Development", "author": "Bob Nugget"},

    {"category": "JavaScript", "year": 1999, "price": 85.50, 
   "title": "3 months to a better life", "author": "Champion Champ"}
	]
};

// Create an app container (object) for our views, models and collections
var app = {
	views: {},
	models: {},
	collections: {}
};



// Create a Book model class with default data values
app.models.Book = Backbone.Model.extend({ 
	defaults: { 
		category: 'uncategorized',	 
		year: 0, 
		price: 0.00, 
		title: '', 
		author: ''
	}
});



// Create a Books collections class that hold the Person model class 
app.collections.Books = Backbone.Collection.extend({
	model: app.models.Book
});



// Create a Book view class that will render one book
app.views.Book = Backbone.View.extend({

	tagName: 'li',

	template: _.template($("#template-book").html()),

	render: function () {
		this.$el.html(this.template(this.model.attributes));
		return this;
	}

});

// Create a ShelfView view class that will render the collection of books
app.views.ShelfView = Backbone.View.extend({

	tagName: 'ul',

	render: function () {
		this.$el.empty();
		this.collection.each(function (bookModel) {
			var bookView = new app.views.Book({model: bookModel});
			this.$el.append(bookView.render().el);
		}, this);

		return this;
	
	}
});



app.init = function () {
	// QUESTION: Pass in bookData.books or bookDate, as unsure whether to pass array or object??
	var topShelfCollection = new app.collections.Books(bookData.books);
	var topShelfView = new app.views.ShelfView({collection: topShelfCollection});

	$('body').append(topShelfView.render().el);
};



// Using jQuery, when document is ready (i.e. html page is loaded) run the app
$(function () {
	app.init();
});