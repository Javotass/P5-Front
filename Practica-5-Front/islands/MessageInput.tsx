import { useState } from "preact/hooks";
import { refrescarMensajes } from "../signal.ts";

type Props = {
  chatId: string;
};

export default function MessageInput({ chatId }: Props) {
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      const response = await fetch("https://back-a-p4.onrender.com/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId,
          content: message,
          isContactMessage: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar mensaje");
      }

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