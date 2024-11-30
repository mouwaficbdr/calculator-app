import { useState } from 'react';
import { evaluate } from 'mathjs';

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
  { placeholder: 'AC', value: '', id: 'clear' },
];

export default function App() {
  const [inputs, setInputs] = useState(''); // Stocke la chaîne complète
  const [display, setDisplay] = useState('0'); // Affiche la partie actuelle

  const operators = ['+', '-', '*', '/'];

  // Fonction pour effacer l'écran
  function deleteEntries() {
    setInputs('');
    setDisplay('0');
  }

  // Gestion des entrées (avec gestion des opérateurs consécutifs)
function handleKeyPress(event) {
  const newValue = event.target.value;
  const lastChar = inputs.slice(-1); // Dernier caractère
  const beforeLastChar = inputs.slice(-2, -1); // Avant-dernier caractère
  const isLastCharOperator = operators.includes(lastChar);
  const isNewValueOperator = operators.includes(newValue);

  // Si "AC" est pressé
  if (newValue === '') {
    deleteEntries();
    return;
  }

  // Si "=" est pressé pour calculer
  if (newValue === '=') {
    try {
      const result = evaluate(inputs);
      setInputs(result.toString());
      setDisplay(result.toString());
    } catch {
      setDisplay('Erreur');
    }
    return;
  }

  // Gérer les décimales
  if (newValue === '.') {
    const lastNumber = inputs.split(/[\+\-\*\/]/).pop(); // Récupère le dernier nombre
    if (lastNumber.includes('.')) {
      return; // Empêche d'ajouter un second point
    }
    if (lastChar === '.' || isLastCharOperator) {
      setInputs((prev) => prev + '0.');
      setDisplay('0.');
    } else {
      setInputs((prev) => prev + '.');
      setDisplay((prev) => prev + '.');
    }
    return;
  }

  // Gérer les opérateurs consécutifs
  if (isNewValueOperator) {
    if (isLastCharOperator && newValue !== '-') {
      const updatedInputs =
        beforeLastChar && operators.includes(beforeLastChar)
          ? inputs.slice(0, -2) + newValue
          : inputs.slice(0, -1) + newValue;
      setInputs(updatedInputs);
      setDisplay(newValue);
      return;
    }
  }

  // Ajouter le nouveau caractère à la chaîne
  setInputs((prev) => prev + newValue);

  // Mettre à jour l'affichage
  if (!isNewValueOperator) {
    setDisplay((prev) => (prev === '0' ? newValue : prev + newValue));
  } else {
    setDisplay(newValue);
  }
}


  return (
    <div className="calculator">
      <div className="screen">
        <div id="inputs">{inputs}</div>
        <div id="display">{display}</div>
      </div>
      <div className="keys-container">
        {keys.map((key) => (
          <button
            className="key"
            id={key.id}
            key={key.id}
            value={key.value}
            onClick={(event) => handleKeyPress(event)}
          >
            {key.placeholder}
          </button>
        ))}
      </div>
    </div>
  );
}
