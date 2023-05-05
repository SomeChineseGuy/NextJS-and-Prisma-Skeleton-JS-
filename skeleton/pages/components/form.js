import React, { useState } from 'react';

export default function Form({onSubmit, type, text, categories, sources}) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [account, setAccount] = useState('')
  const [source, setSource] = useState('')
  const [category, setCategory] = useState('Clothing')

  console.log(category); //for testing
  
  return (
    <div className="flex items-center h-screen">
      {type === 'transaction' && (
        <form onSubmit={onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto">
          <h1 className="text-xl font-bold mb-4">{text}</h1>
          <label>
            Title:
            <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text" value={title} onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <br />
          <br/>
          
          <label>
            Category:
            <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <select 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id='category' value={category} onChange={e => setCategory(e.target.value)}
              >
              {categories && categories.map(category => {
                return <option value={category.name} key={category.id}>{category.name}</option>
              })}
              </select>
            </div>
          </label>
          <br />
          <br/>
          
          <label>
            Expense Amount:
            <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text" value={amount} onChange={(e) => setAmount(e.target.value)} 
            />
          </label>
          <br />
          <br/>
          
          <label>
            Payment Account:
            <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type='text' value={account} onChange={e => setAccount(e.target.value)}
            />
          </label>
          <br/>
          <br/>
          
          <label>
            Sources:
            <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type='text' value={sources} onChange={e => setSources(e.target.value)}
            />
          </label>
          <br/>
          <br/>
          
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit
          </button>
        </form>
        )}
    </div>
  );
}

