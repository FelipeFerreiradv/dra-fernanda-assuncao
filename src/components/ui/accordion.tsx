"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn("border-b border-ink/10", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "group flex flex-1 items-start justify-between gap-6 py-7 text-left",
          "font-display text-xl font-medium text-ink transition-colors duration-300 md:text-2xl",
          "hover:text-gold-deep data-[state=open]:text-gold-deep",
          className
        )}
        {...props}
      >
        {children}
        <span
          aria-hidden
          className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold-dark transition-all duration-500 ease-out-expo group-hover:border-gold group-data-[state=open]:rotate-45 group-data-[state=open]:bg-gold group-data-[state=open]:text-ivory"
        >
          <Plus className="size-4" strokeWidth={1.5} />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div
        className={cn(
          "max-w-2xl pb-8 text-[0.9375rem] leading-relaxed text-slate",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
