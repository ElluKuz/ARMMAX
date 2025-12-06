// app/api/leads/route.ts
import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import path from "path";
import fs from "fs";

export const runtime = "nodejs";

type TelegramLeadPayload = {
  id: number;
  name: string;
  phone: string;
  service: string;
  details: string;
  sourcePage: string;
  preferredDate?: string | null;
  preferredTime?: string | null;
  leadType?: string | null;
  attachmentPaths: string[];
};

const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-5-mini";

async function callOpenAIWithFallback(body: any) {
  const keys = [process.env.OPENAI_API_KEY1, process.env.OPENAI_API_KEY2].filter(
    Boolean,
  ) as string[];

  if (keys.length === 0) {
    console.warn("OPENAI_API_KEY1/2 not set, skipping AI suggestion");
    return null;
  }

  for (const key of keys) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        console.error("OpenAI error status:", res.status, await res.text());
        continue;
      }

      const data = await res.json();

      // 🔍 Временный лог для отладки формата ответа
      console.dir(
        {
          openai_model: body.model,
          openai_response_preview: data,
        },
        { depth: null },
      );

      return data;
    } catch (e) {
      console.error("OpenAI request failed for one key, trying next:", e);
      continue;
    }
  }

  return null;
}

async function getLeadAiSuggestion(
  payload: TelegramLeadPayload,
): Promise<
  | {
      estimated_price_range?: string;
      confidence?: string;
      currency?: string;
      message_for_client?: string;
      follow_up_questions?: string[];
    }
  | null
