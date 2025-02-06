import React from "react";

const Person = ({ persons }) => {
  return (
    <>
      {persons.map((person, i) => (
        <Number key={i} name={person.name} number={person.number} />
      ))}
    </>
  );
};

const Number = ({ name, number }) => {
  return (
    <p>
      {name} {number}
    </p>
  );
};

export { Person, Number };
