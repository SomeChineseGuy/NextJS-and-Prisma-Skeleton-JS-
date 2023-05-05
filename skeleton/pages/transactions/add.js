import React, { useState } from 'react';
import Form from "../components/form";

export default function TransactionAction() {

  function handleSubmit(event) {
    event.preventDefault();
    console.log('submit is clicked!');
  }
  
  return(
    <div>
      <Form onSubmit={handleSubmit} type='transaction' text='Add A Transaction'/>
    </div>
  )
}