import { getActiveResources } from "@/actions/resources";
import ContactForm from "@/components/general/contact-form";

export default async function ContactPage() {
  const resources = await getActiveResources();
  return (
    <div className="py-10 flex flex-col items-center justify-start">
      <ContactForm resources={resources} />
    </div>
  );
}
