import React, { useState } from "react";
import {
  Container,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  Alert,
  CircularProgress,
  Divider,
  Chip,
  Stack,
  Fade,
  Slide,
  Zoom,
  Grow,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Send as SendIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  Flag as FlagIcon,
  AutoAwesome as AIIcon,
  TrendingUp as TrendingIcon,
} from "@mui/icons-material";
import axios from "axios";
import { styles } from "./styles";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

interface TeamUpdate {
  name: string;
  update: string;
}

interface SummaryReport {
  blockers: string[];
  wins: string[];
  goals: string[];
  summary: string;
}

const App: React.FC = () => {
  const [updates, setUpdates] = useState<TeamUpdate[]>([
    { name: "", update: "" },
    { name: "", update: "" },
    { name: "", update: "" },
  ]);
  const [report, setReport] = useState<SummaryReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddUpdate = () => {
    setUpdates([...updates, { name: "", update: "" }]);
  };

  const handleRemoveUpdate = (index: number) => {
    if (updates.length > 3) {
      const newUpdates = updates.filter((_, i) => i !== index);
      setUpdates(newUpdates);
    }
  };

  const handleUpdateChange = (
    index: number,
    field: "name" | "update",
    value: string
  ) => {
    const newUpdates = [...updates];
    newUpdates[index][field] = value;
    setUpdates(newUpdates);
  };

  const handleLoadSampleData = () => {
    setUpdates([
      {
        name: "Sarah Chen",
        update:
          "Completed the new authentication module. Had some blockers with the OAuth integration - waiting for API keys from the vendor. Planning to work on user profile settings next.",
      },
      {
        name: "Mike Johnson",
        update:
          "Successfully deployed the payment gateway to production! No issues reported so far. Blocked on database migration - need DBA approval. Will focus on refactoring the checkout flow tomorrow.",
      },
      {
        name: "Alex Rivera",
        update:
          "Finished code review for 3 PRs today. Won a performance improvement - reduced load time by 40%. Stuck on unit tests failing in CI/CD pipeline. Next up: implement the notification system.",
      },
    ]);
    setReport(null);
    setError("");
  };

  const handleGenerateSummary = async () => {
    setError("");
    setReport(null);

    const validUpdates = updates.filter(
      (u) => u.name.trim() && u.update.trim()
    );

    if (validUpdates.length < 3) {
      setError(
        "Please provide at least 3 complete team updates (both name and update text)."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/summary/generate`, {
        updates: validUpdates,
      });

      setReport(response.data.report);
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
          "Failed to generate summary. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={styles.background}>
      <AppBar position="static" elevation={0} sx={styles.appBar}>
        <Toolbar sx={styles.appBarToolbar}>
          <AIIcon sx={{ mr: 2, fontSize: 32 }} />
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, ...styles.gradientText }}
          >
            Team Update Summarizer
          </Typography>
          <Chip
            icon={<TrendingIcon />}
            label="Powered by Cohere AI"
            variant="outlined"
            sx={styles.headerChip}
          />
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 5 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Fade in timeout={800}>
              <Paper elevation={0} sx={styles.glassCard}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Typography variant="h4" sx={styles.gradientText}>
                    Team Updates
                  </Typography>
                  <Button
                    size="small"
                    onClick={handleLoadSampleData}
                    variant="outlined"
                    sx={styles.outlineButton}
                  >
                    Load Sample
                  </Button>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 4, lineHeight: 1.6 }}
                >
                  Enter daily updates from at least 3 team members. Updates
                  should include accomplishments, blockers, and plans.
                </Typography>

                {error && (
                  <Slide direction="down" in mountOnEnter unmountOnExit>
                    <Alert
                      severity="error"
                      sx={styles.errorAlert}
                      onClose={() => setError("")}
                    >
                      {error}
                    </Alert>
                  </Slide>
                )}

                <Stack spacing={3}>
                  {updates.map((update, index) => (
                    <Grow in timeout={500 + index * 100} key={index}>
                      <Card variant="outlined" sx={styles.teamCard}>
                        <CardContent sx={{ p: 3 }}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              mb: 2.5,
                            }}
                          >
                            <Chip
                              label={`Team Member ${index + 1}`}
                              sx={styles.categoryBadge}
                              size="small"
                            />
                            {updates.length > 3 && (
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleRemoveUpdate(index)}
                                sx={styles.deleteButton}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            )}
                          </Box>

                          <TextField
                            fullWidth
                            label="Name"
                            placeholder="e.g., Sarah Chen"
                            value={update.name}
                            onChange={(e) =>
                              handleUpdateChange(index, "name", e.target.value)
                            }
                            size="small"
                            sx={{ mb: 2.5, ...styles.textField }}
                          />

                          <TextField
                            fullWidth
                            label="Daily Update"
                            placeholder="e.g., Completed authentication module. Blocked on OAuth keys. Planning to work on user profiles next."
                            value={update.update}
                            onChange={(e) =>
                              handleUpdateChange(
                                index,
                                "update",
                                e.target.value
                              )
                            }
                            multiline
                            rows={4}
                            size="small"
                            sx={styles.textField}
                          />
                        </CardContent>
                      </Card>
                    </Grow>
                  ))}
                </Stack>

                <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={handleAddUpdate}
                    fullWidth
                    size="large"
                    sx={styles.addButton}
                  >
                    Add Team Member
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={
                      loading ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <SendIcon />
                      )
                    }
                    onClick={handleGenerateSummary}
                    disabled={loading}
                    fullWidth
                    size="large"
                    sx={styles.gradientButton}
                  >
                    {loading ? "Generating..." : "Generate Summary"}
                  </Button>
                </Box>
              </Paper>
            </Fade>
          </Grid>

          <Grid item xs={12} md={6}>
            <Fade in timeout={1000}>
              <Paper
                elevation={0}
                sx={{ ...styles.glassCard, minHeight: "600px" }}
              >
                <Typography variant="h4" sx={{ ...styles.gradientText, mb: 3 }}>
                  Team Summary Report
                </Typography>

                {!report && !loading && (
                  <Fade in>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: 400,
                        color: "text.secondary",
                        textAlign: "center",
                        p: 4,
                      }}
                    >
                      <AIIcon
                        sx={{
                          fontSize: 80,
                          mb: 3,
                          color: "#667eea",
                          opacity: 0.3,
                        }}
                      />
                      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                        Ready to Generate
                      </Typography>
                      <Typography variant="body1" sx={{ opacity: 0.7 }}>
                        Enter team updates and click "Generate Summary" to see
                        the consolidated report with AI-powered insights
                      </Typography>
                    </Box>
                  </Fade>
                )}

                {loading && (
                  <Fade in>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: 400,
                        gap: 3,
                      }}
                    >
                      <Box sx={{ position: "relative" }}>
                        <CircularProgress
                          size={80}
                          thickness={4}
                          sx={{ color: "#667eea", animationDuration: "0.8s" }}
                        />
                        <AIIcon
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            fontSize: 40,
                            color: "#667eea",
                          }}
                        />
                      </Box>
                      <Typography
                        variant="h6"
                        color="text.primary"
                        sx={{ fontWeight: 600 }}
                      >
                        Analyzing team updates with AI...
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        This may take a few moments
                      </Typography>
                    </Box>
                  </Fade>
                )}

                {report && (
                  <Fade in timeout={600}>
                    <Box>
                      <Zoom in timeout={800}>
                        <Alert
                          severity="info"
                          icon={<AIIcon />}
                          sx={styles.infoAlert}
                        >
                          {report.summary}
                        </Alert>
                      </Zoom>

                      <Box sx={{ mb: 4 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            mb: 2,
                          }}
                        >
                          <WarningIcon
                            sx={{ color: "#f44336", fontSize: 28 }}
                          />
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 700, color: "#f44336" }}
                          >
                            Blockers
                          </Typography>
                          <Chip
                            label={report.blockers.length}
                            size="small"
                            sx={styles.categoryChip("#f44336")}
                          />
                        </Box>
                        <Divider sx={{ mb: 2.5, opacity: 0.3 }} />
                        {report.blockers.length > 0 ? (
                          <Stack spacing={2}>
                            {report.blockers.map((blocker, index) => (
                              <Grow in timeout={400 + index * 100} key={index}>
                                <Card
                                  variant="outlined"
                                  sx={{
                                    ...styles.resultCard,
                                    ...styles.blockerCard,
                                  }}
                                >
                                  <CardContent sx={{ py: 2, px: 2.5 }}>
                                    <Typography
                                      variant="body2"
                                      sx={{ fontWeight: 500 }}
                                    >
                                      • {blocker}
                                    </Typography>
                                  </CardContent>
                                </Card>
                              </Grow>
                            ))}
                          </Stack>
                        ) : (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontStyle: "italic", py: 2 }}
                          >
                            No blockers reported
                          </Typography>
                        )}
                      </Box>

                      <Box sx={{ mb: 4 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            mb: 2,
                          }}
                        >
                          <CheckIcon sx={{ color: "#4caf50", fontSize: 28 }} />
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 700, color: "#4caf50" }}
                          >
                            Wins
                          </Typography>
                          <Chip
                            label={report.wins.length}
                            size="small"
                            sx={styles.categoryChip("#4caf50")}
                          />
                        </Box>
                        <Divider sx={{ mb: 2.5, opacity: 0.3 }} />
                        {report.wins.length > 0 ? (
                          <Stack spacing={2}>
                            {report.wins.map((win, index) => (
                              <Grow in timeout={600 + index * 100} key={index}>
                                <Card
                                  variant="outlined"
                                  sx={{
                                    ...styles.resultCard,
                                    ...styles.winCard,
                                  }}
                                >
                                  <CardContent sx={{ py: 2, px: 2.5 }}>
                                    <Typography
                                      variant="body2"
                                      sx={{ fontWeight: 500 }}
                                    >
                                      • {win}
                                    </Typography>
                                  </CardContent>
                                </Card>
                              </Grow>
                            ))}
                          </Stack>
                        ) : (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontStyle: "italic", py: 2 }}
                          >
                            No wins reported
                          </Typography>
                        )}
                      </Box>

                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            mb: 2,
                          }}
                        >
                          <FlagIcon sx={{ color: "#667eea", fontSize: 28 }} />
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 700, color: "#667eea" }}
                          >
                            Goals
                          </Typography>
                          <Chip
                            label={report.goals.length}
                            size="small"
                            sx={styles.categoryChip("#667eea")}
                          />
                        </Box>
                        <Divider sx={{ mb: 2.5, opacity: 0.3 }} />
                        {report.goals.length > 0 ? (
                          <Stack spacing={2}>
                            {report.goals.map((goal, index) => (
                              <Grow in timeout={800 + index * 100} key={index}>
                                <Card
                                  variant="outlined"
                                  sx={{
                                    ...styles.resultCard,
                                    ...styles.goalCard,
                                  }}
                                >
                                  <CardContent sx={{ py: 2, px: 2.5 }}>
                                    <Typography
                                      variant="body2"
                                      sx={{ fontWeight: 500 }}
                                    >
                                      • {goal}
                                    </Typography>
                                  </CardContent>
                                </Card>
                              </Grow>
                            ))}
                          </Stack>
                        ) : (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontStyle: "italic", py: 2 }}
                          >
                            No goals reported
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Fade>
                )}
              </Paper>
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default App;
