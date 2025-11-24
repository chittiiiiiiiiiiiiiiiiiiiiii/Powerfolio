import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Chip,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";

const ReviewProjects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [actionType, setActionType] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Check if admin is logged in
    const adminData = localStorage.getItem("admin");
    if (!adminData) {
      navigate("/admin/login");
      return;
    }

    setProjects([
      {
        id: 1,
        student: "John Doe",
        title: "React Portfolio",
        status: "Pending",
        date: "28/08/2025",
        description: "A modern portfolio website showcasing my web development projects with responsive design and smooth animations.",
        technologies: ["React", "Material-UI", "JavaScript", "CSS3"],
        githubLink: "https://github.com/johndoe/portfolio",
        liveLink: "https://johndoe-portfolio.com",
      },
      {
        id: 2,
        student: "Jane Smith",
        title: "AI Chatbot Assistant",
        status: "Pending",
        date: "25/08/2025",
        description: "An intelligent chatbot using NLP to provide customer support and answer queries with high accuracy.",
        technologies: ["Python", "TensorFlow", "Flask", "NLP"],
        githubLink: "https://github.com/janesmith/ai-chatbot",
        liveLink: "https://ai-chatbot-demo.com",
      },
      {
        id: 3,
        student: "Mike Chen",
        title: "Task Management System",
        status: "Pending",
        date: "26/08/2025",
        description: "A collaborative task management platform with real-time updates and team collaboration features.",
        technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
        githubLink: "https://github.com/mikechen/task-manager",
        liveLink: "https://taskmaster-pro.com",
      },
    ]);
  }, [navigate]);

  const handleAction = (type, project) => {
    setActionType(type);
    setSelectedProject(project);
    setOpenDialog(true);
  };

  const handleConfirmAction = () => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === selectedProject.id
          ? { ...p, status: actionType === "approve" ? "Approved" : "Rejected" }
          : p
      )
    );
    setSuccessMessage(
      `Project "${selectedProject.title}" has been ${actionType === "approve" ? "approved" : "rejected"} successfully!`
    );
    setOpenDialog(false);
    setFeedback("");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const pendingProjects = projects.filter((p) => p.status === "Pending");

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(180deg, #fff5f5 0%, #ffffff 100%)",
          py: 6,
        }}
      >
        <Container maxWidth="lg">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ mb: 5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: 3,
                    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CheckCircleIcon sx={{ color: "#fff", fontSize: 28 }} />
                </Box>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: "bold", color: "#1a1a1a", mb: 0.5 }}
                  >
                    Review Projects
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#666" }}>
                    Approve or reject pending project submissions
                  </Typography>
                </Box>
              </Box>

              {/* Stats */}
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 2,
                  background: "#fff",
                  p: 2,
                  borderRadius: 3,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  mt: 2,
                }}
              >
                <Box sx={{ textAlign: "center", px: 2 }}>
                  <Typography variant="h5" sx={{ fontWeight: "bold", color: "#f5576c" }}>
                    {pendingProjects.length}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#666" }}>
                    Pending
                  </Typography>
                </Box>
                <Box sx={{ width: 1, height: 30, background: "#e0e0e0" }} />
                <Box sx={{ textAlign: "center", px: 2 }}>
                  <Typography variant="h5" sx={{ fontWeight: "bold", color: "#4caf50" }}>
                    {projects.filter((p) => p.status === "Approved").length}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#666" }}>
                    Approved
                  </Typography>
                </Box>
              </Box>
            </Box>
          </motion.div>

          {/* Success Message */}
          <AnimatePresence>
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <Alert severity="success" sx={{ mb: 3 }}>
                  {successMessage}
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Projects List */}
          <Grid container spacing={3}>
            {pendingProjects.length === 0 ? (
              <Grid item xs={12}>
                <Box sx={{ textAlign: "center", py: 8 }}>
                  <CheckCircleIcon sx={{ fontSize: 80, color: "#e0e0e0", mb: 2 }} />
                  <Typography variant="h6" sx={{ color: "#999" }}>
                    No pending projects to review
                  </Typography>
                </Box>
              </Grid>
            ) : (
              pendingProjects.map((proj, idx) => (
                <Grid item xs={12} key={proj.id}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card
                      sx={{
                        borderRadius: 4,
                        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                        transition: "all 0.3s",
                        border: "2px solid #f0f0f0",
                        "&:hover": {
                          boxShadow: "0 8px 32px rgba(245, 87, 108, 0.15)",
                          borderColor: "#f5576c",
                        },
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        <Grid container spacing={3}>
                          {/* Left Section */}
                          <Grid item xs={12} md={8}>
                            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                              <Box
                                sx={{
                                  width: 60,
                                  height: 60,
                                  borderRadius: 3,
                                  background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexShrink: 0,
                                }}
                              >
                                <Typography
                                  variant="h5"
                                  sx={{ color: "#fff", fontWeight: "bold" }}
                                >
                                  {proj.student.charAt(0)}
                                </Typography>
                              </Box>
                              <Box sx={{ flex: 1 }}>
                                <Typography
                                  variant="h5"
                                  sx={{ fontWeight: "bold", color: "#1a1a1a", mb: 1 }}
                                >
                                  {proj.title}
                                </Typography>
                                <Box
                                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
                                >
                                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                    <PersonIcon sx={{ fontSize: 16, color: "#999" }} />
                                    <Typography variant="body2" sx={{ color: "#666" }}>
                                      {proj.student}
                                    </Typography>
                                  </Box>
                                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                    <CalendarTodayIcon sx={{ fontSize: 14, color: "#999" }} />
                                    <Typography variant="body2" sx={{ color: "#666" }}>
                                      {proj.date}
                                    </Typography>
                                  </Box>
                                </Box>
                                <Typography
                                  variant="body2"
                                  sx={{ color: "#666", mb: 2, lineHeight: 1.7 }}
                                >
                                  {proj.description}
                                </Typography>
                                <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", mb: 2 }}>
                                  {proj.technologies.map((tech, i) => (
                                    <Chip
                                      key={i}
                                      label={tech}
                                      size="small"
                                      sx={{
                                        background: "#f5f5f5",
                                        fontWeight: "600",
                                        fontSize: "0.75rem",
                                      }}
                                    />
                                  ))}
                                </Box>
                                <Box sx={{ display: "flex", gap: 1 }}>
                                  <Button
                                    size="small"
                                    startIcon={<GitHubIcon />}
                                    href={proj.githubLink}
                                    target="_blank"
                                    sx={{
                                      color: "#666",
                                      borderColor: "#e0e0e0",
                                      textTransform: "none",
                                      "&:hover": {
                                        borderColor: "#667eea",
                                        color: "#667eea",
                                      },
                                    }}
                                    variant="outlined"
                                  >
                                    GitHub
                                  </Button>
                                  <Button
                                    size="small"
                                    startIcon={<LaunchIcon />}
                                    href={proj.liveLink}
                                    target="_blank"
                                    sx={{
                                      color: "#666",
                                      borderColor: "#e0e0e0",
                                      textTransform: "none",
                                      "&:hover": {
                                        borderColor: "#667eea",
                                        color: "#667eea",
                                      },
                                    }}
                                    variant="outlined"
                                  >
                                    Live Demo
                                  </Button>
                                </Box>
                              </Box>
                            </Box>
                          </Grid>

                          {/* Right Section - Actions */}
                          <Grid item xs={12} md={4}>
                            <Box
                              sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                gap: 2,
                              }}
                            >
                              <Button
                                fullWidth
                                variant="contained"
                                startIcon={<CheckCircleIcon />}
                                onClick={() => handleAction("approve", proj)}
                                sx={{
                                  background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
                                  py: 1.5,
                                  fontWeight: "600",
                                  fontSize: "1rem",
                                  borderRadius: 3,
                                  "&:hover": {
                                    background: "linear-gradient(135deg, #3bd671 0%, #30e0c5 100%)",
                                  },
                                }}
                              >
                                Approve
                              </Button>
                              <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<CancelIcon />}
                                onClick={() => handleAction("reject", proj)}
                                sx={{
                                  borderColor: "#f5576c",
                                  color: "#f5576c",
                                  py: 1.5,
                                  fontWeight: "600",
                                  fontSize: "1rem",
                                  borderRadius: 3,
                                  "&:hover": {
                                    borderColor: "#d94d61",
                                    background: "rgba(245, 87, 108, 0.05)",
                                  },
                                }}
                              >
                                Reject
                              </Button>
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))
            )}
          </Grid>
        </Container>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 4 } }}
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            color: actionType === "approve" ? "#38f9d7" : "#f5576c",
          }}
        >
          {actionType === "approve" ? "Approve Project" : "Reject Project"}
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            Are you sure you want to {actionType} "{selectedProject?.title}"?
          </Typography>
          <TextField
            fullWidth
            label="Feedback (Optional)"
            multiline
            rows={3}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: actionType === "approve" ? "#38f9d7" : "#f5576c",
                },
                "&.Mui-focused fieldset": {
                  borderColor: actionType === "approve" ? "#38f9d7" : "#f5576c",
                },
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenDialog(false)} sx={{ color: "#999" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirmAction}
            sx={{
              background:
                actionType === "approve"
                  ? "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
                  : "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              px: 4,
              fontWeight: "600",
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReviewProjects;