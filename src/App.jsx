import { useState } from 'react'
import { createClient } from '@supabase/supabase-js';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Library() {
  
  const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

  // The useState hook lets us store data in a component across renders
  // setMyBooks is a setter function that updates the state of myBooks
  const [myBooks, setMyBooks] = useState([]);
  // This should look familar from Codepen
  async function getBooks() {
    let { data: books, error } = await supabase
      .from('books')
      .select('*')
    // Update the state
    setMyBooks(books);
  }
  // Execute the function
  getBooks();
  // Below is what displays when you use <Library />
  return (
    <table>
    {
      myBooks.map(b => (
        <tr>
          <td>{b.title}</td>
          <td>{b.author}</td>
          <td>{b.isbn}</td>
        </tr>
      ))
    }
    </table>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Library />
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
