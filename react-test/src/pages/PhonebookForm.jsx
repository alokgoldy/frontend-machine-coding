import { useState } from 'react';

function PhoneBookForm() {

}

function InformationTable({ entries }) {
  return (
    <table>
      <thead>
        <tr>
          <td>First Name</td>
          <td>Last Name</td>
          <td>Phone Number</td>
        </tr>
      </thead>
      <tbody>
        {entries.map(({ userFirstName, userLastName, userPhone }, idx) => (
          <tr key={idx}>
            <td>{userFirstName}</td>
            <td>{userLastName}</td>
            <td>{userPhone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
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