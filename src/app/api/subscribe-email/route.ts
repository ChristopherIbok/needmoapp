import { NextResponse } from "next/server";
import {
  subscribeToNewsletter,
  subscribeWithDoubleOptIn,
} from "@/lib/mailchimp";

export async function POST(request: Request) {
  try {
    const { email, name, doubleOptIn = false } = await request.json();

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { message: "Valid email is required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Check if Mailchimp is configured
    if (
      !process.env.MAILCHIMP_API_KEY ||
      !process.env.MAILCHIMP_SERVER_PREFIX ||
      !process.env.MAILCHIMP_AUDIENCE_ID
    ) {
      console.error("Mailchimp credentials not configured");

      // Development mode fallback
      if (process.env.NODE_ENV === "development") {
        console.log("DEV MODE: New subscriber:", { email, name });
        return NextResponse.json(
          { message: "Successfully subscribed! (Development mode)" },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { message: "Newsletter service is temporarily unavailable" },
        { status: 503 }
      );
    }

    // Subscribe to Mailchimp
    const result = doubleOptIn
      ? await subscribeWithDoubleOptIn(email, name)
      : await subscribeToNewsletter(email, name);

    if (!result.success) {
      return NextResponse.json({ message: result.message }, { status: 400 });
    }

    return NextResponse.json({ message: result.message }, { status: 200 });
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}

// Optional: Get subscriber count
export async function GET() {
  try {
    if (
      !process.env.MAILCHIMP_API_KEY ||
      !process.env.MAILCHIMP_SERVER_PREFIX ||
      !process.env.MAILCHIMP_AUDIENCE_ID
    ) {
      return NextResponse.json(
        { error: "Mailchimp not configured" },
        { status: 500 }
      );
    }

    const mailchimp = (await import("@mailchimp/mailchimp_marketing")).default;
    mailchimp.setConfig({
      apiKey: process.env.MAILCHIMP_API_KEY,
      server: process.env.MAILCHIMP_SERVER_PREFIX,
    });

    const response = await mailchimp.lists.getList(
      process.env.MAILCHIMP_AUDIENCE_ID
    );

    return NextResponse.json({
      totalSubscribers: response.stats?.member_count || 0,
      listName: response.name,
    });
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscriber count" },
      { status: 500 }
    );
  }
}
