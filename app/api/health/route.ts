export async function GET() {
  const env = {
    hasAiGateway: !!process.env.VERCEL_AI_GATEWAY,
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
  }
  
  console.log("[v0] Health check - AI Gateway status:", env)
  
  return Response.json({
    status: "ok",
    message: "Chat API is running",
    environment: env
  })
}
