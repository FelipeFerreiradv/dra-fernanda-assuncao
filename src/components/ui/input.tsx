import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "h-13 w-full border-b border-ink/20 bg-transparent px-0 py-3 text-[0.9375rem] text-ink",
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

export { Input };
