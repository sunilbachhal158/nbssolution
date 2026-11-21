NBS SOLUTION - CLOUDFLARE WORKER FORM BACKEND

IMPORTANT: The frontend is connected to this Worker, but email sending will NOT work until you configure a Resend API key and verify your sending domain.

1) Create a free account at https://resend.com/
2) In Resend, add and verify nbssolution.in. Add the DNS records Resend gives you in Cloudflare DNS. Do not guess these records.
3) Create a Resend API key. Keep it private. Never put it in HTML/JavaScript.
4) Install Node.js, then install Wrangler: npm install -g wrangler
5) Open terminal in this cloudflare-worker folder and run: wrangler login
6) Add secret: wrangler secret put RESEND_API_KEY  (paste the Resend API key when prompted)
7) Deploy: wrangler deploy
8) Copy the deployed Worker URL, e.g. https://nbs-solution-forms.<your-subdomain>.workers.dev
9) Open assets/js/cloudflare-forms.js in the website and replace PASTE_YOUR_CLOUDFLARE_WORKER_URL_HERE with that exact URL.
10) Re-upload/redeploy the website to Cloudflare Pages.

Recipient email is configured as: sunilbachhal158@gmail.com
Sender: website@nbssolution.in (works only after nbssolution.in is verified in Resend).

The Worker accepts POST JSON and sends contact enquiries using Resend. Existing page design/CSS is unchanged. Contact forms with id=contact-form across the HTML pages are wired. Newsletter subscription forms are not included in this contact-enquiry handler.

SECURITY NOTE: API key belongs only in the Worker secret. Do not share it in chat or add it to frontend files. For production, restrict Access-Control-Allow-Origin in src/index.js to your exact website domain(s).
