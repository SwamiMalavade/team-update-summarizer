import { Request, Response } from "express";
import cohereService, { TeamUpdate } from "../services/cohere.service";

export const generateSummary = async (req: Request, res: Response) => {
  try {
    const { updates } = req.body;

    // Validation
    if (!updates || !Array.isArray(updates)) {
      return res.status(400).json({
        error: "Invalid input. Expected an array of updates.",
      });
    }

    if (updates.length < 3) {
      return res.status(400).json({
        error: "At least 3 team members' updates are required.",
      });
    }

    // Validate each update has required fields
    for (let i = 0; i < updates.length; i++) {
      const update = updates[i];
      if (!update.name || typeof update.name !== "string") {
        return res.status(400).json({
          error: `Update ${i + 1} is missing a valid name.`,
        });
      }
      if (!update.update || typeof update.update !== "string") {
        return res.status(400).json({
          error: `Update ${i + 1} is missing a valid update text.`,
        });
      }
      if (update.update.trim().length < 10) {
        return res.status(400).json({
          error: `Update ${i + 1} is too short. Please provide more details.`,
        });
      }
    }

    // Generate summary using Cohere
    const summary = await cohereService.summarizeTeamUpdates(
      updates as TeamUpdate[]
    );

    res.json({
      success: true,
      report: summary,
      metadata: {
        teamSize: updates.length,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error("Summary generation error:", error);
    res.status(500).json({
      error: error.message || "Failed to generate summary",
    });
  }
};
