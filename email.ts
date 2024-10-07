const sendTo = Deno.env.get("SEND_TO");
const resendApiKey = Deno.env.get("RESEND_API_KEY");
const from = Deno.env.get("SEND_FROM");

export async function sendEmailNotification() {
  if (!resendApiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }

  if (!sendTo) {
    throw new Error("SEND_TO is not set");
  }

  if (!from) {
    throw new Error("SEND_FROM is not set");
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${resendApiKey}`
    },
    body: JSON.stringify({
      from: from,
      to: getRecipients(sendTo),
      subject: '#1 BRABUS ist verfügbar',
      html: '<strong>Der #1 BRABUS ist verfügbar!</strong>',
    })
  });

  if (!res.ok) {
    throw new Error(`Failed to send email: ${await res.text()}`);
  }
}

function getRecipients(value: string): string[] {
  return value.split(',').map((item) => {item.trim()})
}