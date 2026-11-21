const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
    if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
    try {
      const data = await request.json();
      const name = String(data.name || "").trim().slice(0, 120);
      const email = String(data.email || "").trim().slice(0, 200);
      const phone = String(data.phone || "").trim().slice(0, 60);
      const message = String(data.message || "").trim().slice(0, 5000);
      const website = String(data.website || data.website_link || "").trim().slice(0, 500);
      if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return json({ error: "Please provide a valid name, email and message." }, 400);
      }
      if (!env.RESEND_API_KEY) return json({ error: "Email service is not configured yet." }, 500);
      const body = [
        "New website enquiry - NBS Solution", "",
        `Name: ${name}`, `Email: ${email}`, `Phone: ${phone || "Not provided"}`,
        `Website: ${website || "Not provided"}`, "", "Message:", message
      ].join("\n");
      const mail = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Authorization": `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: env.MAIL_FROM || "NBS Solution Website <onboarding@resend.dev>",
          to: [env.LEAD_EMAIL || "sunilbachhal158@gmail.com"],
          reply_to: email,
          subject: `New enquiry from ${name}`,
          text: body
        })
      });
      if (!mail.ok) { const detail = await mail.text(); console.error("Resend error", detail); return json({ error: "Email delivery failed. Please check the email service configuration." }, 502); }
      return json({ success: true, message: "Enquiry sent successfully." }, 200);
    } catch (error) { console.error(error); return json({ error: "Invalid request." }, 400); }
  }
};
function json(data, status) { return new Response(JSON.stringify(data), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } }); }