> {
  const hasKeys =
    !!process.env.OPENAI_API_KEY1 || !!process.env.OPENAI_API_KEY2;
  if (!hasKeys) return null;

  const body = {
    model: OPENAI_MODEL,
    max_completion_tokens: 4000,
    // попросим сразу JSON-объект
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "You are an assistant helping a small home services company in Los Angeles and Orange County (furniture assembly, interior painting, gazebo installation, TV mounting). Your job is to estimate jobs and prepare first-contact messages in ENGLISH. Always reply ONLY with a single valid JSON object. Do NOT add any explanations, comments, or text outside the JSON.",
      },
      {
        role: "user",
        content: `
  Here is a new lead from the website (Los Angeles / Orange County suburbs):
  
  {
    "id": ${payload.id},
    "name": ${JSON.stringify(payload.name || "")},
    "phone": ${JSON.stringify(payload.phone || "")},
    "service": ${JSON.stringify(payload.service || "")},
    "details": ${JSON.stringify(payload.details || "")},
    "sourcePage": ${JSON.stringify(payload.sourcePage || "")},
    "preferredDate": ${JSON.stringify(payload.preferredDate || null)},
    "preferredTime": ${JSON.stringify(payload.preferredTime || null)},
    "leadType": ${JSON.stringify(payload.leadType || null)}
  }
  
  Tasks:
  1) Provide an approximate price range in Los Angeles / Orange County in USD for this type of job. 
     IMPORTANT: Always return a numeric range like "200–350" (in dollars). 
     Never return "need more details" or similar phrases in this field. If information is not enough, choose a wider but still realistic range and set confidence to "low".
  2) Write a short, friendly message for the client in English (2–4 sentences), as if a manager writes in WhatsApp / SMS.
  3) Write 2–3 follow-up questions in English that would help to refine the estimate.
  
  Respond ONLY as a single JSON object with the following fields and NOTHING ELSE:
  
  {
    "estimated_price_range": "a string like '200–350' in USD, always a range, never 'need more details'",
    "confidence": "low | medium | high",
    "currency": "USD",
    "message_for_client": "short friendly message to the client in English, 2–4 sentences",
    "follow_up_questions": ["question 1 in English", "question 2 in English", "question 3 in English"]
  }
        `.trim(),
      },
    ],
  };

  const data = await callOpenAIWithFallback(body);
  if (!data) return null;

  const message = data.choices?.[0]?.message;
  const content = message?.content;

  let textContent: string | null = null;

  // 1) классический вариант: content — строка
  if (typeof content === "string") {
    textContent = content;
  }
  // 2) новый формат: content — массив блоков
  else if (Array.isArray(content)) {
    for (const part of content as any[]) {
      // если вдруг строка
      if (typeof part === "string") {
        textContent = part;
        break;
      }
      // OpenAI мультимодальный формат: { type: "output_text", text: { value: "..." } }
      if (part && typeof part === "object") {
        if (typeof part.text === "string") {
          textContent = part.text;
          break;
        }
        if (part.text && typeof part.text.value === "string") {
          textContent = part.text.value;
          break;
        }
        if (typeof part.content === "string") {
          textContent = part.content;
          break;
        }
      }
    }
  }

  try {
    if (!textContent) {
      console.error("OpenAI returned empty or unsupported content:", content);
      return null;
    }

    let cleaned = textContent.trim();

    // убираем ```json ... ``` и ``` ... ```
    cleaned = cleaned
      .replace(/^```json/i, "")
      .replace(/^```/, "")
      .replace(/```$/, "")
      .trim();

    // вытаскиваем первую {...} — на случай, если модель добавила мусор
    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");

    if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
      console.error("OpenAI content does not look like JSON:", cleaned);
      return null;
    }

    const jsonSlice = cleaned.slice(firstBrace, lastBrace + 1);
    const parsed = JSON.parse(jsonSlice);
    return parsed;
  } catch (e) {
    console.error("Failed to parse OpenAI JSON:", e, textContent);
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = (formData.get("name") as string) || "";
    const phone = (formData.get("phone") as string | null)?.trim();
    const serviceRaw = (formData.get("service") as string | null) || "";
    const details = (formData.get("details") as string | null) || "";
    const source = (formData.get("source") as string | null) || "";

    const sourcePage =
      (formData.get("page") as string | null) ||
      ""; // заполняем на фронте по pathname

    const preferredDate = (formData.get("preferred_date") as string | null) || "";
    const preferredTime = (formData.get("preferred_time") as string | null) || "";
    const leadType = (formData.get("lead_type") as string | null) || "";

    if (!phone) {
      return NextResponse.json(
        { error: "Phone is required" },
        { status: 400 },
      );
    }

    // поддерживаем один файл (LeadFormModal) ИЛИ несколько (ScheduleEstimateCard)
    const singleAttachment = formData.get("attachment") as File | null;
    const multipleAttachments = formData.getAll("attachments") as File[];

    const files: File[] = [];
    if (multipleAttachments && multipleAttachments.length > 0) {
      for (const f of multipleAttachments) {
        if (f instanceof File && f.size > 0) {
          files.push(f);
        }
      }
    }
    if (files.length === 0 && singleAttachment && singleAttachment.size > 0) {
      files.push(singleAttachment);
    }

    const uploadsDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const attachmentPaths: string[] = [];

    for (const file of files) {
      const fileExt = file.name.split(".").pop();
      const fileName = `lead_${Date.now()}_${Math.random()
        .toString(36)
        .slice(2)}.${fileExt || "bin"}`;
      const filePath = path.join(uploadsDir, fileName);

      const buffer = Buffer.from(await file.arrayBuffer());
      fs.writeFileSync(filePath, buffer);

      attachmentPaths.push(filePath);
    }

    const attachmentPath = attachmentPaths[0] || null; // в БД храним первый путь (для простоты)
    const service = serviceRaw || source || "General";

    const stmt = db.prepare(
      `INSERT INTO leads (name, phone, service, details, attachment_path, source_page, preferred_date, preferred_time, lead_type)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    );
    const info = stmt.run(
      name,
      phone,
      service,
      details,
      attachmentPath,
      sourcePage,
      preferredDate,
      preferredTime,
      leadType || (preferredDate || preferredTime ? "schedule-estimate" : "lead-modal"),
    );

    const leadId = Number(info.lastInsertRowid);

    // Telegram-уведомление — не ломаем ответ, если оно упадёт
    try {
      await notifyTelegram({
        id: leadId,
        name,
        phone,
        service,
        details,
        sourcePage,
        preferredDate: preferredDate || null,
        preferredTime: preferredTime || null,
        leadType: leadType || null,
        attachmentPaths,
      });
    } catch (e) {
      console.error("Failed to notify Telegram", e);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to save lead" },
      { status: 500 },
    );
  }
}

