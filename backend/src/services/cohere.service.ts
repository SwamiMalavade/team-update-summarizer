import { CohereClient } from "cohere-ai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY || "",
});

export interface TeamUpdate {
  name: string;
  update: string;
}

export interface SummaryReport {
  blockers: string[];
  wins: string[];
  goals: string[];
  summary: string;
}

export class CohereService {
  async summarizeTeamUpdates(updates: TeamUpdate[]): Promise<SummaryReport> {
    try {
      if (updates.length < 3) {
        throw new Error("At least 3 team members' updates are required");
      }

      // Format updates for the prompt
      const formattedUpdates = updates
        .map(
          (update, index) =>
            `Team Member ${index + 1} - ${update.name}:\n${update.update}`
        )
        .join("\n\n");
      const prompt = `You are a team lead assistant. Below are daily updates from ${updates.length} team members. Analyze these updates and extract the key information.

${formattedUpdates}

Based on these updates, provide a structured summary in the following JSON format:
{
  "blockers": ["list of all blockers/obstacles/issues mentioned"],
  "wins": ["list of all accomplishments/completed tasks/successes"],
  "goals": ["list of all planned tasks/goals/upcoming work"],
  "summary": "A brief 2-3 sentence overall team summary"
}

Rules:
- Extract specific, actionable items
- Group similar items together
- Use clear, concise language
- If a category has no items, use an empty array []
- Return ONLY the JSON object, no other text`;

      const response = await cohere.chat({
        message: prompt,
        model: process.env.COHERE_MODEL || "command-a-03-2025",
        temperature: 0.3,
      });

      const responseText = response.text;

      // Extract JSON from response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      const jsonText = jsonMatch ? jsonMatch[0] : "{}";

      const parsed = JSON.parse(jsonText);

      // Validate and sanitize response
      const report: SummaryReport = {
        blockers: Array.isArray(parsed.blockers) ? parsed.blockers : [],
        wins: Array.isArray(parsed.wins) ? parsed.wins : [],
        goals: Array.isArray(parsed.goals) ? parsed.goals : [],
        summary:
          typeof parsed.summary === "string"
            ? parsed.summary
            : "Team updates processed successfully.",
      };

      return report;
    } catch (error) {
      console.error("Cohere API error:", error);
      throw new Error(
        "Failed to generate summary. Please check your Cohere API key and try again."
      );
    }
  }
}

export default new CohereService();
