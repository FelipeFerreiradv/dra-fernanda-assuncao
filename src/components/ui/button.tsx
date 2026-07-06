import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden",
    "text-[0.8125rem] font-medium tracking-wide-plus uppercase",
    "transition-all duration-500 ease-out-expo",
    "disabled:pointer-events-none disabled:opacity-50",
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-dark",
    "[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-500",
  ],
  {
    variants: {
      variant: {
        /** Sólido escuro com brilho dourado no hover — CTA principal. */
        primary: [
          "bg-ink text-ivory",
          "before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-gold-dark before:to-gold before:transition-transform before:duration-700 before:ease-out-expo",
          "hover:before:translate-x-0 hover:text-ink",
          "[&>*]:relative [&>*]:z-10",
          "hover:[&_svg]:translate-x-1",
        ],
        /** Contorno fino dourado — CTA secundário. */
        outline: [
          "border border-gold/60 bg-transparent text-ink",
          "hover:border-gold hover:bg-gold/10",
          "hover:[&_svg]:translate-x-1",
        ],
        /** Sólido dourado — para fundos escuros. */
        gold: [
          "bg-gold text-ink",
          "before:absolute before:inset-0 before:-translate-x-full before:bg-sand before:transition-transform before:duration-700 before:ease-out-expo",
          "hover:before:translate-x-0",
          "[&>*]:relative [&>*]:z-10",
          "hover:[&_svg]:translate-x-1",
        ],
        /** Apenas texto com sublinhado animado. */
        link: [
          "px-0 py-1 normal-case tracking-normal text-[0.9375rem] text-gold-deep",
          "after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-gold-deep after:transition-transform after:duration-500 after:ease-out-expo",
          "hover:after:origin-left hover:after:scale-x-100",
        ],
      },
      size: {
        default: "h-13 px-8",
        lg: "h-15 px-10 text-sm",
        sm: "h-11 px-6",
        none: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}

export { Button, buttonVariants };
