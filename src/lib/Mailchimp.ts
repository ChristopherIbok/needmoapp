import mailchimp from "@mailchimp/mailchimp_marketing";

// Initialize Mailchimp
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

export interface SubscribeResult {
  success: boolean;
  message: string;
  data?: any;
}

export async function subscribeToNewsletter(
  email: string,
  name: string
): Promise<SubscribeResult> {
  try {
    // Validate credentials
    if (
      !process.env.MAILCHIMP_API_KEY ||
      !process.env.MAILCHIMP_SERVER_PREFIX ||
      !process.env.MAILCHIMP_AUDIENCE_ID
    ) {
      throw new Error("Mailchimp credentials not configured");
    }

    // Split name into first and last
    const nameParts = name ? name.trim().split(" ") : [];
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    // Add subscriber to Mailchimp
    const response = await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID,
      {
        email_address: email,
        status: "subscribed", // Use 'pending' for double opt-in
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      }
    );

    return {
      success: true,
      message: "Successfully subscribed to newsletter!",
      data: response,
    };
  } catch (error: any) {
    console.error("Mailchimp subscription error:", error);

    // Handle specific Mailchimp errors
    if (error.status === 400) {
      // Check for "Member Exists" error
      if (error.response?.body?.title === "Member Exists") {
        return {
          success: false,
          message: "This email is already subscribed to our newsletter!",
        };
      }

      // Check for validation errors
      if (error.response?.body?.errors) {
        const emailError = error.response.body.errors.find(
          (e: any) => e.field === "email_address"
        );
        if (emailError) {
          return {
            success: false,
            message: "Please enter a valid email address.",
          };
        }
      }
    }

    return {
      success: false,
      message: "Failed to subscribe. Please try again later.",
    };
  }
}

// Optional: Double opt-in version (recommended for better deliverability)
export async function subscribeWithDoubleOptIn(
  email: string,
  name: string
): Promise<SubscribeResult> {
  try {
    if (
      !process.env.MAILCHIMP_API_KEY ||
      !process.env.MAILCHIMP_SERVER_PREFIX ||
      !process.env.MAILCHIMP_AUDIENCE_ID
    ) {
      throw new Error("Mailchimp credentials not configured");
    }

    const nameParts = name ? name.trim().split(" ") : [];
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    // Add with 'pending' status for double opt-in
    const response = await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID,
      {
        email_address: email,
        status: "pending", // This sends a confirmation email
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      }
    );

    return {
      success: true,
      message: "Please check your email to confirm your subscription!",
      data: response,
    };
  } catch (error: any) {
    console.error("Mailchimp subscription error:", error);

    if (
      error.status === 400 &&
      error.response?.body?.title === "Member Exists"
    ) {
      return {
        success: false,
        message: "This email is already subscribed to our newsletter!",
      };
    }

    return {
      success: false,
      message: "Failed to subscribe. Please try again later.",
    };
  }
}
