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
  { placeholder: '/', value: '/', id: 'divide' },
  { placeholder: '=', value: '=', id: 'equals' },
  { placeholder: 'AC', value: '', id: 'clear' }
];



export default function App() {

  const [inputs, setInputs] = useState("")
  const [display, setDisplay] = useState("")

  function deleteEntries() {
    setInputs("")
    setDisplay("")
  }

  function handleKeyPress(event) {
    setInputs((inputs) => {
      const newValue = event.target.value;
      return inputs + newValue;
    });

    setDisplay((display) => {
      const lastChar = inputs === '' ? '' : inputs.charAt(inputs.length - 1);
      const operators = ["*", "+", "-", "/"]
      if (
        !operators.includes(lastChar) && !operators.includes(event.target.value)
      ) {
        return display + event.target.value;
      } else {
        return event.target.value;
      }
    });
  }


  function displayResult() {
    //TODO Traiter le string qui se trouve dans le input comme un calcul réel et définir setDisplay sur le résultat du calcul
    setDisplay(inputs)

  }

  return (
    <div className="calculator">
      <div className="screen">
        <div id="inputs">{inputs}</div>
        <div id="display">{display}</div>
      </div>
      <div className="keys-container">
        {
          keys.map((key) => (
            <button
              className="key"
              id={key.id}
              key={key.id}
              value={key.value}
              onClick={
                () => {
                  if (key.value === "=")
                    return displayResult()
                  else if (key.value === "")
                    return deleteEntries()
                  else
                    return handleKeyPress(event)
                }}>
              {key.placeholder}
            </button>
          ))
        }
      </div>
    </div>
  )
}


