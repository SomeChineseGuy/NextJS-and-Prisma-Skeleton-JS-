import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBus,
  faShirt,
  faUtensils,
  faUserGraduate,
  faLaptop,
  faBurger,
  faGift,
  faCartShopping,
  faPeopleRoof,
  faWifi,
  faBuildingColumns,
  faHospital,
  faUser,
  faPaw,
  faHouse,
  faArrowsSpin,
} from "@fortawesome/free-solid-svg-icons";

// Check if the date is today or yesterday and format text accordingly
// const formatDate = (date) => {
//   const today = new Date();
//   const yesterday = new Date(today);
//   yesterday.setDate(yesterday.getDate() - 1);

//   return date === today.toLocaleDateString()
//     ? "Today"
//     : date === yesterday.toLocaleDateString()
//     ? "Yesterday"
//     : date;

//   return date;
// };

// Group transactions by date
const groupedTransactions = (transactions) => {
  const transactionsByDate = transactions.reduce((result, transaction) => {
    !result[transaction.date]
      ? (result[transaction.date] = [transaction])
      : result[transaction.date].push(transaction);

    return result;
  }, {});

  const sortedKeys = Object.keys(transactionsByDate).sort((a, b) => {
    return new Date(b) - new Date(a);
  });

  const sortedTransactions = sortedKeys.map((date) => {
    return {
      date: date,
      transactions: transactionsByDate[date],
    };
  });

  return sortedTransactions;
};

// Category icons
const CATEGORY_ICONS = {
  Transportation: faBus,
  Clothing: faShirt,
  "Dining Out": faUtensils,
  Education: faUserGraduate,
  Electronics: faLaptop,
  "Fast-Food": faBurger,
  Gifts: faGift,
  Groceries: faCartShopping,
  Household: faPeopleRoof,
  "Internet & Phone": faWifi,
  Loans: faBuildingColumns,
  Medical: faHospital,
  Personal: faUser,
  Pet: faPaw,
  Rent: faHouse,
  Subscriptions: faArrowsSpin,
};

export default function TransactionList({ transactions }) {
  return (
    <>
      <div className="p-5 bg-orange-100	rounded-2xl flex flex-col">
        <h1>Transactions</h1>
        {groupedTransactions(transactions).map(({ date, transactions }) => {
          return (
            <div className="mt-5 flex flex-col" key={date + transactions[0].id}>
              <span className="text-sm">{date}</span>
              {transactions.map((transaction) => {
                return (
                  <div key={transaction.id} className="flex mt-5">
                    <div className="flex items-center w-16">
                      <FontAwesomeIcon
                        icon={CATEGORY_ICONS[transaction.categories.name]}
                        size="3x"
                      />
                    </div>
                    <div className="flex flex-col ms-5 flex-1 justify-center">
                      <div className="flex font-semibold text-xl">
                        {transaction.title}
                      </div>
                      <div className="flex text-sm">{transaction.date}</div>
                    </div>
                    <div className="flex items-center font-bold text-xl">
                      -${transaction.amountDecimal}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}
