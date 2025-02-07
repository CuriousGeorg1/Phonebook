import { useState, useEffect } from "react";
import { Person, AddPerson } from "./components/Person";
import { Search } from "./components/Search";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);

  const handleNewName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value);
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

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ paddingLeft: "30px" }}>
      <h2>Phonebook</h2>
      <Search searchTerm={searchTerm} handleSearchTerm={handleSearchTerm} />
      <h2>Add a new</h2>
      <AddPerson
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Person persons={filteredPersons} />
    </div>
  );
};

export default App;
