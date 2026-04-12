# Palantir Integration Setup Guide

## Environment Variables

Your application requires three Palantir environment variables to connect to the Palantir Ontology Agent:

### 1. `PALANTIR_URL`
**Purpose:** Base URL of your Palantir Foundry instance  
**Example:** `https://your-foundry-instance.palantirfoundry.com`  
**Where to find:** Your Palantir administrator or console dashboard

### 2. `PALANTIR_TOKEN`
**Purpose:** OAuth bearer token or API token for authentication  
**Format:** Long alphanumeric string  
**Where to find:** 
- Palantir Console → Settings → API Tokens
- Or generated via your Palantir OAuth flow
**Security:** Never commit this to version control. Use Vercel Environment Variables.

### 3. `PALANTIR_AGENT_RID`
**Purpose:** Resource ID of the AIP Agent handling intervention planning  
**Format:** Typically starts with `ri.aip.` or `ri.agent.`  
**Example:** `ri.aip.main.agent-resource.xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`  
**Where to find:** Palantir Console → AIP Agents → Copy RID from your agent details

## Verifying Configuration

### Step 1: Add to Vercel
Go to your Vercel project → **Settings → Environment Variables** and add:
- `PALANTIR_URL`
- `PALANTIR_TOKEN`
- `PALANTIR_AGENT_RID`

### Step 2: Test Connectivity
Deploy to production and test the chatbot:
1. Open the chat interface
2. Ask a city planning question: e.g., "What if we add 5 cooling centers to District 7?"
3. Wait for a response

### Step 3: Check Logs
If integration fails, check Vercel logs for error messages:
- Vercel Dashboard → Deployments → Logs
- Look for `[v0] Palantir` log entries indicating connection status

## How It Works

### Chat API (`/api/chat`)
- **Mode:** Always uses Claude via Vercel AI Gateway (no Palantir dependency)
- **Purpose:** General city planning questions and analysis
- **Fallback:** Works even if Palantir is offline

### Plan API (`/api/plan`)
- **Mode:** Tries Palantir first; falls back to realistic mock if unavailable
- **When triggered:** User clicks "Generate Plan" in the Intervention Plan section
- **Timeout:** 45 seconds
- **Fallback:** Generates a phased intervention roadmap with cost estimates

### History API (`/api/history`)
- **Mode:** Tries Palantir first; falls back to realistic mock if unavailable
- **When triggered:** On page load and every 10 seconds
- **Timeout:** 15 seconds
- **Fallback:** Shows 8 simulated city risk scenarios

## Error Handling

### If Palantir is Offline or Misconfigured
Success: The app continues to work with mock data
Success: Users can still chat, ask questions, and generate plans
Success: Real Palantir data is used when available

### Common Errors and Solutions

- "Unable to connect to AI service" → Vercel AI Gateway misconfigured. Ensure Claude model is accessible via Vercel AI Gateway
- `403 Unauthorized` on Palantir calls → Invalid `PALANTIR_TOKEN`. Regenerate token in Palantir Console
- `404 Not Found` on Palantir calls → Wrong `PALANTIR_URL` or `PALANTIR_AGENT_RID`. Verify URLs and RIDs in Palantir Console
- Request timeout (45s) → Palantir service slow or unresponsive. Fallback to mock data will be used automatically
- Empty simulation history feed → Palantir has no `CDT_SimulationRun` objects. Check Palantir data model; mock data will display

## Testing Without Palantir

To test locally or in development:
1. Don't set the three Palantir env vars — leave them blank
2. The app will use realistic mock data for plans and history
3. Chat still works (uses Vercel AI Gateway)
4. Perfect for UI testing and development

## Production Checklist

- PALANTIR_URL is set in Vercel Environment Variables
- PALANTIR_TOKEN is set and valid (recently regenerated if old)
- PALANTIR_AGENT_RID matches your Palantir agent's actual RID
- Test the plan generation feature (click "Generate Plan" after a chat)
- Check logs for [v0] Calling Palantir or [v0] Palantir history messages
- Verify fallback works: Chat should always respond, even if Palantir is down
