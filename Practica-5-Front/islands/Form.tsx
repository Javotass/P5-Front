import { useState } from "preact/hooks";
import { FunctionComponent } from "preact";
import { JSX } from "preact";

export const Form: FunctionComponent = () => {
  const [error, setError] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone,setPhone] = useState<string>("");


  const submitHandler = async (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
  e.preventDefault();
  const errorMsg: string[] = [];
  if (name === "") {
    errorMsg.push("Debes propocionar un nombre");
  }
  if (email === "") {
    errorMsg.push("Debes añadir un email");
  }
  if (phone === "") {
    errorMsg.push("Debes añadir un teléfono");
  }
  if (phone.length < 9) {
    errorMsg.push("El teléfono debe tener al menos 9 dígitos");
  }
  if (errorMsg.length > 0) {
    setError(errorMsg.join(" | "));
    return;
  }

  try {
    const response = await fetch("https://back-a-p4.onrender.com/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone }),
    });

    if (!response.ok) {
      throw new Error("Error al guardar el contacto");
    }
    setName("");
    setEmail("");
    setPhone("");
    setError("");
    window.location.href = "/";
  } catch (error) {
    console.error("Error al enviar los datos:", error);
    setError("Hubo un problema al guardar el contacto");
  }
};

  return (
    <div class="form">
      <h1>Introduce tus datos</h1>
      <form action="/submitform" method="POST" onSubmit={submitHandler}>
        <div>
          <label for="name">Name</label>
        </div>
        <div>
          <input
            onFocus={(e) => setError("")}
            onInput={(e) => setName(e.currentTarget.value)}
            type="text"
            id="name"
            name="name"
          />
        </div>

        <div>
          <label for="email">Email</label>
        </div>
        <div>
          <input
            onFocus={(e) => setError("")}
            onInput={(e) => setEmail(e.currentTarget.value)}
            type="email"
            id="email"
            name="email"
          />
        </div>

        <div>
          <label for="phone">Phone</label>
        </div>
        <div>
          <input
            onFocus={(e) => setError("")}
            onInput={(e) => setPhone(e.currentTarget.value)}
            type="number"
            id="phone"
            name="phone"
          />
        </div>

        <div>
          <button type="submit" disabled={error !== ""} class="btn">
            Submit
          </button>
        </div>
        <div>
          <button
            type="reset"
            class="reset"
            onClick={(e) => {
              setName("");
              setEmail("");
              setPhone("");
              setError("");
            }}
          >
            Reset
          </button>
        </div>
        {error !== "" && <div>{error}</div>}
      </form>
    </div>
  );
};

export default Form;