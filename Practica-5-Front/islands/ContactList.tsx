import { useEffect, useState } from "preact/hooks";
import axios from "npm:axios";
import { Contact, Chat } from "../types.ts";
import ContactSidebar from "./ContactSidebar.tsx";
import ChatArea from "./ChatArea.tsx";

const ContactList = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get<{ count: number; data: Contact[] }>(
          "https://back-a-p4.onrender.com/contacts"
        );
        setContacts(response.data.data);
      } catch (error) {
        console.error("Error al obtener contactos:", error);
      }
    };

    fetchContacts();
  }, []);

  const onContactClick = async (contact: Contact) => {
    try {
      const response = await axios.get<Chat>(
        `https://back-a-p4.onrender.com/chats/${contact.chatId}`
      );
      setSelectedChat(response.data);
    } catch (error) {
      console.error("Error al obtener chat:", error);
    }
  };

  return (
    <div class="container">
      <ContactSidebar
        contacts={contacts}
        selectedChat={selectedChat}
        onContactClick={onContactClick}
      />
      <ChatArea chat={selectedChat} />
    </div>
  );
};

export default ContactList;
