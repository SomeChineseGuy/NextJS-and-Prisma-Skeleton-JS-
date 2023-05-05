import React, { useState, useRef } from "react";
import Form from "../components/form";
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
      categories: cateRef.current.value,
      amountDecimal: amountRef.current.value*100,
      accounts: accountRef.current.value,
      sources: sourRef.current.value
    }
    console.log('submit is clicked!', inputValue);
    // axios.get('/api/transaction', inputValue)
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
  const categories = await prisma.category.findMany();
  const accounts = await prisma.account.findMany();

  return {
    props: { categories, accounts },
  };
}