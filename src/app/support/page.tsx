import type { Metadata } from "next";
import { BadgeCheck, Mail, RotateCcw, Truck } from "lucide-react";
import { Container, PageHeader } from "@/components/ui/misc";

export const metadata: Metadata = {
  title: "Support",
  description: "Delivery, returns and warranty information for GadgetLy orders.",
};

const TOPICS = [
  {
    id: "shipping",
    icon: Truck,
    title: "Shipping & delivery",
    body: [
      "Orders over $50 ship free and arrive within two working days. Smaller orders ship for a flat $4.99.",
      "You'll get a tracking link by email as soon as your parcel leaves our warehouse.",
    ],
  },
  {
    id: "returns",
    icon: RotateCcw,
    title: "Returns",
    body: [
      "Return any product within 30 days of delivery for a full refund, as long as it's in its original box with all accessories.",
      "Start a return by emailing us your order number. We'll send a prepaid label.",
    ],
  },
  {
    id: "warranty",
    icon: BadgeCheck,
    title: "Warranty",
    body: [
      "Every product carries a two-year GadgetLy warranty on top of the maker's own cover.",
      "If something stops working, contact us first. We arrange the repair or replacement with the manufacturer.",
    ],
  },
];

export default function SupportPage() {
  return (
    <Container className="pt-12 pb-20">
      <PageHeader
        title="Support"
        description="Answers about delivery, returns and warranty. Still stuck? Email us and a person will reply within one working day."
      />
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="space-y-5">
          {TOPICS.map(({ id, icon: Icon, title, body }) => (
            <section key={id} id={id} className="scroll-mt-24 rounded-xl border bg-surface p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-lg bg-primary-soft text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h2 className="text-xl font-bold">{title}</h2>
              </div>
              {body.map((p) => (
                <p key={p} className="mt-4 max-w-prose text-[15px] leading-relaxed text-muted-foreground">{p}</p>
              ))}
            </section>
          ))}
        </div>
        <aside className="h-fit rounded-xl border bg-surface p-6 lg:sticky lg:top-24">
          <Mail className="size-6 text-primary" aria-hidden />
          <h2 className="mt-4 text-lg font-bold">Contact the team</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Sunday to Thursday, 9am to 6pm. Include your order number so we can help faster.
          </p>
          <a href="mailto:support@gadgetly.example" className="mt-4 inline-block font-semibold text-primary underline-offset-4 hover:underline">
            support@gadgetly.example
          </a>
        </aside>
      </div>
    </Container>
  );
}
