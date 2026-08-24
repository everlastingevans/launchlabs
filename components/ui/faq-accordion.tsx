"use client";

import { useState } from "react";
import type { FaqItem } from "@/types/site";

export function FAQAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="divide-y divide-line rounded-md border border-line bg-white shadow-card">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              className="focus-ring flex w-full items-center justify-between gap-4 rounded-md px-5 py-5 text-left"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? -1 : index)}
            >
              <span className="font-semibold text-navy">{item.question}</span>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-offwhite text-navy" aria-hidden="true">
                {open ? "-" : "+"}
              </span>
            </button>
            {open ? <p className="px-5 pb-5 text-sm leading-7 text-slate">{item.answer}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
