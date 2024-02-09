import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [featuredBook, setFeaturedBook] = useState({});

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:5001/books", {
        method: "GET",
        mode: "cors",
      });

      const data = await response.json();
      console.log(data);
    })();
  }, []);

  useEffect(() => {
    console.log(featuredBook);
  });

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
      <button onClick={getRandomBook}>Get Random Book</button>
      <h1>{featuredBook.title}</h1>
      <h2>{featuredBook.author}</h2>
      <p>{featuredBook.genre}</p>
    </>
  )
}

export default App
