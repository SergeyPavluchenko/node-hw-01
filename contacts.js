const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db", "./contacts.json");

async function listContacts() {
  const list = await fs.readFile(contactsPath);
  return JSON.parse(list);
}

async function getContactById(id) {
  const allContacts = await listContacts();
  const result = allContacts.find((item) => item.id === id);
  return result || null;
}

async function addContact(data) {
  const allContacts = await listContacts();
  const newContacts = {
    id: nanoid(),
    ...data,
  };
  allContacts.push(newContacts);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContacts;
}

async function removeContact(id) {
  const contactId = String(id);
  const allContacts = await listContacts();
  const contactIndex = allContacts.findIndex((item) => item.id === contactId);
  if (contactIndex === -1) {
    return null;
  }
  const newContact = allContacts.filter((_, index) => index !== contactIndex);
  await fs.writeFile(contactsPath, JSON.stringify(newContact, null, 2));
  return allContacts[contactIndex];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
