import { useEffect } from "react";

export type MiniToastVariant = "default" | "success" | "error";

export default function MiniToast({
  open,
  title,
  description,
  onClose,
  variant = "default",
  duration = 3000,
}: {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  variant?: MiniToastVariant;
  duration?: number; // ms
}) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [open, onClose, duration]);

  if (!open) return null;

  const border =
    variant === "success" ? "border-emerald-500" :
    variant === "error"   ? "border-red-500" :
                            "border-border";

  return (
    <div className="fixed top-4 right-4 z-[9999] animate-in fade-in slide-in-from-top-2">
      <div className={`rounded-lg border bg-card text-foreground shadow-lg px-4 py-3 min-w-[260px] ${border}`}>
        <div className="font-semibold">{title}</div>
        {description && <div className="text-sm text-muted-foreground mt-1">{description}</div>}
      </div>
    </div>
  );
}
