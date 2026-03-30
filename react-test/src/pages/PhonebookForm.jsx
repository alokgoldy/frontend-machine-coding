import { useState, useReducer, useCallback } from 'react';
import '../styles/phonebook-form.css';

function PhoneBookForm({ entries, setEntries }) {

  const initialState = {
    userFirstName: 'Alok',
    userLastName: 'Goldy',
    userPhone: '7878787878'
  }

  const formReducer = (state, { type, payload }) => {
    switch (type) {
      case 'RESET': {
        return { userFirstName: '', userLastName: '', userPhone: '' }
      }
      default: {
        return { ...state, [type]: payload }
      }
    }
  }

  const [formState, dispatch] = useReducer(formReducer, initialState);

  const onChange = ({ target: { name, value } }) => {
    dispatch({ type: name, payload: value })
  }

  const addEntryToPhoneBook = useCallback(({ formState: fs }) => {
    const { userFirstName, userLastName, userPhone } = fs;

    const newEntries = [
      ...entries,
      { userFirstName, userLastName, userPhone }
    ]

    const sortedEntries = newEntries.sort((a, b) => {
      const firstNameA = a.userFirstName.toLowerCase();
      const firstNameB = b.userFirstName.toLowerCase();

      return firstNameA < firstNameB ? -1 :
        firstNameA > firstNameB ? 1 : 0
    })
    setEntries(sortedEntries);
  }, [entries, setEntries])

  return (
    <form
      className="form-container"
      onSubmit={(e) => {
        e.preventDefault();
        addEntryToPhoneBook({ formState })
        dispatch({ type: 'RESET' })
      }}
    >
      <div className="form-row">
        <label htmlFor={'userFirstName'}>First Name</label>
        <input
          type='text'
          name='userFirstName'
          placeholder='Enter First Name'
          value={formState.userFirstName}
          onChange={onChange}
        />
      </div>
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