import { useEffect, useState } from 'react'
import './App.css'

function App() {

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch(
  //       "http://localhost:5001/books",
  //       { method: "GET", 
  //         mode: "cors",
  //       });

  //     console.log(response);
  //   })
  // }, []);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:5001/books", {
        method: "GET",
        mode: "cors",
      });

      const data = await response.json();
      console.log(data);
      // setBooks(data.books);
    })();
  }, []);

  // useEffect(async () => {
  //   async function fetchData() {
  //     console.log(await fetch("http://localhost:5001/books"));
  //   }

  //   fetchData();
  // }, []);

  return (
    <>
      Hello
    </>
  )
}

export default App
