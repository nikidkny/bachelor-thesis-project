import ContactForm from "../organisms/ContactForm";
import { Contact as ContactType } from "@/types";
import Footer from "../organisms/Footer";

export default function Contact({ blok }: ContactType) {
  return (
    <div className="pt-25">
        <ContactForm blok={blok.contactForm[0]} />
        <Footer />
    </div>
  );
}
