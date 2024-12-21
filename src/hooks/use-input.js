import { useState } from "react";

export function useInput(defaultValue, validationFunction) {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  // Validation logic
  const valueIsValid = validationFunction(enteredValue);
  const hasError = didEdit && !valueIsValid;

  // Input change handler
  function handleInputChange(event) {
    setEnteredValue(event.target.value); // Update value
    setDidEdit(false); // Reset editing state on change
  }

  // Blur event handler
  function handleInputBlur() {
    setDidEdit(true); // Mark as edited
  }

  // Reset input state
  function reset() {
    setEnteredValue(defaultValue); // Reset to initial value
    setDidEdit(false); // Reset editing state
  }

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    handleInputChange,
    handleInputBlur,
    reset,
  };
}
