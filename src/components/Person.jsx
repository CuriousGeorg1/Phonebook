import React from "react";

const Person = ({ persons }) => {
  console.log("persons ", persons);
  return (
    <>
      {persons.map((person, i) => (
        <Card key={i} name={person.name} number={person.number} />
      ))}
    </>
  );
};

const Card = ({ name, number }) => {
  console.log("Card: ", name, number);
  return (
    <p>
      {name} {number}
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
