"use server"

export async function submitFeedback(formData: FormData) {
  try {
    // Convert FormData to JSON format that formsubmit.co expects
    const data: Record<string, string> = {}
    formData.forEach((value, key) => {
      if (typeof value === "string") {
        data[key] = value
      }
    })

    const response = await fetch("https://formsubmit.co/33adb1ba33fe6326f12587f46bf36cad", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Form submission failed with status ${response.status}`)
    }

    return { success: true, message: "Feedback submitted successfully" }
  } catch (error) {
    console.error("[v0] Feedback submission error:", error)
    return { success: false, message: "Failed to submit feedback. Please try again." }
  }
}
