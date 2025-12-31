import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ApplicationRequest {
  name: string;
  mobile: string;
  service: string;
  subService: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, mobile, service, subService, message }: ApplicationRequest = await req.json();

    console.log("Received application:", { name, mobile, service, subService, message });

    // Format the service name nicely
    const serviceLabel = {
      loan: "Loan",
      insurance: "Insurance",
      tickets: "Tickets",
      investments: "Investments",
    }[service] || service;

    // Send notification email to Dream2Reality
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Dream2Reality <onboarding@resend.dev>",
        to: ["dreamtoreality@rediffmail.com"],
        subject: `New Application: ${serviceLabel} - ${subService}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #0A2E50; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #0A2E50; }
              .value { color: #333; margin-top: 5px; }
              .footer { background: #eee; padding: 15px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">New Application Received</h1>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Applicant Name</div>
                  <div class="value">${name}</div>
                </div>
                <div class="field">
                  <div class="label">Mobile Number</div>
                  <div class="value">+91 ${mobile}</div>
                </div>
                <div class="field">
                  <div class="label">Service Category</div>
                  <div class="value">${serviceLabel}</div>
                </div>
                <div class="field">
                  <div class="label">Sub-Category</div>
                  <div class="value">${subService}</div>
                </div>
                ${message ? `
                <div class="field">
                  <div class="label">Additional Message</div>
                  <div class="value">${message}</div>
                </div>
                ` : ""}
                <div class="field">
                  <div class="label">Submitted At</div>
                  <div class="value">${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</div>
                </div>
              </div>
              <div class="footer">
                This application was submitted through the Dream2Reality website.
              </div>
            </div>
          </body>
          </html>
        `,
      }),
    });

    const result = await emailResponse.json();
    console.log("Email sent successfully:", result);

    if (!emailResponse.ok) {
      throw new Error(result.message || "Failed to send email");
    }

    return new Response(JSON.stringify({ success: true, data: result }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-application function:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
