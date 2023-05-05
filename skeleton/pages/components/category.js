import React, {useState} from 'react';
import { PrismaClient } from '@prisma/client'

export default function Category({categories}) {
  const [category, setCategory] = useState('Clothing')
  console.log(category); //for testing

  return (
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
  )
}

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  const categories = await prisma.category.findMany();

  return {
    props: { categories },
  };
}