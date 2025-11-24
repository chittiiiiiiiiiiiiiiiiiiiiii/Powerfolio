// src/pages/StudentDashboard.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Container,
  Avatar,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Paper,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FolderIcon from "@mui/icons-material/Folder";
import LogoutIcon from "@mui/icons-material/Logout";
import { motion } from "framer-motion";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [openSubmitDialog, setOpenSubmitDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // New project form data
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    technologies: "",
    githubLink: "",
    liveLink: "",
  });

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      navigate("/auth");
      return;
    }

    setUser(JSON.parse(userData));
    fetchUserProjects();
  }, [navigate]);

  const fetchUserProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/projects/my-projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProjects(data.projects || []);
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleSubmitProject = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/projects/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...newProject,
          technologies: newProject.technologies.split(",").map((tech) => tech.trim()),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Project submitted successfully!");
        setOpenSubmitDialog(false);
        setNewProject({
          title: "",
          description: "",
          technologies: "",
          githubLink: "",
          liveLink: "",
        });
        fetchUserProjects();
      } else {
        setError(data.message || "Failed to submit project");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditProject = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/projects/${selectedProject._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(selectedProject),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess("Project updated successfully!");
        setOpenEditDialog(false);
        fetchUserProjects();
      } else {
        setError(data.message || "Failed to update project");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/projects/${projectId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setSuccess("Project deleted successfully!");
        fetchUserProjects();
      } else {
        setError("Failed to delete project");
      }
    } catch (err) {
      setError("Server error. Please try again.");
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
            <Paper
              elevation={0}
              sx={{
                mb: 4,
                p: 4,
                borderRadius: 4,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "#fff",
                boxShadow: "0 10px 40px rgba(102, 126, 234, 0.3)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      background: "#fff",
                      color: "#667eea",
                      fontSize: "2rem",
                      fontWeight: "bold",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                    }}
                  >
                    {user?.name?.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: "bold", mb: 0.5 }}>
                      Welcome back, {user?.name}!
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9, mb: 1 }}>
                      {user?.email}
                    </Typography>
                    <Chip
                      icon={<FolderIcon />}
                      label={`${projects.length} Project${projects.length !== 1 ? "s" : ""}`}
                      sx={{
                        background: "rgba(255,255,255,0.2)",
                        color: "#fff",
                        fontWeight: "600",
                      }}
                    />
                  </Box>
                </Box>
                <Button
                  variant="outlined"
                  startIcon={<LogoutIcon />}
                  onClick={handleLogout}
                  sx={{
                    color: "#fff",
                    borderColor: "#fff",
                    fontWeight: "600",
                    borderRadius: "30px",
                    px: 3,
                    "&:hover": {
                      borderColor: "#fff",
                      background: "rgba(255,255,255,0.15)",
                    },
                  }}
                >
                  Logout
                </Button>
              </Box>
            </Paper>
          </motion.div>

          {/* Alerts */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess("")}>
              {success}
            </Alert>
          )}

          {/* Quick Actions */}
          <Grid container spacing={3} sx={{ mb: 5 }}>
            <Grid item xs={12} md={4}>
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    textAlign: "center",
                    cursor: "pointer",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "#fff",
                    boxShadow: "0 8px 24px rgba(102, 126, 234, 0.3)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 12px 32px rgba(102, 126, 234, 0.4)",
                    },
                  }}
                  onClick={() => setOpenSubmitDialog(true)}
                >
                  <AddIcon sx={{ fontSize: 50, mb: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                    Submit New Project
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Upload your latest project
                  </Typography>
                </Card>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={4}>
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    textAlign: "center",
                    cursor: "pointer",
                    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                    color: "#fff",
                    boxShadow: "0 8px 24px rgba(240, 147, 251, 0.3)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 12px 32px rgba(240, 147, 251, 0.4)",
                    },
                  }}
                  onClick={() => navigate("/projects")}
                >
                  <VisibilityIcon sx={{ fontSize: 50, mb: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                    View All Projects
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Browse community projects
                  </Typography>
                </Card>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={4}>
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    textAlign: "center",
                    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                    color: "#fff",
                    boxShadow: "0 8px 24px rgba(79, 172, 254, 0.3)",
                  }}
                >
                  <FolderIcon sx={{ fontSize: 50, mb: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                    My Projects
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    {projects.length}
                  </Typography>
                </Card>
              </motion.div>
            </Grid>
          </Grid>

          {/* My Projects Section */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              mb: 3,
              color: "#333",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <FolderIcon sx={{ color: "#667eea" }} />
            My Projects
          </Typography>

          {projects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card
                sx={{
                  p: 6,
                  textAlign: "center",
                  borderRadius: 4,
                  border: "2px dashed #e0e0e0",
                  background: "#fafafa",
                }}
              >
                <FolderIcon sx={{ fontSize: 80, color: "#ccc", mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No projects yet
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Start by submitting your first project!
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setOpenSubmitDialog(true)}
                  sx={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    px: 5,
                    py: 1.5,
                    borderRadius: "30px",
                    fontWeight: "600",
                    boxShadow: "0 6px 20px rgba(102, 126, 234, 0.4)",
                    "&:hover": {
                      boxShadow: "0 8px 28px rgba(102, 126, 234, 0.5)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Submit Project
                </Button>
              </Card>
            </motion.div>
          ) : (
            <Grid container spacing={3}>
              {projects.map((project, idx) => (
                <Grid item xs={12} md={6} lg={4} key={project._id || idx}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -8 }}
                  >
                    <Card
                      sx={{
                        borderRadius: 4,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        transition: "all 0.3s",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        "&:hover": {
                          boxShadow: "0 8px 24px rgba(102, 126, 234, 0.2)",
                        },
                      }}
                    >
                      <CardContent sx={{ p: 3, flexGrow: 1 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "bold",
                            mb: 1.5,
                            color: "#333",
                          }}
                        >
                          {project.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 2, minHeight: 60, lineHeight: 1.6 }}
                        >
                          {project.description?.length > 100
                            ? project.description.substring(0, 100) + "..."
                            : project.description}
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
                          {project.technologies?.slice(0, 3).map((tech, i) => (
                            <Chip
                              key={i}
                              label={tech}
                              size="small"
                              sx={{
                                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                color: "#fff",
                                fontWeight: "600",
                                fontSize: "0.75rem",
                              }}
                            />
                          ))}
                          {project.technologies?.length > 3 && (
                            <Chip
                              label={`+${project.technologies.length - 3}`}
                              size="small"
                              sx={{ fontSize: "0.75rem" }}
                            />
                          )}
                        </Box>
                        <Chip
                          label={project.status || "Pending"}
                          size="small"
                          sx={{
                            background:
                              project.status === "approved"
                                ? "#4caf50"
                                : project.status === "rejected"
                                ? "#f44336"
                                : "#ff9800",
                            color: "#fff",
                            fontWeight: "600",
                          }}
                        />
                      </CardContent>
                      <CardActions
                        sx={{ px: 2, pb: 2, justifyContent: "space-between" }}
                      >
                        <Box>
                          <IconButton
                            size="small"
                            onClick={() => {
                              setSelectedProject(project);
                              setOpenEditDialog(true);
                            }}
                            sx={{
                              color: "#667eea",
                              "&:hover": { background: "rgba(102, 126, 234, 0.1)" },
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteProject(project._id)}
                            sx={{
                              color: "#f5576c",
                              "&:hover": { background: "rgba(245, 87, 108, 0.1)" },
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                        <Button
                          size="small"
                          variant="contained"
                          sx={{
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            borderRadius: "20px",
                            px: 2.5,
                            fontWeight: "600",
                            "&:hover": {
                              boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
                            },
                          }}
                        >
                          View Details
                        </Button>
                      </CardActions>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>

      {/* Submit Project Dialog */}
      <Dialog
        open={openSubmitDialog}
        onClose={() => setOpenSubmitDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 4 },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Submit New Project
        </DialogTitle>
        <form onSubmit={handleSubmitProject}>
          <DialogContent>
            <TextField
              fullWidth
              label="Project Title"
              margin="normal"
              required
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#667eea" },
                  "&.Mui-focused fieldset": { borderColor: "#667eea" },
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "#667eea" },
              }}
            />
            <TextField
              fullWidth
              label="Description"
              margin="normal"
              required
              multiline
              rows={4}
              value={newProject.description}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#667eea" },
                  "&.Mui-focused fieldset": { borderColor: "#667eea" },
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "#667eea" },
              }}
            />
            <TextField
              fullWidth
              label="Technologies (comma separated)"
              margin="normal"
              required
              placeholder="React, Node.js, MongoDB"
              value={newProject.technologies}
              onChange={(e) =>
                setNewProject({ ...newProject, technologies: e.target.value })
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#667eea" },
                  "&.Mui-focused fieldset": { borderColor: "#667eea" },
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "#667eea" },
              }}
            />
            <TextField
              fullWidth
              label="GitHub Link"
              margin="normal"
              value={newProject.githubLink}
              onChange={(e) =>
                setNewProject({ ...newProject, githubLink: e.target.value })
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#667eea" },
                  "&.Mui-focused fieldset": { borderColor: "#667eea" },
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "#667eea" },
              }}
            />
            <TextField
              fullWidth
              label="Live Demo Link"
              margin="normal"
              value={newProject.liveLink}
              onChange={(e) =>
                setNewProject({ ...newProject, liveLink: e.target.value })
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#667eea" },
                  "&.Mui-focused fieldset": { borderColor: "#667eea" },
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "#667eea" },
              }}
            />
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button
              onClick={() => setOpenSubmitDialog(false)}
              sx={{ color: "#999" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                px: 4,
                borderRadius: "30px",
                fontWeight: "600",
                "&:hover": {
                  boxShadow: "0 6px 20px rgba(102, 126, 234, 0.4)",
                },
              }}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Edit Project Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 4 },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Edit Project
        </DialogTitle>
        <form onSubmit={handleEditProject}>
          <DialogContent>
            <TextField
              fullWidth
              label="Project Title"
              margin="normal"
              required
              value={selectedProject?.title || ""}
              onChange={(e) =>
                setSelectedProject({ ...selectedProject, title: e.target.value })
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#667eea" },
                  "&.Mui-focused fieldset": { borderColor: "#667eea" },
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "#667eea" },
              }}
            />
            <TextField
              fullWidth
              label="Description"
              margin="normal"
              required
              multiline
              rows={4}
              value={selectedProject?.description || ""}
              onChange={(e) =>
                setSelectedProject({ ...selectedProject, description: e.target.value })
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#667eea" },
                  "&.Mui-focused fieldset": { borderColor: "#667eea" },
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "#667eea" },
              }}
            />
            <TextField
              fullWidth
              label="Technologies (comma separated)"
              margin="normal"
              required
              value={selectedProject?.technologies?.join(", ") || ""}
              onChange={(e) =>
                setSelectedProject({
                  ...selectedProject,
                  technologies: e.target.value.split(",").map((tech) => tech.trim()),
                })
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#667eea" },
                  "&.Mui-focused fieldset": { borderColor: "#667eea" },
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "#667eea" },
              }}
            />
            <TextField
              fullWidth
              label="GitHub Link"
              margin="normal"
              value={selectedProject?.githubLink || ""}
              onChange={(e) =>
                setSelectedProject({ ...selectedProject, githubLink: e.target.value })
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#667eea" },
                  "&.Mui-focused fieldset": { borderColor: "#667eea" },
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "#667eea" },
              }}
            />
            <TextField
              fullWidth
              label="Live Demo Link"
              margin="normal"
              value={selectedProject?.liveLink || ""}
              onChange={(e) =>
                setSelectedProject({ ...selectedProject, liveLink: e.target.value })
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#667eea" },
                  "&.Mui-focused fieldset": { borderColor: "#667eea" },
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "#667eea" },
              }}
            />
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button
              onClick={() => setOpenEditDialog(false)}
              sx={{ color: "#999" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                px: 4,
                borderRadius: "30px",
                fontWeight: "600",
                "&:hover": {
                  boxShadow: "0 6px 20px rgba(102, 126, 234, 0.4)",
                },
              }}
            >
              {loading ? "Updating..." : "Update"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default StudentDashboard;