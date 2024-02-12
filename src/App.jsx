import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [state, setState] = useState("all");
  const [books, setBooks] = useState([]);
  const [featuredBook, setFeaturedBook] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:5001/books", {
        method: "GET",
        mode: "cors",
      });

      await setBooks(await response.json());
    })();
  }, [refresh]);

  let page = null;

  if (state == "all") page = <AllBooks books={books} refresh="refresh" setRefresh={setRefresh} />
  else if (state == "random") page = <RandomBook setFeaturedBook={setFeaturedBook} featuredBook={featuredBook} />
  else if (state == "add") page = <AddBook refresh={refresh} setRefresh={setRefresh}/>
  else if (state == "search") page = <FindBooks books={books} searchResults={searchResults} setSearchResults={setSearchResults} refresh={refresh} setRefresh={setRefresh}/>

  return (
    <>
      <div className="pageControls">
        <button onClick={()=>setState("all")}>See all books</button>
        <button onClick={()=>setState("random")}>Randomiser</button>
        <button onClick={()=>setState("search")}>Find Books</button>
        <button onClick={()=>setState("add")}>Add Book</button>
        {/* <button onClick={()=>setState("addBook")}>Add book</button> */}
      </div>
      {page}
    </>
  )
}

const AllBooks = ({books, refresh, setRefresh}) => {
  return (
    <div className="bookList">
    {books.map((item, index) => {
      return (
        <Book key={index} book={item} refresh={refresh} setRefresh={setRefresh} />
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

const AddBook = ({refresh, setRefresh}) => {
  const [response, setResponse] = useState()

  const addBook = () => {  
    const query = JSON.stringify([{
      title: document.getElementById("inputTitle").value,
      author: document.getElementById("inputAuthor").value,
      genre: document.getElementById("inputGenre").value,
    }]);
    
    console.log(query);

    (async () => {
      setResponse(await fetch("http://localhost:5001/books", {
        method: "POST",
        mode: "cors",
        headers: {'Content-Type': 'application/json' },
        body: query,
      }).then((response) => {
        return response.json();
      })
        .then((data) => {
        console.log(data);
        document.getElementById("response").innerHTML = data.message;
        setRefresh(!refresh);
      }))
    })();
  }

  return (
    <>
      <div className="inputHolder">
        <input id="inputTitle" placeholder="Title"></input>
        <input id="inputAuthor" placeholder="Author"></input>
        <input id="inputGenre" placeholder="Genre"></input>
      </div>
      <button onClick={addBook}>Add book</button>

      <p id="response">{response}</p>
    </>
  )
}

const FindBooks = ({setSearchResults, searchResults, refresh, setRefresh}) => {

  const searchFunc = (e) => {
    let mode = document.getElementById("searchMode");
    mode = mode.options[mode.selectedIndex].value.toLowerCase();
    console.log(mode);

    let query = document.getElementById("searchInput").value;

    console.log(mode, query);

    (async () => {
      const response = await fetch(`http://localhost:5001/books/${mode}/${query}`, {
        method: "GET",
        mode: "cors",
      });

      await setSearchResults(await response.json());

      console.log(`http://localhost:5001/books/${mode}/${query}`, searchResults);
    })();
  }

  return (
    <>      
      <div className="inputHolder">
        <select id="searchMode">
          <option>Title</option>
          <option>Author</option>
          <option>Genre</option>
        </select>
      <input id="searchInput"/></div>
      <button onClick={searchFunc}>Search</button>

      <div className="bookList">
      {searchResults.map((item, index) => {
        return (
          <Book key={index} book={item} refresh={refresh} setRefresh={setRefresh} />
        )
      })}
      </div>
    </>
  )
}

const Book = ({book, refresh, setRefresh}) => {

  

  const removeBook = () => {
    const query = JSON.stringify({_id: book._id})
    console.log(query);

    (async () => {
      await fetch("http://localhost:5001/books", {
        method: "DELETE",
        mode: "cors",
        headers: {'Content-Type': 'application/json' },
        body: query,
      }).then((response) => {
        console.log(response);
        return response.json();
      }).then(() => {
        setRefresh(!refresh);
      });
    })();
  }

  return (
    <div className="bookCard">
      <p>{book.title}</p>
      <p>{book.author}</p>
      <p>{book.genre}</p>

      {refresh && <button onClick={removeBook}>Remove from<br />database</button> }
    </div>
  )
}

export default App
