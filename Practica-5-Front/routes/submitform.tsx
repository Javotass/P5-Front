import { FreshContext, PageProps } from "$fresh/server.ts";

interface FormDataProps {
  name: string | null;
  email: string | null;
  phone: string | null;
}

export const handler = async (req: Request, ctx: FreshContext) => {
  const formData = await req.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");

  console.log("Datos recibidos:", { name, email, phone });
  return ctx.render({ name, email, phone });
};

export default function SubmitFormPage({ data }: PageProps<FormDataProps>) {
  const { name, email, phone } = data;

  return (
    <div class="form">
      <h1>Formulario Enviado Correctamente</h1>
      <div class="form-data">
        <p><strong>Nombre:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone:</strong> {phone}</p>
      </div>
      <a class="btn" href="/">Volver al inicio</a>
    </div>
  );
}