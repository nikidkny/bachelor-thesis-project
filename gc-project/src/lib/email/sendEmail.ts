import { ContactEmailTemplate } from "./ContactEmailTemplate";
import { resendClient } from "./resendClient";
import { ContactEmailType } from "@/types/ContactEmailType";

export async function sendContactEmail({full_name}: ContactEmailType) {
  try {
    const response = await resendClient.emails.send({
      from: "Good City <onboarding@resend.dev>", 
    //   to: `${company_email}`,
      to: "d.nikolett2@gmail.com",
      subject: "We recieved your message!",
      react: ContactEmailTemplate({ full_name }),
    });

    return response;
  } catch (error) {
    throw error;
  }
}
