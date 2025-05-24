import { Contact, Chat } from "../types.ts";

type Props = {
  contacts: Contact[];
  selectedChat: Chat | null;
  onContactClick: (contact: Contact) => void;
};

export default function ContactSidebar({ contacts, selectedChat, onContactClick }: Props) {
  return (
    <div class="sidebar">
      <div class ="centar">
        <h2>Contactos</h2>
        <button onClick={() => (window.location.href = "/create-contact")}>
          Crear Contacto
        </button>
      </div>
      {contacts.length > 0 ? (
        contacts.map((contact) => (
          <div
            key={contact._id}
            class={`contact-card ${selectedChat?.contact._id === contact._id ? "selected" : ""}`}
            onClick={() => onContactClick(contact)}
          >
            <strong>{contact.name}</strong>
            <br />
            <small>{contact.phone}</small>
          </div>
        ))
      ) : (
        <p>Cargando contactos...</p>
      )}
    </div>
  );
}
