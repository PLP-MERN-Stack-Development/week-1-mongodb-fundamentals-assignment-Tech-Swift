//insert books unto plp_bookstore

db.books.insertMany([
  {
    title: "A Tale of Two Cities",
    author: "Charles Dickens",
    genre: "Historical Fiction",
    published_year: 1859,
    price: 9.25,
    in_stock: true,
    pages: 489,
    publisher: "Chapman & Hall"
  },
  {
    title: "Les Misérables",
    author: "Victor Hugo",
    genre: "Historical Drama",
    published_year: 1862,
    price: 13.75,
    in_stock: false,
    pages: 1463,
    publisher: "A. Lacroix & Verboeckhoven"
  },
  {
    title: "The Brothers Karamazov",
    author: "Fyodor Dostoevsky",
    genre: "Philosophical Fiction",
    published_year: 1880,
    price: 15.0,
    in_stock: true,
    pages: 824,
    publisher: "The Russian Messenger"
  },
  {
    title: "The Stranger",
    author: "Albert Camus",
    genre: "Absurdist Fiction",
    published_year: 1942,
    price: 10.25,
    in_stock: true,
    pages: 123,
    publisher: "Gallimard"
  },
  {
    title: "Beloved",
    author: "Toni Morrison",
    genre: "Historical Fiction",
    published_year: 1987,
    price: 11.5,
    in_stock: false,
    pages: 324,
    publisher: "Alfred A. Knopf"
  },
  {
    title: "Slaughterhouse-Five",
    author: "Kurt Vonnegut",
    genre: "Science Fiction",
    published_year: 1969,
    price: 9.99,
    in_stock: true,
    pages: 275,
    publisher: "Delacorte"
  },
  {
    title: "One Hundred Years of Solitude",
    author: "Gabriel García Márquez",
    genre: "Magical Realism",
    published_year: 1967,
    price: 13.0,
    in_stock: true,
    pages: 417,
    publisher: "Harper & Row"
  },
  {
    title: "Things Fall Apart",
    author: "Chinua Achebe",
    genre: "Historical Fiction",
    published_year: 1958,
    price: 8.95,
    in_stock: true,
    pages: 209,
    publisher: "Heinemann"
  },
  {
    title: "Dracula",
    author: "Bram Stoker",
    genre: "Gothic Horror",
    published_year: 1897,
    price: 10.0,
    in_stock: true,
    pages: 418,
    publisher: "Archibald Constable and Company"
  },
  {
    title: "Frankenstein",
    author: "Mary Shelley",
    genre: "Science Fiction",
    published_year: 1818,
    price: 9.5,
    in_stock: true,
    pages: 280,
    publisher: "Lackington, Hughes, Harding, Mavor & Jones"
  }
]
)

//Find all books in a specific genre

db.books.Find({genre: "Historical Fiction"}).pretty()

//Find all books with published after a certain Year

db.books.find({published_year: {$gt: 1970}}).pretty()

// find books by a specific author

db.books.find({author: "Victor Hugo"}).pretty()

// Update the price of a specific book

db.books.updateOne({title: "The Stranger"}, {$set: {price: 10.99}}).pretty()

// delete a book by title

db.books.deleteOne({title: "whene the grass is green"})

// query to find books that are both in stock and published after 2010

db.books.find({ in_stock: true, published_year: { $gt: 2010 } }).pretty()

// query to project the return to only title, author and price 

db.books.find({}, {title: 1, author: 1, price: 1, _id: 0}).pretty()

// sort to display books by price in descending order

db.books.find().sort({price: -1}).pretty()

//sort to display books by price in ascending order

db.books.find().sort({price: +1}).pretty()

// use of limit and skip to implement pagination also with sort to only display the title, author and price.

db.books.find({}, { title: 1, author: 1, _id: 0 }).skip(10).limit(5)

//aggregation pipeline to find the average price of books per genre

db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" }
    }
  }
])

//aggregation pipeline to find author with the most books

db.books.aggregate([
  {
    $group: {
      _id: "$author",
      numberOfBooks: { $sum: 1 }
    }
  },
  {
    $sort: { numberOfBooks: -1 }
  },
  {
    $limit: 1
  }
])


// aggregation pipeline that groups books by publication decade and counts them 

 db.books.aggregate([
  {
    $group: {
      _id: {
        $multiply: [
          { $floor: { $divide: ["$published_year", 10] } },
          10
        ]
      },
      numberOfBooks: { $sum: 1 }
    }
  },
  {
    $sort: { _id: -1 } // Sort decades from latest to oldest
  }
])


// create an index to the title field for faster queries

db.books.createIndex({ title: 1 })

//compound index on author and published_year

db.books.createIndex( { "author": 1, "published_year": 1 } )

//use of 'explain()'  to demontrate the use of indexes

db.books.find({ title: "A Tale of Two Cities" }).explain()