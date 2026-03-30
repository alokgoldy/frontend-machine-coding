import { useState, useReducer, useCallback } from 'react';
import '../styles/phonebook-form.css'

function PhoneBookForm({ entries, setEntries }) {
  const initialState = {
    userFirstname: 'Coder',
    userLastname: 'Byte',
    userPhone: '9898988998'
  }

  const formReducer = (state, { type, payload }) => {
    switch (type) {
      case 'RESET':
        return { userFirstName: '', userLastName: '', userPhone: '' }
      default:
        return { ...state, [type]: payload }
    }
  }

  const [formState, dispatch] = useReducer(formReducer, initialState);

  const onChange = ({ target: { name, value } }) => {
    dispatch({ type: name, payload: value });
  }

  const addEntryToPhoneBook = useCallback(() => {

    const { userFirstName, userLastName, userPhone } = formState;

    const newEntries = [
      ...entries,
      { userFirstName, userLastName, userPhone }
    ]

    const newSortedEntries = newEntries.sort((a, b) => {
      const userFirstNameA = a.userFirstName.toLowerCase();
      const userFirstNameB = b.userFirstName.toLowerCase();

      return userFirstNameA < userFirstNameB ?
        -1 : userFirstNameA > userFirstNameB ? 1 : 0
    })
    setEntries(newSortedEntries);
  }, [formState, entries, setEntries])

  return (
    <form
      className="form-container"
      onSubmit={e => {
        e.preventDefault();
        addEntryToPhoneBook(formState);
        dispatch({ type: "RESET" });
      }}
    >
      <label>First Name</label>
      <br />
      <input
        className="userFirstname"
        name="userFirstname"
        type="text"
        onChange={onChange}
        value={formState.userFirstname}
      />
      <label>Last name:</label>
      <br />
      <input
        className="userLastname"
        name="userLastname"
        type="text"
        onChange={onChange}
        value={formState.userLastname}
      />
      <label>Phone:</label>
      <br />
      <input
        className="userPhone"
        name="userPhone"
        type="text"
        onChange={onChange}
        value={formState.userPhone}
      />
      <br />
      <input
        className="submitButton"
        type="submit"
        value="Add User"
      />
    </form>
  )
}


function InformationTable({ entries }) {

  return (
    <table className="informationTable">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Phone</th>
        </tr>
      </thead>
      {entries.map(({ userFirstName, userLastName, userPhone }, index) => {
        <tr key={index + 1}>
          <td>{userFirstName}</td>
          <td>{userLastName}</td>
          <td>{userPhone}</td>
        </tr>
      })}
    </table>
  )
}

function PhonebookForm() {
  const [entries, setEntries] = useState([]);

  return (
    <section className="phonebook-wrapper">
      <PhoneBookForm entries={entries} setEntries={setEntries} />
      <InformationTable entries={entries} />
    </section>
  )
}

export default PhonebookForm;
