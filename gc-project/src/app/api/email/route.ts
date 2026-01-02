import { sendContactEmail } from "@/lib/email/sendEmail";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await sendContactEmail(body);

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
      { status: 200 },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Failed to send email" }),
      { status: 500 },
    );
  }
}
