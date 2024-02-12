import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [state, setState] = useState("all");
  const [books, setBooks] = useState([]);
  const [featuredBook, setFeaturedBook] = useState({});
  const [searchResults, setSearchResults] = useState({});

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:5001/books", {
        method: "GET",
        mode: "cors",
      });

      await setBooks(await response.json());
    })();
  }, []);

  let page = null;

  if (state == "all") page = <AllBooks books={books} />
  else if (state == "random") page = <RandomBook setFeaturedBook={setFeaturedBook} featuredBook={featuredBook} />
  else if (state == "add") page = <AddBook />
  else if (state == "search") page = <FindBooks books={books} />

  return (
    <>
      <div className="pageControls">
        <button onClick={()=>setState("all")}>See all books</button>
        <button onClick={()=>setState("random")}>Randomiser</button>
        {/* <button onClick={()=>setState("addBook")}>Add book</button> */}
      </div>
      {page}
    </>
  )
}

const AllBooks = ({books}) => {
  return (
    <div className="bookList">
    {books.map((item, index) => {
      return (
        <Book key={index} book={item} />
      )
    })}
    </div>
  )
}

const RandomBook = ({setFeaturedBook, featuredBook}) => {
  const getRandomBook = () => {
    (async () => {
      const response = await fetch("http://localhost:5001/books/getrandom", {
        method: "GET",
        mode: "cors",
      });

      setFeaturedBook(await response.json());
    })();
  }

  return (
    <>
      <div><button onClick={getRandomBook}>Get Random Book</button></div>
      <div className="bookList">
        <Book book={featuredBook} />
      </div>
    </>
  )
}

const AddBook = ({setSearchResults, searchResults}) => { 

  return (
    <>
    </>
  )
}

const FindBooks = ({setSearchResults, searchResults}) => {

  return (
    <>
    </>
  )
}

const Book = ({book}) => {
  
  return (
    <div className="bookCard">
      <p>{book.title}</p>
      <p>{book.author}</p>
      <p>{book.genre}</p>
    </div>
  )
}

export default App
