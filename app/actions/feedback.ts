"use server"

export async function submitFeedback(formData: FormData) {
  try {
    const response = await fetch("https://formsubmit.co/33adb1ba33fe6326f12587f46bf36cad", {
      method: "POST",
      body: formData,
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
