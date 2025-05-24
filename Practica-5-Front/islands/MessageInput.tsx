import { useState } from "preact/hooks";
import axios from "npm:axios";
import { refrescarMensajes } from "../signal.ts";

type Props = {
  chatId: string;
};

export default function MessageInput({ chatId }: Props) {
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      await axios.post("https://back-a-p4.onrender.com/messages", {
        chatId,
        content: message,
        isContactMessage: false,
      });
      setMessage("");
      refrescarMensajes.value = !refrescarMensajes.value; // Cambiar el valor de la señal
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
    }
  };

  return (
    <div class="message-input">
      <input
        type="text"
        placeholder="Escribe tu mensaje..."
        value={message}
        onInput={(e) => setMessage(e.currentTarget.value)}
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
}