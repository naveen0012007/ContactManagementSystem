'use strict'// Get DOM elements
const inputText = document.getElementById('inputText');
const inputNumber = document.getElementById('inputNumber');
const submitBtn = document.querySelector('.btn');
const toDoContainer = document.getElementById('toDoContainer');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.close-modal');
const modalBtnName = document.getElementById('modalBtnName');
const modalBtnNumber = document.getElementById('modalBtnNumber');
const modalButton = document.querySelector('.modalButton');
let contacts = [];

// Function to create a new contact
function createContact(name, number) {
  const contact = {
    name: name,
    number: number
  };
  contacts.push(contact);
}

// Function to render contacts
function renderContacts() {
  toDoContainer.innerHTML = '';

  contacts.forEach((contact, index) => {
    const contactDiv = document.createElement('div');
    contactDiv.classList.add('context');

    const dataName = document.createElement('div');
    dataName.classList.add('dataName');
    dataName.textContent = `${contact.name}`;

    const dataNumber = document.createElement('div');
    dataNumber.classList.add('dataNumber');
    dataNumber.textContent = `${contact.number}`;

    const editButton = document.createElement('button');
    editButton.classList.add('edit');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => openModal(index));

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteContact(index));

    contactDiv.appendChild(dataName);
    contactDiv.appendChild(dataNumber);
    contactDiv.appendChild(editButton);
    contactDiv.appendChild(deleteButton);

    toDoContainer.appendChild(contactDiv);
  });
}

// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault();

  const name = inputText.value.trim();
  const number = inputNumber.value.trim();

  if (name !== '' && number !== '') {
    createContact(name, number);
    renderContacts();
    inputText.value = '';
    inputNumber.value = '';
  }
}

// Function to open the modal for editing a contact
function openModal(index) {
  const contact = contacts[index];

  modalBtnName.value = contact.name;
  modalBtnNumber.value = contact.number;
  modal.setAttribute('data-index', index);

  overlay.classList.remove('hidden');
  modal.classList.remove('hidden');

  // Save the updated contact on submit
  closeModalBtn.onclick = () => closeModal();
}

// Function to close the modal
function closeModal() {
    console.log('fghjkl')
  const newName = modalBtnName.value.trim();
  const newNumber = modalBtnNumber.value.trim();
  const index = parseInt(modal.getAttribute('data-index'));

  if (newName !== '' && newNumber !== '') {
    contacts[index].name = newName;
    contacts[index].number = newNumber;
    renderContacts();
  }

  overlay.classList.add('hidden');
  modal.classList.add('hidden');
}

// Function to delete a contact
function deleteContact(index) {
  contacts.splice(index, 1);
  renderContacts();
}

// Event listeners
submitBtn.addEventListener('click', handleSubmit);
overlay.addEventListener('click', () => {
  overlay.classList.add('hidden');
  modal.classList.add('hidden');
});
modalButton.addEventListener('click', closeModal);
// Initial render
renderContacts();

