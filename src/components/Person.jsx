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

export { Person, Card };
