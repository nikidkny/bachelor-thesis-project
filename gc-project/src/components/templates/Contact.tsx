import ContactForm from "../organisms/ContactForm";
import { Contact as ContactType } from "@/types";
import Footer from "../organisms/Footer";

export default function Contact({blok}: {blok: ContactType}) {
  return (
    <div className="pt-25">
      <ContactForm blok={blok} />
      <Footer />
    </div>
  );
}
