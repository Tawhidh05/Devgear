import { Mail, Clock, MapPin } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact",
  description: "Questions about an order or a product? Send the DevGear team a message.",
};

const DETAILS = [
  { icon: Mail, label: "Email", value: "hello@devgear.example" },
  { icon: Clock, label: "Support hours", value: "Mon to Fri, 9:00 to 18:00" },
  { icon: MapPin, label: "Based in", value: "Remote-first, worldwide shipping" },
];

export default function ContactPage() {
  return (
    <div className="page-container py-12 sm:py-20">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <h1 className="text-4xl font-bold tracking-tightest sm:text-5xl">Contact us</h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
            Questions about an order, a product or a return? Send us a message and a real person will reply.
          </p>
          <dl className="mt-10 space-y-6">
            {DETAILS.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-cobalt-soft text-cobalt">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <dt className="text-sm text-muted">{label}</dt>
                  <dd className="font-semibold">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
