import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const WEBHOOK_URL = "https://hook.us1.make.com/mgcx3x11myi6ypi7ij3k74of671qqnhw";

const leadSchema = z
  .object({
    name: z.string().min(1),
    company: z.string().min(1),
    phone: z.string().min(1),
    email: z.string().email(),
    instagram: z.string().optional(),
    evaluation: z.string().min(1),
    revenue: z.string().min(1),
    page_url: z.string().optional(),
    referrer: z.string().optional(),
  })
  // Aceita qualquer parâmetro extra da URL (utm_*, gclid, fbclid, etc.)
  .catchall(z.string());



export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    const now = new Date();
    const tz = "America/Sao_Paulo";
    const parts = new Intl.DateTimeFormat("pt-BR", {
      timeZone: tz,
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).formatToParts(now);
    const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
    const date = `${get("day")}/${get("month")}/${get("year")}`;
    const time = `${get("hour")}:${get("minute")}:${get("second")}`;

    const payload = {
      ...data,
      date,
      time,
      datetime: `${date} ${time}`,
      timezone: tz,
      submitted_at: now.toISOString(),
    };

    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Webhook returned ${response.status}`);
    }

    return { ok: true };
  });
