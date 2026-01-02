import { sendContactEmail } from "@/lib/email/sendEmail";
import { supabase } from "@/lib/supabase/client";
import { ContactFormDTO } from "@/types/ContactFormDTO";
import validate from "@/utils/validate";

export async function POST(req: Request) {
  const body: ContactFormDTO = await req.json();

  const { isValid, validationError } = validate(body);

  if (!isValid) {
    return new Response(JSON.stringify({ error: validationError }), {
      status: 400,
    });
  }

  const { data, error } = await supabase
    .from("contact_submissions")
    .insert(body)
    .select();

  if (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 400,
    });
  }

  try {
    await sendContactEmail({
      full_name: body.full_name,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `Failed to send email: ${error}` }),
      {
        status: 500,
      },
    );
  }
  return new Response(
    JSON.stringify({
      message: "Contact form submitted successfully",
      data,
      success: true,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
}
