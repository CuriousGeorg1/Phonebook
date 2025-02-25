import { useState } from "react";

const AddPerson = ({ addPerson }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };
  const handleNewNumber = (event) => setNewNumber(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    addPerson({ name: newName, number: newNumber });
    setNewName("");
    setNewNumber("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Name: <input value={newName} onChange={handleNewName} />
      </div>
      <div>
        Number: <input value={newNumber} onChange={handleNewNumber} />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export { AddPerson };
