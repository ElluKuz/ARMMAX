import Database from "better-sqlite3";

const db = new Database("data/leads.db", { verbose: console.log });

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;

if (!TELEGRAM_BOT_TOKEN) {
  console.warn("⚠️ TELEGRAM_BOT_TOKEN is not set");
}

const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

export interface LeadPayload {
  id: number;
  name: string | null;
  phone: string;
  details: string | null;
  page: string | null;
  source: string | null;
  createdAt: Date;
  attachmentUrl?: string | null;
}

async function getTelegramSubscribers() {
  const stmt = db.prepare(
    "SELECT name, telegram_id FROM telegram_subscribers"
  );
  const rows = stmt.all();
  return rows as { name: string | null; telegram_id: number }[];
}

function formatLeadMessage(lead: LeadPayload): string {
  const created = lead.createdAt.toLocaleString("ru-RU", {
    timeZone: "America/Los_Angeles",
    hour12: false,
  });

  return [
    "📝 *Новая заявка с сайта ARMMAX*",
    "",
    `👤 Клиент: ${lead.name?.trim() || "не указал имя"}`,
    `📞 Телефон: ${lead.phone}`,
    "",
    lead.details
      ? `📋 Описание проекта:\n${lead.details}`
      : "📋 Описание проекта: не заполнено",
    "",
    lead.attachmentUrl
      ? `📎 Вложение: ${lead.attachmentUrl}`
      : "📎 Вложение: нет файла",
    "",
    lead.page ? `🌐 Страница: ${lead.page}` : "",
    lead.source ? `🔘 Кнопка/источник: ${lead.source}` : "",
    "",
    `⏰ Время контакта: ${created}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function notifyTelegramAboutLead(lead: LeadPayload) {
  if (!TELEGRAM_BOT_TOKEN) return;

  const subscribers = await getTelegramSubscribers();
  if (!subscribers.length) {
    console.warn("Нет подписчиков в telegram_subscribers");
    return;
  }

  const text = formatLeadMessage(lead);

  // шлём всем подписчикам
  await Promise.all(
    subscribers.map(async (sub) => {
      try {
        // сначала текст
        await fetch(`${TELEGRAM_API}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: sub.telegram_id,
            text,
            parse_mode: "Markdown",
          }),
        });

        // если есть файл — можно отдельно как ссылка
        // Если attachmentUrl = прямая ссылка на картинку/файл —
        // можно использовать sendDocument или sendPhoto:
        if (lead.attachmentUrl) {
          await fetch(`${TELEGRAM_API}/sendDocument`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: sub.telegram_id,
              document: lead.attachmentUrl,
              caption: "📎 Файл из заявки",
            }),
          });
        }
      } catch (err) {
        console.error("Ошибка отправки в Telegram:", err);
      }
    }),
  );
}
