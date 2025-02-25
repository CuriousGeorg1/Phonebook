import React from "react";
import { DeleteButton } from "./delete";

const Person = ({ persons, onDelete }) => {
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

export { Person, Card };
