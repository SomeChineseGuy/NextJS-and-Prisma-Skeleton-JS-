//use this for add-category feature
import React, { useState } from 'react';

export default function AddCategory() {
  const [category, setCategory] = useState('')

  function handleSubmit(event) {
    event.preventDefault();
    console.log('submit is clicked!');
  }
  
  return(
    <div className="flex items-center h-screen">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto">
          <h1 className="text-xl font-bold mb-4">Add A Category</h1>
          <label>
            Category:
            <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type='text' value={category} onChange={e => setCategory(e.target.value)}
            />
          </label>
          <br/>
          <br/>
          
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit
          </button>
        </form>
    </div>
  )
}