import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full resize-none border-b border-ink/20 bg-transparent px-0 py-3 text-[0.9375rem] text-ink",
        "placeholder:text-slate/70",
        "transition-colors duration-300",
        "focus:border-gold-dark focus:outline-none",
        "aria-[invalid=true]:border-red-700",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
