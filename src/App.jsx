import { useState, useEffect } from "react";
import { Person } from "./components/ui/Person";
import { AddPerson } from "./components/ui/AddPerson";
import { Search } from "./components/ui/Search";
import contactService from "./services/contacts";
import { Notification } from "./components/ui/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [actionMessage, setActionMessage] = useState(null);

  useEffect(() => {
    console.log("fetching contacts...");
    contactService.getAll().then((response) => {
      if (Array.isArray(response)) {
        setPersons(response);
      } else {
        console.error("Expected an array but got:", response);
        setPersons([]);
      }
    });
  }, []);

  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  const addPerson = async (personObject) => {
    if (
      persons.some(
        (person) =>
          person.name === personObject.name ||
          persons.some((person) => person.number === personObject.number)
      )
    ) {
      if (
        window.confirm(
          `${personObject.name} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        const person = persons.find(
          (person) => person.name === personObject.name
        );
        const changedPerson = { ...person, number: personObject.number };
        contactService.update(person.id, changedPerson).then((response) => {
          setPersons(
            persons.map((person) =>
              person.id !== response.id ? person : response
            )
          );
        });
      }
    } else if (personObject.number === "" || personObject.number.length < 4) {
      alert("Invalid number");
    } else {
      await contactService.create(personObject).then((response) => {
        const updatedPersons = contactService.getAll().then((response) => {
          if (Array.isArray(response)) {
            setPersons(response);
          } else {
            console.error("Expected an array but got:", response);
            return [];
          }
        });
        setActionMessage(`Added ${personObject.name}`);
        setTimeout(() => {
          setActionMessage(null);
        }, 3000);
      });
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

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ paddingLeft: "30px" }}>
      <h2>Phonebook</h2>
      <Search searchTerm={searchTerm} handleSearchTerm={handleSearchTerm} />
      <h2>Add a new contact</h2>
      <AddPerson addPerson={addPerson} />
      <Notification message={actionMessage} />
      <h2>Numbers</h2>
      <Person persons={filteredPersons} onDelete={handleDelete} />
    </div>
  );
};

export default App;
