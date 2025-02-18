import { useState, useEffect } from "react";
import { Person, AddPerson } from "./components/ui/Person";
import { Search } from "./components/ui/Search";
import contactService from "./services/contacts";
import axios from "axios";
import { Notification } from "./components/ui/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [actionMessage, setActionMessage] = useState(null);

  useEffect(() => {
    console.log("effect");
    contactService.getAll().then((response) => {
      if (Array.isArray(response)) {
        setPersons(response);
      } else {
        console.error("Expected an array but got:", response);
        setPersons([]);
      }
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
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        const person = persons.find((person) => person.name === newName);
        const changedPerson = { ...person, number: newNumber };
        contactService.update(person.id, changedPerson).then((response) => {
          setPersons(
            persons.map((person) =>
              person.id !== response.id ? person : response
            )
          );
        });
      }
    } else if (newNumber === "" || newNumber.length < 4) {
      alert("Invalid number");
    } else {
      console.log(personObject.name, personObject.number);
      contactService.create(personObject).then((response) => {
        setPersons(persons.concat(response));
        setActionMessage(`Added ${newName}`);
        setTimeout(() => {
          setActionMessage(null);
        }, 3000);
      });
      setNewName("");
      setNewNumber("");
    }
  };

  const handleDelete = (id) => {
    const person = persons.find((person) => person.id === id);
    if (person && window.confirm(`Delete ${person.name}?`)) {
      contactService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  const filteredPersons = Array.isArray(persons)
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div style={{ paddingLeft: "30px" }}>
      <h2>Phonebook</h2>
      <Search searchTerm={searchTerm} handleSearchTerm={handleSearchTerm} />
      <h2>Add a new contact</h2>
      <AddPerson
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
        addPerson={addPerson}
      />
      <Notification message={actionMessage} />
      <h2>Numbers</h2>
      <Person persons={filteredPersons} onDelete={handleDelete} />
    </div>
  );
};

export default App;
