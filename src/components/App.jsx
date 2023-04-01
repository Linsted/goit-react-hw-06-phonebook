import React, { useEffect, useState } from "react"
import { Contacts } from "./Contacts/Contacts"
import { FilterContacts } from "./FilterContacts/FilterContacts"
import { PhonebookForm } from "./PhonebookForm/PhonebookForm";
import {Section} from "./App.styled"

export const  App =() => {

  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');


  useEffect(() => {
    const parsedStorage = JSON.parse(localStorage.getItem("contactStorage"));
    if (parsedStorage !== null) setContacts(parsedStorage);
  },[])


  useEffect(() => {
    localStorage.setItem("contactStorage", JSON.stringify(contacts))
  },[contacts])



  const addContact = newState => {
    contacts.some(contact => contact.name === newState.name) ? alert(`${newState.name} is in your list`) : setContacts((prevState) => [...prevState, newState]);
  };
  

  const filterForm = (evt) => setFilter(evt.target.value);
  

  const deleteContact = (id) => setContacts((prevState) => prevState.filter(contact => contact.id !== id));
  




  const normalizedRequest = filter.toLowerCase();
  const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(normalizedRequest));


  
    return (
      <Section>
        <h1>Phonebook</h1>
        < PhonebookForm onSubmit={addContact} />
        <h2>Contacts</h2>
        < FilterContacts
            onFilter={filterForm}
            filter={filter}/>
        < Contacts
          contacts={filteredContacts}
          onClick={deleteContact}
           />
      
      </Section>
  )
};
