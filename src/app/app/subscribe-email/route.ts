import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { message: "Valid email is required" },
        { status: 400 }
      );
    }

    // Here you can integrate with your email service provider
    // Examples: Mailchimp, ConvertKit, SendGrid, etc.

    // Example with Mailchimp (you'll need to install @mailchimp/mailchimp_marketing)
    /*
	const mailchimp = require('@mailchimp/mailchimp_marketing');
	mailchimp.setConfig({
	  apiKey: process.env.MAILCHIMP_API_KEY,
	  server: process.env.MAILCHIMP_SERVER_PREFIX,
	});
	
	await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
	  email_address: email,
	  status: 'subscribed',
	  merge_fields: {
		FNAME: name || '',
	  },
	});
	*/

    // For now, just log and return success
    console.log("New subscriber:", {
      email,
      name,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { message: "Successfully subscribed!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json(
      { message: "Failed to subscribe. Please try again." },
      { status: 500 }
    );
  }
}
