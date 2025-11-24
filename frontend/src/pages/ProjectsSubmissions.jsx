import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import FolderIcon from "@mui/icons-material/Folder";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const ProjectsSubmissions = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Check if admin is logged in
    const adminData = localStorage.getItem("admin");
    if (!adminData) {
      navigate("/admin/login");
      return;
    }

    // Fetch projects from backend API
    setProjects([
      { 
        id: 1, 
        student: "John Doe", 
        title: "React Portfolio", 
        status: "Pending", 
        date: "28/08/2025",
        description: "A modern portfolio website built with React and Material-UI",
        technologies: ["React", "Material-UI", "JavaScript"]
      },
      { 
        id: 2, 
        student: "Jane Smith", 
        title: "AI Chatbot", 
        status: "Approved", 
        date: "25/08/2025",
        description: "An intelligent chatbot using natural language processing",
        technologies: ["Python", "TensorFlow", "Flask"]
      },
      { 
        id: 3, 
        student: "Nikhil Kumar", 
        title: "WeatherNow", 
        status: "Pending", 
        date: "29/08/2025",
        description: "Real-time weather forecasting application",
        technologies: ["JavaScript", "API", "Node.js"]
      },
      { 
        id: 4, 
        student: "Sarah Johnson", 
        title: "E-Commerce Platform", 
        status: "Approved", 
        date: "27/08/2025",
        description: "Full-stack e-commerce solution with payment integration",
        technologies: ["React", "Node.js", "MongoDB"]
      },
    ]);
  }, [navigate]);

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.student.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return { bg: "#e8f5e9", color: "#2e7d32", border: "#4caf50" };
      case "Rejected":
        return { bg: "#ffebee", color: "#c62828", border: "#f44336" };
      default:
        return { bg: "#fff3e0", color: "#e65100", border: "#ff9800" };
    }
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(180deg, #f8f9ff 0%, #ffffff 100%)",
          py: 6,
        }}
      >
        <Container maxWidth="lg">
          {/* Header Section */}
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
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FolderIcon sx={{ color: "#fff", fontSize: 28 }} />
                </Box>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: "bold", color: "#1a1a1a", mb: 0.5 }}
                  >
                    Project Submissions
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#666" }}>
                    View and manage all student project submissions
                  </Typography>
                </Box>
              </Box>

              {/* Search Bar */}
              <TextField
                fullWidth
                placeholder="Search by project title or student name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  mt: 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    background: "#fff",
                    "&:hover fieldset": {
                      borderColor: "#667eea",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#667eea",
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#999" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </motion.div>

          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={4}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Card
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "#fff",
                  }}
                >
                  <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
                    {projects.length}
                  </Typography>
                  <Typography variant="body2">Total Submissions</Typography>
                </Card>
              </motion.div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Card
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                    color: "#fff",
                  }}
                >
                  <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
                    {projects.filter(p => p.status === "Pending").length}
                  </Typography>
                  <Typography variant="body2">Pending Review</Typography>
                </Card>
              </motion.div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Card
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
                    color: "#fff",
                  }}
                >
                  <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
                    {projects.filter(p => p.status === "Approved").length}
                  </Typography>
                  <Typography variant="body2">Approved</Typography>
                </Card>
              </motion.div>
            </Grid>
          </Grid>

          {/* Projects Grid */}
          <Grid container spacing={3}>
            {filteredProjects.map((proj, idx) => (
              <Grid item xs={12} md={6} key={proj.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card
                    sx={{
                      borderRadius: 4,
                      boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                      transition: "all 0.3s",
                      border: "1px solid #f0f0f0",
                      "&:hover": {
                        boxShadow: "0 8px 32px rgba(102, 126, 234, 0.15)",
                        borderColor: "#667eea",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      {/* Header with Status */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          mb: 2,
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: "bold", color: "#1a1a1a", flex: 1 }}
                        >
                          {proj.title}
                        </Typography>
                        <Chip
                          label={proj.status}
                          size="small"
                          sx={{
                            background: getStatusColor(proj.status).bg,
                            color: getStatusColor(proj.status).color,
                            border: `1px solid ${getStatusColor(proj.status).border}`,
                            fontWeight: "600",
                            fontSize: "0.75rem",
                          }}
                        />
                      </Box>

                      {/* Description */}
                      <Typography
                        variant="body2"
                        sx={{ color: "#666", mb: 2, lineHeight: 1.6 }}
                      >
                        {proj.description}
                      </Typography>

                      {/* Technologies */}
                      <Box sx={{ display: "flex", gap: 0.5, mb: 2.5, flexWrap: "wrap" }}>
                        {proj.technologies.map((tech, i) => (
                          <Chip
                            key={i}
                            label={tech}
                            size="small"
                            sx={{
                              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                              color: "#fff",
                              fontSize: "0.7rem",
                              fontWeight: "600",
                            }}
                          />
                        ))}
                      </Box>

                      {/* Footer */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          pt: 2,
                          borderTop: "1px solid #f0f0f0",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <PersonIcon sx={{ fontSize: 16, color: "#999" }} />
                            <Typography variant="caption" sx={{ color: "#666" }}>
                              {proj.student}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <CalendarTodayIcon sx={{ fontSize: 14, color: "#999" }} />
                            <Typography variant="caption" sx={{ color: "#666" }}>
                              {proj.date}
                            </Typography>
                          </Box>
                        </Box>
                        <IconButton
                          size="small"
                          sx={{
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            color: "#fff",
                            "&:hover": {
                              background: "linear-gradient(135deg, #5568d3 0%, #6a4091 100%)",
                            },
                          }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {filteredProjects.length === 0 && (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <Typography variant="h6" sx={{ color: "#999" }}>
                No projects found matching your search
              </Typography>
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
};

export default ProjectsSubmissions;