'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ChevronDown } from 'lucide-react';

const faqData = [
  {
    category: 'General',
    questions: [
      {
        q: 'What is WeRent?',
        a: 'WeRent is a premium rental platform where you can find high-quality products for rent, from fashion and electronics to home equipment. We make luxury and necessity affordable and sustainable.',
      },
      {
        q: 'How do I create an account?',
        a: 'Click on the "Login" button at the top right corner and select "Register". Fill in your details, verify your email, and you are ready to start renting!',
      },
    ],
  },
  {
    category: 'Rental Process',
    questions: [
      {
        q: 'How long can I rent an item for?',
        a: 'Rental periods typically range from 3 days to 30 days. You can select your preferred duration on the product page before adding it to your cart.',
      },
      {
        q: 'Can I extend my rental period?',
        a: 'Yes, if the item is not booked by another user, you can extend your rental through your dashboard. Additional charges will apply based on the extended duration.',
      },
      {
        q: 'Is there a security deposit?',
        a: 'Some high-value items may require a refundable security deposit. This amount is clearly stated on the product page and will be refunded within 3-5 business days after the item is returned in good condition.',
      },
    ],
  },
  {
    category: 'Shipping & Returns',
    questions: [
      {
        q: 'How does delivery work?',
        a: 'We offer door-to-door delivery. Once your order is confirmed, our logistics partner will deliver the item to your specified address. You will receive a tracking link via email.',
      },
      {
        q: 'How do I return the item?',
        a: 'On the last day of your rental, please pack the item back into its original packaging. Our courier will contact you for pickup, or you can drop it off at a designated point depending on your location.',
      },
      {
        q: 'What if I damage an item?',
        a: 'We understand accidents happen. Minor wear and tear is expected. However, for significant damage, repair costs will be deducted from your deposit or charged to your account. We recommend checking our "Damage Policy" for more details.',
      },
    ],
  },
  {
    category: 'Payments',
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards, debit cards, and various digital payment methods like PayPal and local bank transfers.',
      },
      {
        q: 'Can I cancel my order?',
        a: 'Cancellations are free if made at least 48 hours before the rental start date. Late cancellations may incur a small fee.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-muted-foreground text-lg">
          Everything you need to know about renting with WeRent.
        </p>
      </div>

      <div className="space-y-8">
        {faqData.map((section, idx) => (
          <section key={idx} className="space-y-4">
            <h2 className="text-2xl font-semibold border-b pb-2">
              {section.category}
            </h2>
            <div className="grid gap-4">
              {section.questions.map((item, qIdx) => (
                <details
                  key={qIdx}
                  className="group bg-card rounded-xl border border-foreground/10 overflow-hidden [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                    <h3 className="text-lg font-medium pr-4">{item.q}</h3>
                    <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <div className="p-4 pt-0 text-muted-foreground leading-relaxed">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>

      <Card className="mt-16 bg-primary/5 border-primary/10">
        <CardHeader className="text-center">
          <CardTitle>Still have questions?</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-6">
            Can&apos;t find the answer you&apos;re looking for? Please chat with
            our friendly team.
          </p>
          <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
            Contact Support
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
