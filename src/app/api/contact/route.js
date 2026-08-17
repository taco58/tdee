import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request) {
  try {
    const { name, email, message, website } = await request.json();

    if (website) {
      return NextResponse.json({ success: true });
    }

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Please fill in all fields (Name, Email, and Message)." },
        { status: 400 }
      );
    }

    if (name.length > 200) {
      return NextResponse.json({ error: "Name is too long." }, { status: 400 });
    }
    if (message.length > 1000) {
      return NextResponse.json({ error: "Message is too long (max 1000 characters)." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.RECIPIENT_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `New Contact Message from ${name}`,
      text: `From: ${name} (${email})\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json({ error: error.message || "Failed to send email." }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
