import React from 'react';

export default function Form({onSubmit, type, text, categories, accounts, titleRef, cateRef, amountRef, accountRef, sourRef}) {
  
  return (
    <div className="flex items-center h-screen">
      {type === 'transaction' && (
        <form onSubmit={onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto">
          <h1 className="text-xl font-bold mb-4">{text}</h1>
          <label>
            Title:
            <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text" ref={titleRef}
            />
          </label>
          <br />
          <br/>
          
          <label>
            Category:
            <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <select 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id='category' ref={cateRef}
              >
              {categories && categories.map(category => {
                return <option value={category.id} key={category.id}>{category.name}</option>
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
            type="text" ref={amountRef}
            />
          </label>
          <br />
          <br/>
          
          <label>
            Payment Account:
            <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <select 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id='account' ref={accountRef}
              >
              {accounts && accounts.map(account => {
                return <option value={account.id} key={account.id}>{account.name}</option>
              })}
              </select>
            </div>
          </label>
          <br/>
          <br/>
          
          <label>
            Sources:
            <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type='text' ref={sourRef}
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
