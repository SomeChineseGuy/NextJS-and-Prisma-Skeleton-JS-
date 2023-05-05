import React, { useState } from 'react';
import Form from "../components/form";
import { PrismaClient } from '@prisma/client'

export default function TransactionAction({categories, sources}) {

  function handleSubmit(event) {
    event.preventDefault();
    console.log('submit is clicked!');
  }
  
  return(
    <div>
      <Form onSubmit={handleSubmit} type='transaction' text='Add A Transaction' categories={categories}/>
    </div>
  )
}

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  const categories = await prisma.category.findMany();
  const sources = await prisma.source.findMany();

  return {
    props: { categories, sources },
  };
}