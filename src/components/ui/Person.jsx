import React from "react";
import { DeleteButton } from "./delete";

const Person = ({ persons, onDelete }) => {
  console.log("persons ", persons);
  return (
    <>
      {persons.map((person, i) => (
        <Card
          key={i}
          name={person.name}
          number={person.number}
          onDelete={() => onDelete(person.id)}
        />
      ))}
    </>
  );
};

const Card = ({ name, number, onDelete }) => {
  console.log("Card: ", name, number);
  return (
    <p>
      {name} {number} <DeleteButton onClick={onDelete} />
    </p>
  );
};

const AddPerson = ({
  newName,
  handleNewName,
  newNumber,
  handleNewNumber,
  addPerson,
}) => (
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
);

export { Person, Card, AddPerson };
