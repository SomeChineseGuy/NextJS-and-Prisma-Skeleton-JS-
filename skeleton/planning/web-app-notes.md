# BudgetBoss

## Web App

- Fluid Design using Flexbox
- Single-page web application

## Stack

- JavaScript
- React.js
- Next.js
- Prisma
- Tailwind

## Libraries

- d3.js
- Axios

## API vs Server Side Props vs Static Props
- Use API for any database requests
- Use Server Side Props for any GET requests

## Intention revealing names
- Pronounceable names
- Searchable names
- Variables (let):
    - camelCase
    - Clear meaning
        - let fistName = ‘Mario’
- Constant (const):
    - All caps
        - const TIME = 60 
- Booleans:
    - camelCase
    - Always start with “is”, “are”, “has”
        - let isVisible = true
        - Let hasKey = false
- Functions
    - camelCase
    - Starts with verb or action
        - getOrder()
        - fetchClaims()
        - deleteOrder()
- Methods
    - camelCase
    - Verbs or actions
        - *.delete()
- Classes
    - PascalCase
        - class User { … }
- Arguments
    - Self-explanatory
    - If possible one word lowercase, more than one camelCase
        - getRemainder(number, divisor)
