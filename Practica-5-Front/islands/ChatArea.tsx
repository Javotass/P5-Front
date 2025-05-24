import { Chat, Message } from "../types.ts";
import MessageInput from "./MessageInput.tsx";
import { useEffect, useState } from "preact/hooks";
import { refrescarMensajes } from "../signal.ts";
import axios from "npm:axios";

type Props = {
  chat: Chat | null;
};

export default function ChatArea({ chat }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);

  const fetchMessages = async () => {
    if (!chat) return;

    try {
      const response = await axios.get<Chat>(
        `https://back-a-p4.onrender.com/chats/${chat._id}`
      );
      setMessages(response.data.messageIds); // Actualizar los mensajes en el estado
    } catch (error) {
      console.error("Error al recargar mensajes:", error);
    }
  };

  // Recargar mensajes cuando cambie la señal o el chat
  useEffect(() => {
    fetchMessages();
  }, [refrescarMensajes.value, chat]);

  return (
    <div class="chat-area">
      {chat ? (
        <>
          <h2>Chat con {chat.contact.name}</h2>
          <div class="messages-list">
            {messages
              .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
              .map((msg) => (
                <div
                  key={msg._id}
                  class={`message ${
                    msg.isContactMessage ? "contact-message" : "user-message"
                  }`}
                >
                  {msg.content}
                  <br />
                  <small class="timestamp">
                    {new Date(msg.timestamp).toLocaleString()}
                  </small>
                </div>
              ))}
          </div>
          <MessageInput chatId={chat._id} />
        </>
      ) : (
        <>
          <h2>Área de Conversación</h2>
          <p>Selecciona un contacto para comenzar una conversación.</p>
        </>
      )}
    </div>
  );
}