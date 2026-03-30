import { useState } from 'react';

function PhoneBookForm() {

}

function InformationTable({ entries }) {

}

function PhoneBook() {
  const [entries, setEntries] = useState([]);

  return (
    <section>
      <PhoneBookForm entries={entries} setEntries={setEntries} />
      <InformationTable entries={entries} />
    </section>
  )
}

export default PhoneBook;