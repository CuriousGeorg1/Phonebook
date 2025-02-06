import { useState } from "react";
import { Person } from "./components/Person";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNewName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    };
    if (
      persons.some(
        (person) =>
          person.name === newName ||
          persons.some((person) => person.number === newNumber)
      )
    ) {
      alert(`${newName} is already added to the phonebook`);
    } else if (newNumber === "" || newNumber.length < 4) {
      alert("Invalid number");
    } else {
      console.log(personObject.name, personObject.number);
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <div style={{ paddingLeft: "30px" }}>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Person persons={persons} />
    </div>
  );
};

export default App;
