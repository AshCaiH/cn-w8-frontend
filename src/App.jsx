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
        <div className="bookCard" key={index}>
          <p>{item.title}</p>
          <p>{item.author}</p>
          <p>{item.genre}</p>
        </div>
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
      <h1>{featuredBook.title}</h1>
      <h2>{featuredBook.author}</h2>
      <p>{featuredBook.genre}</p>
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

const Book = ({index, book}) => {
  
}

export default App
