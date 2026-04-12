"use server"

export async function submitFeedback(formData: FormData) {
  try {
    // Validate form data
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const feedback_type = formData.get("feedback_type") as string
    const message = formData.get("message") as string

    // Basic validation
    if (!name || !email || !message) {
      return { success: false, message: "Please fill in all required fields." }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return { success: false, message: "Please enter a valid email address." }
    }

    // Log feedback for demonstration (in production, this would be stored in a database)
    console.log("[v0] Feedback received:", { name, email, feedback_type, message })

    // Return success - the feedback has been validated and acknowledged
    return { success: true, message: "Thank you for your feedback!" }
  } catch (error) {
    console.error("[v0] Feedback validation error:", error)
    return { success: false, message: "An error occurred. Please try again." }
  }
}
