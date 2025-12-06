// components/blocks/ScheduleEstimateCard.tsx
"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
const TIME_SLOTS = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"];

type Step = 1 | 2;

function startOfToday() {
  const t = new Date();
  return new Date(t.getFullYear(), t.getMonth(), t.getDate());
}

export function ScheduleEstimateCard() {
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

  function resolveServiceLabel(path: string | null): string {
    if (!path || path === "/") return "Free estimate call (general)";
    switch (path) {
      case "/painting":
        return "Free estimate call – painting";
      case "/furniture-assembly":
        return "Free estimate call – furniture assembly";
      case "/gazebo-installation":
        return "Free estimate call – gazebo installation";
      case "/handyman-services":
        return "Free estimate call – TV & art mounting";
      default:
        return "Free estimate call";
    }
  }

  const pageLabel = resolvePageLabel(pathname);
  const serviceLabel = resolveServiceLabel(pathname);
  const today = startOfToday();

  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<Step>(1);

  const firstSelectableMonth = useMemo(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
    [today],
  );

  const monthLabel = currentMonth.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const weeks = useMemo(() => buildCalendar(currentMonth), [currentMonth]);

  function isPastDate(date: Date) {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return d < today;
  }

  function goPrevMonth() {
    const prev = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1,
      1,
    );
    if (prev < firstSelectableMonth) return;
    setCurrentMonth(prev);
    setSelectedDate(null);
    setSelectedTime(null);
    setStep(1);
  }

  function goNextMonth() {
    const next = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      1,
    );
    setCurrentMonth(next);
    setSelectedDate(null);
    setSelectedTime(null);
    setStep(1);
  }

  function handleDayClick(day: Date) {
    if (isPastDate(day)) return;
    setSelectedDate(day);
    setSelectedTime(null);
    setStep(1);
  }

  function handleTimeClick(slot: string) {
    if (!selectedDate) return;
    setSelectedTime(slot);
    setStep(2);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!selectedDate || !selectedTime) {
      alert("Please select date and time first.");
      return;
    }

    const form = e.currentTarget;
    const fd = new FormData(form);

    // маппим поля формы под API /api/leads
    const firstName = fd.get("firstName") as string | null;
    const phone = fd.get("phone") as string | null;
    const details = fd.get("details") as string | null;

    if (!phone) {
      alert("Phone is required.");
      return;
    }

    const preferredDate = selectedDate.toISOString().slice(0, 10);
    const preferredTime = selectedTime;

    // очищаем и заполняем FormData так, как ждёт API
    const sendFd = new FormData();
    if (firstName) sendFd.set("name", firstName);
    sendFd.set("phone", phone);
    if (details) sendFd.set("details", details);

    sendFd.set("service", serviceLabel);
    sendFd.set("source", "Schedule free estimate");
    sendFd.set("page", pageLabel);
    sendFd.set("preferred_date", preferredDate);
    sendFd.set("preferred_time", preferredTime);
    sendFd.set("lead_type", "schedule-estimate");

    const files = form.elements.namedItem("attachments") as HTMLInputElement | null;
    if (files && files.files) {
      Array.from(files.files).forEach((file) => {
        sendFd.append("attachments", file);
      });
    }

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        body: sendFd,
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      form.reset();
      alert("We received your request and will contact you shortly.");
    } catch (err) {
      console.error(err);
      alert("Something went wrong while sending your request. Please try again.");
    }
  }

  return (
    <div className="grid items-start gap-8 lg:grid-cols-3">
      {/* ЛЕВЫЙ СТОЛБЕЦ: только заголовок - теперь занимает 1/3 */}
      <div className="space-y-3 md:space-y-4 lg:col-span-1">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
          A quick call that <span className="text-sky-500">saves you</span> hours of <span className="text-sky-500">guessing</span>
        </h2>
      </div>

      {/* ПРАВЫЙ СТОЛБЕЦ: календарь, текст и форма - теперь занимает 2/3 */}
      <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:space-y-6 md:p-5 lg:col-span-2">
        {/* Заголовок секции / шаги + объясняющий текст */}
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">
              {step === 1 ? "Select date & time" : "Tell us about your project"}
            </p>
            <h3 className="text-lg font-semibold text-slate-900 md:text-xl">
              {step === 1
                ? "First choose a day, then tap a time slot."
                : "We'll confirm your estimate shortly."}
            </h3>
            {/* Перенесённый текст про выбор даты/времени */}
            <p className="text-xs leading-relaxed text-slate-600 md:text-sm max-w-md">
              Pick a convenient day and time and we'll walk through your
              project, answer questions and give a clear estimate — no pressure,
              just honest advice and options that fit your budget.
            </p>
          </div>

          {selectedDate && selectedTime && (
            <div className="mt-1 text-sm text-slate-500 md:mt-0 md:text-right">
              <span className="font-semibold text-slate-900">
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </span>{" "}
              ·{" "}
              <span className="font-semibold text-slate-900">
                {selectedTime}
              </span>
            </div>
          )}
        </div>

        {/* Шаг 1: календарь + слоты времени */}
        {step === 1 && (
          <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50/70 p-3 md:p-4">
            {/* ИЗМЕНЕНО: используем md брейкпоинт для бокового расположения */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-[1.8fr,1fr]">
              {/* календарь */}
              <div className="min-w-0">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                    {monthLabel}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={goPrevMonth}
                      disabled={
                        new Date(
                          currentMonth.getFullYear(),
                          currentMonth.getMonth(),
                          1,
                        ) <= firstSelectableMonth
                      }
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 text-xs text-slate-600 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Previous month"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={goNextMonth}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 text-xs text-slate-600 hover:bg-slate-100"
                      aria-label="Next month"
                    >
                      ›
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1 text-[10px] font-medium text-slate-400">
                  {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
                    <div key={d} className="flex h-6 items-center justify-center">
                      {d}
                    </div>
                  ))}
                </div>

                <div className="mt-1 grid grid-cols-7 gap-1 text-sm">
                  {weeks.map((week, wi) =>
                    week.map((day, di) => {
                      if (!day) {
                        return (
                          <div key={`${wi}-${di}`} className="h-8" />
                        );
                      }

                      const disabled = isPastDate(day);
                      const isSelected =
                        selectedDate &&
                        day.getFullYear() === selectedDate.getFullYear() &&
                        day.getMonth() === selectedDate.getMonth() &&
                        day.getDate() === selectedDate.getDate();

                      return (
                        <button
                          key={`${wi}-${di}`}
                          type="button"
                          disabled={disabled}
                          onClick={() => handleDayClick(day)}
                          className={[
                            "flex h-8 items-center justify-center rounded-full text-xs transition",
                            disabled
                              ? "cursor-not-allowed text-slate-300"
                              : "text-slate-700 hover:bg-slate-100",
                            isSelected &&
                              "!bg-slate-900 text-white hover:bg-slate-900",
                          ].join(" ")}
                        >
                          {day.getDate()}
                        </button>
                      );
                    }),
                  )}
                </div>
              </div>

              {/* тайм-слоты */}
              <div className="space-y-3">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Time slots
                </p>
                <div className="space-y-2">
                  {TIME_SLOTS.map((slot) => {
                    const selected = selectedTime === slot;
                    const disabled = !selectedDate;
                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={disabled}
                        onClick={() => handleTimeClick(slot)}
                        className={[
                          "w-full rounded-lg border px-3 py-2 text-left text-sm transition",
                          disabled &&
                            "cursor-not-allowed border-slate-200 text-slate-300",
                          !disabled &&
                            "border-slate-200 text-slate-700 hover:border-slate-400 hover:bg-white",
                          selected &&
                            "!border-slate-900 !bg-slate-900 !text-white",
                        ].join(" ")}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-1 text-[10px] text-slate-500">
                  {selectedDate
                    ? selectedTime
                      ? "Time selected – you'll now see a short form below."
                      : "Pick a time slot to continue."
                    : "Pick a day in the calendar to see available time slots."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Шаг 2: мини-форма */}
        {step === 2 && (
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4 md:p-5"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  First Name *
                </label>
                <input
                  name="firstName"
                  required
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Brief description of the project *
              </label>
              <textarea
                name="details"
                required
                rows={3}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none"
                placeholder="What rooms, approx. square footage, colors, surfaces, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Photos / files (optional)
              </label>
              <input
                type="file"
                name="attachments"
                multiple
                className="mt-1 block w-full text-sm text-slate-700 file:mr-4 file:rounded-full file:border-0 file:bg-sky-500 file:px-4 file:py-1.5 file:text-sm file:font-semibold file:text-slate-950 hover:file:bg-sky-400"
              />
            </div>

            <button
              type="submit"
              className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-sky-500 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-sm hover:bg-sky-400"
            >
              Request free estimate
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

/** Календарь — массив недель по 7 ячеек */
function buildCalendar(month: Date): (Date | null)[][] {
  const year = month.getFullYear();
  const m = month.getMonth();
  const firstDay = new Date(year, m, 1);
  const firstWeekday = firstDay.getDay(); // 0 - Sun
  const daysInMonth = new Date(year, m + 1, 0).getDate();

  const cells: (Date | null)[] = [];

  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(new Date(year, m, day));
  }
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}