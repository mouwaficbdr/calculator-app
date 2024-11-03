import { useState } from 'react'


const keys = [
  { placeholder: '0', value: '0', id: 'zero' },
  { placeholder: '1', value: '1', id: 'one' },
  { placeholder: '2', value: '2', id: 'two' },
  { placeholder: '3', value: '3', id: 'three' },
  { placeholder: '4', value: '4', id: 'four' },
  { placeholder: '5', value: '5', id: 'five' },
  { placeholder: '6', value: '6', id: 'six' },
  { placeholder: '7', value: '7', id: 'seven' },
  { placeholder: '8', value: '8', id: 'eight' },
  { placeholder: '9', value: '9', id: 'nine' },
  { placeholder: '.', value: '.', id: 'decimal' },
  { placeholder: '+', value: '+', id: 'add' },
  { placeholder: '-', value: '-', id: 'subtract' },
  { placeholder: '×', value: '*', id: 'multiply' },
  { placeholder: '÷', value: '/', id: 'divide' },
  { placeholder: '=', value: '=', id: 'equal' },
  { placeholder: 'C', value: 'C', id: 'clear' }
];



export default function App() {
  return (
    <div className="calculator">
      <div className="screen"></div>
      <div className="keys-container">
        {
          keys.map((key) => {
            <button className='key' id={key.id} key={key.id} value={key.value}>{key.placeholder}</button>
          })
        }
      </div>
    </div>
  )
}


