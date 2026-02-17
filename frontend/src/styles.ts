export const styles = {
  background: {
    flexGrow: 1,
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    backgroundAttachment: "fixed",
  },

  appBar: {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    color: "#667eea",
    borderBottom: "1px solid rgba(102, 126, 234, 0.1)",
  },

  appBarToolbar: {
    py: 1,
  },

  gradientText: {
    fontWeight: 700,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  headerChip: {
    borderColor: "#667eea",
    color: "#667eea",
    fontWeight: 600,
  },

  glassCard: {
    p: 4,
    borderRadius: 4,
    background: "rgba(255, 255, 255, 0.98)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 8px 32px rgba(102, 126, 234, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  },

  outlineButton: {
    borderRadius: 3,
    textTransform: "none",
    fontWeight: 600,
    borderColor: "#667eea",
    color: "#667eea",
    "&:hover": {
      borderColor: "#764ba2",
      background: "rgba(102, 126, 234, 0.05)",
    },
  },

  teamCard: {
    borderRadius: 3,
    border: "2px solid rgba(102, 126, 234, 0.1)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 8px 24px rgba(102, 126, 234, 0.2)",
      borderColor: "rgba(102, 126, 234, 0.3)",
    },
  },

  categoryBadge: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    fontWeight: 600,
    px: 1,
  },

  deleteButton: {
    "&:hover": {
      background: "rgba(244, 67, 54, 0.1)",
      transform: "scale(1.1)",
    },
    transition: "all 0.2s ease",
  },

  textField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      "&:hover fieldset": {
        borderColor: "#667eea",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#667eea",
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#667eea",
    },
  },

  gradientButton: {
    borderRadius: 3,
    textTransform: "none",
    fontWeight: 700,
    fontSize: 16,
    py: 1.5,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    boxShadow: "0 4px 20px rgba(102, 126, 234, 0.4)",
    "&:hover": {
      background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
      boxShadow: "0 6px 30px rgba(102, 126, 234, 0.5)",
      transform: "translateY(-2px)",
    },
    "&:disabled": {
      background: "rgba(0, 0, 0, 0.12)",
    },
    transition: "all 0.3s ease",
  },

  addButton: {
    borderRadius: 3,
    textTransform: "none",
    fontWeight: 600,
    fontSize: 16,
    py: 1.5,
    borderColor: "#667eea",
    color: "#667eea",
    borderWidth: 2,
    "&:hover": {
      borderWidth: 2,
      borderColor: "#764ba2",
      background: "rgba(102, 126, 234, 0.05)",
      transform: "translateY(-2px)",
    },
    transition: "all 0.3s ease",
  },

  infoAlert: {
    mb: 4,
    borderRadius: 3,
    background:
      "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
    border: "2px solid rgba(102, 126, 234, 0.2)",
    fontSize: 15,
    lineHeight: 1.7,
    fontWeight: 500,
  },

  errorAlert: {
    mb: 3,
    borderRadius: 3,
    boxShadow: "0 4px 12px rgba(244, 67, 54, 0.15)",
  },

  resultCard: {
    borderRadius: 2,
    transition: "all 0.2s ease",
    "&:hover": {
      transform: "translateX(8px)",
    },
  },

  blockerCard: {
    borderLeft: 5,
    borderColor: "#f44336",
    "&:hover": {
      boxShadow: "0 4px 12px rgba(244, 67, 54, 0.2)",
    },
  },

  winCard: {
    borderLeft: 5,
    borderColor: "#4caf50",
    "&:hover": {
      boxShadow: "0 4px 12px rgba(76, 175, 80, 0.2)",
    },
  },

  goalCard: {
    borderLeft: 5,
    borderColor: "#667eea",
    "&:hover": {
      boxShadow: "0 4px 12px rgba(102, 126, 234, 0.2)",
    },
  },

  categoryChip: (color: string) => ({
    background: color,
    color: "white",
    fontWeight: 600,
  }),
};