async function notifyTelegram(payload: TelegramLeadPayload) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    console.warn("TELEGRAM_BOT_TOKEN is not set, skipping notification");
    return;
  }

  // Берём подписчиков из таблицы telegram_subscribers
  const subscribers = db
    .prepare("SELECT telegram_id, name FROM telegram_subscribers")
    .all() as { telegram_id: number; name?: string | null }[];

  const chatIds = subscribers
    .map((s) => String(s.telegram_id))
    .filter(Boolean);

  if (chatIds.length === 0) {
    console.warn(
      "No Telegram subscribers in telegram_subscribers, skipping notification",
    );
    return;
  }

  const {
    id,
    name,
    phone,
    service,
    details,
    sourcePage,
    preferredDate,
    preferredTime,
    leadType,
    attachmentPaths,
  } = payload;

  // Сначала пробуем запросить AI-подсказку
  let aiSuggestionText = "";
  try {
    const ai = await getLeadAiSuggestion(payload);
    if (ai) {
      const price = ai.estimated_price_range || "need more details";
      const confidence = ai.confidence || "unknown";
      const msg = ai.message_for_client || "";
      const questions = Array.isArray(ai.follow_up_questions)
        ? ai.follow_up_questions
        : [];

      const questionsBlock =
        questions.length > 0
          ? questions.map((q) => `• ${q}`).join("\n")
          : "";

      aiSuggestionText =
        [
          "",
          "🤖 *AI-подсказка по заявке (черновик):*",
          `Ориентировочная стоимость (USD): ${price} (уверенность: ${confidence})`,
          "",
          msg ? `Черновик сообщения клиенту:\n${msg}` : "",
          questionsBlock
            ? "\nУточняющие вопросы:\n" + questionsBlock
            : "",
        ]
          .filter(Boolean)
          .join("\n")
          .trim() || "";
    }
  } catch (e) {
    console.error("Failed to get AI suggestion for lead", e);
  }

  // локальное время контакта (Лос-Анджелес)
  const now = new Date();
  const contactTime = now.toLocaleString("ru-RU", {
    timeZone: "America/Los_Angeles",
    hour12: false,
  });

  const typeLabel =
    leadType || (preferredDate || preferredTime ? "заявка на звонок" : "форма на сайте");

  const baseLines = [
    "📝 *Новая заявка с сайта ARMMAX*",
    "",
    `🆔 ID: ${id}`,
    `🌐 Страница: ${sourcePage || "не указана"}`,
    `📂 Тип: ${typeLabel}`,
    "",
    `🔧 Услуга: ${service}`,
    `👤 Клиент: ${name || "не указал имя"}`,
    `📞 Телефон: ${phone}`,
  ];

  if (preferredDate || preferredTime) {
    baseLines.push(
      "",
      "🗓 *Предпочтительное время звонка:*",
      `Дата: ${preferredDate || "-"}, Время: ${preferredTime || "-"}`,
    );
  }

  if (details) {
    baseLines.push("", "📋 *Описание проекта:*", details);
  }

  baseLines.push("", `⏰ Время контакта: ${contactTime}`);

  if (aiSuggestionText) {
    baseLines.push("", aiSuggestionText);
  }

  const text = baseLines.join("\n");

  for (const chatId of chatIds) {
    try {
      // Основное сообщение
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "Markdown",
        }),
      });

      // Вложения (если есть)
      for (const filePath of attachmentPaths) {
        try {
          const buffer = fs.readFileSync(filePath);
          const form = new FormData();
          form.append("chat_id", chatId);
          // @ts-ignore — Blob доступен в runtime Next
          form.append("document", new Blob([buffer]), path.basename(filePath));

          await fetch(
            `https://api.telegram.org/bot${token}/sendDocument`,
            {
              method: "POST",
              body: form,
            },
          );
        } catch (e) {
          console.error("Failed to send attachment to Telegram", e);
        }
      }
    } catch (e) {
      console.error("Failed to send Telegram message", e);
    }
  }
}
