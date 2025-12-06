// components/LeadFormModal.tsx
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";

interface LeadFormModalProps {
  triggerLabel: string;
  service: string;
  variant?: "primary" | "outline";
}

export function LeadFormModal({
  triggerLabel,
  service,
  variant = "primary",
}: LeadFormModalProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  // чтобы портал не ломался на сервере
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // лёгкий lock скролла, пока модалка открыта
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const fd = new FormData(form);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        body: fd,
      });
      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      form.reset();
    } catch (e) {
      console.error(e);
      setStatus("error");
    }
  }

  const pathname = usePathname();

  function resolvePageLabel(path: string | null): string {
    if (!path || path === "/") return "Home";
    switch (path) {
      case "/painting":
        return "Interior Painting";
      case "/furniture-assembly":
        return "Furniture Assembly";
      case "/gazebo-installation":
        return "Gazebo Installation";
      case "/handyman-services":
        return "TV & Art Mounting";
      default:
        return path;
    }
  }

  const pageLabel = resolvePageLabel(pathname);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          variant === "primary"
            ? "rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-slate-950 shadow-sm hover:bg-sky-400"
            : "rounded-full border border-sky-500 px-5 py-2 text-sm font-semibold text-sky-100 hover:bg-sky-500/10"
        }
      >
        {triggerLabel}
      </button>

      {open &&
        mounted &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm px-4 py-8">
            <div className="w-full max-w-md rounded-2xl bg-slate-900 p-6 shadow-xl border border-slate-700">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-lg font-semibold">
                  {triggerLabel} – {service}
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setStatus("idle");
                  }}
                  className="text-slate-400 hover:text-slate-100"
                >
                  ✕
                </button>
              </div>

              <form
                className="mt-4 space-y-4"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <input type="hidden" name="service" value={service} />
                <input type="hidden" name="source" value={triggerLabel} />
                <input type="hidden" name="page" value={pageLabel} />

                <div>
                  <label className="block text-sm font-medium text-slate-200">
                    Name (optional)
                  </label>
                  <input
                    className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-500"
                    name="name"
                    type="text"
                    placeholder="How should we call you?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200">
                    Phone number *
                  </label>
                  <input
                    className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-500"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+1 (___) ___-____"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200">
                    Project details
                  </label>
                  <textarea
                    className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-500"
                    name="details"
                    rows={4}
                    placeholder="Tell us what you need painted, installed or repaired."
                  />
                  <p className="mt-1 text-xs text-slate-400">
                    On mobile you can also attach a short voice note using the
                    microphone option below.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200">
                    Photo / voice (optional)
                  </label>
                  <input
                    className="mt-1 block w-full text-sm text-slate-200 file:mr-4 file:rounded-full file:border-0 file:bg-sky-500 file:px-4 file:py-1.5 file:text-sm file:font-semibold file:text-slate-950 hover:file:bg-sky-400"
                    type="file"
                    name="attachment"
                    accept="image/*,audio/*"
                    // на мобильных часто позволяет записать сразу
                    capture="environment"
                  />
                </div>

                <div className="flex items-center justify-between gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-slate-950 shadow-sm hover:bg-sky-400 disabled:opacity-60"
                  >
                    {status === "loading" ? "Sending…" : "Send request"}
                  </button>
                  {status === "success" && (
                    <p className="text-xs text-emerald-400">
                      Thank you! We’ll call you soon.
                    </p>
                  )}
                  {status === "error" && (
                    <p className="text-xs text-rose-400">
                      Something went wrong. Please try again.
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
