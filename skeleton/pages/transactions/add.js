import React, { useRef } from "react";
import Form from "../../components/add-edit-delete/form";
import { PrismaClient } from '@prisma/client'
import axios from 'axios';

export default function AddTransaction({categories, accounts}) {
  const titleRef = useRef(); //create a mutable value that persists across re-renders and doesn't trigger a re-render when it is updated.
  const cateRef = useRef(); 
  const amountRef = useRef(); 
  const accountRef = useRef(); 
  const sourRef = useRef(); 
  
  function handleSubmit(event) {
    event.preventDefault();
    const inputValue = {
      title: titleRef.current.value,
      categoryId: Number(cateRef.current.value),
      amountDecimal: amountRef.current.value*100,
      accountId: Number(accountRef.current.value),
      sourceId: sourRef.current.value,
      date: new Date().toISOString()
    }
    console.log('submit is clicked!');
    axios.post('/api/transaction', inputValue)
    .then(res => console.log('res', res))
    .catch(error => console.log(error.response.status));
  }
  
  return(
    <div>
      <Form onSubmit={handleSubmit} 
      titleRef={titleRef} cateRef={cateRef} amountRef={amountRef} accountRef={accountRef} sourRef={sourRef}
      type='transaction' text='Add A Transaction' categories={categories} accounts={accounts}/>
    </div>
  )
}

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  const categories = await prisma.category.findMany(); //names of the tables are in the seed.js file 
  const accounts = await prisma.account.findMany();

  return {
    props: { categories, accounts },
  };
}