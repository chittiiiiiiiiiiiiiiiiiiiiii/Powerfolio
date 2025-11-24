import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  Box,
  Paper,
  Avatar,
  Button,
  Chip,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GroupIcon from "@mui/icons-material/Group";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    // Check if admin is logged in
    const adminData = localStorage.getItem("admin");
    if (!adminData) {
      navigate("/admin/login");
      return;
    }
    setAdmin(JSON.parse(adminData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/");
  };

  const adminActions = [
    {
      title: "Project Submissions",
      desc: "View all uploaded projects",
      route: "/projects-submissions",
      icon: <FolderOpenIcon sx={{ fontSize: 45 }} />,
      color: "#667eea",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      count: "24",
      label: "Total",
    },
    {
      title: "Review Projects",
      desc: "Approve or reject submissions",
      route: "/review-projects",
      icon: <CheckCircleIcon sx={{ fontSize: 45 }} />,
      color: "#f5576c",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      count: "8",
      label: "Pending",
    },
    {
      title: "User Management",
      desc: "Control user accounts",
      route: "/manage-users",
      icon: <GroupIcon sx={{ fontSize: 45 }} />,
      color: "#00f2fe",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      count: "156",
      label: "Active",
    },
    {
      title: "Analytics",
      desc: "View platform statistics",
      route: "/analytics",
      icon: <AnalyticsIcon sx={{ fontSize: 45 }} />,
      color: "#38f9d7",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      count: "92%",
      label: "Growth",
    },
  ];

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
          background: "#f5f7fa",
          py: 6,
        }}
      >
        <Container maxWidth="lg">
          {/* Admin Header with Dashboard Style */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Paper
              elevation={0}
              sx={{
                mb: 5,
                p: 4,
                borderRadius: 5,
                background: "linear-gradient(135deg, #7347937b 0%, #2a5298 100%)",
                color: "#fff",
                boxShadow: "0 20px 60px rgba(30, 60, 114, 0.3)",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: -50,
                  right: -50,
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 2,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <Box
                    sx={{
                      width: 90,
                      height: 90,
                      borderRadius: "20px",
                      background: "rgba(255,255,255,0.15)",
                      backdropFilter: "blur(10px)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "2px solid rgba(255,255,255,0.3)",
                    }}
                  >
                    <AdminPanelSettingsIcon sx={{ fontSize: 50, color: "#fff" }} />
                  </Box>
                  <Box>
                    <Chip
                      label="ADMINISTRATOR"
                      size="small"
                      sx={{
                        mb: 1,
                        background: "rgba(255,255,255,0.2)",
                        color: "#fff",
                        fontWeight: "700",
                        fontSize: "0.7rem",
                      }}
                    />
                    <Typography variant="h4" sx={{ fontWeight: "bold", mb: 0.5 }}>
                      {admin?.name || "Admin"}
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9 }}>
                      {admin?.email || "admin@powerfolio.com"}
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="outlined"
                  startIcon={<LogoutIcon />}
                  onClick={handleLogout}
                  sx={{
                    color: "#fff",
                    borderColor: "rgba(255,255,255,0.5)",
                    fontWeight: "600",
                    borderRadius: "30px",
                    px: 3,
                    py: 1.2,
                    backdropFilter: "blur(10px)",
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

          {/* Control Center Title */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  width: 4,
                  height: 40,
                  background: "linear-gradient(180deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: 2,
                }}
              />
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "800",
                  color: "#1e3c72",
                }}
              >
                Control Center
              </Typography>
            </Box>
          </motion.div>

          {/* Admin Action Cards - Unique Card Design */}
          <Grid container spacing={3}>
            {adminActions.map((item, index) => (
              <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  onClick={() => navigate(item.route)}
                  style={{ cursor: "pointer" }}
                >
                  <Card
                    sx={{
                      borderRadius: 4,
                      boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                      transition: "all 0.3s ease",
                      height: "100%",
                      background: "#fff",
                      border: "1px solid #f0f0f0",
                      "&:hover": {
                        boxShadow: `0 16px 40px ${item.color}30`,
                        borderColor: item.color,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      {/* Icon with gradient background */}
                      <Box
                        sx={{
                          width: 70,
                          height: 70,
                          borderRadius: 3,
                          background: item.gradient,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mb: 2.5,
                          position: "relative",
                          "&::after": {
                            content: '""',
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            background: item.gradient,
                            borderRadius: 3,
                            opacity: 0.2,
                            transform: "scale(1.2)",
                            zIndex: -1,
                          },
                        }}
                      >
                        {React.cloneElement(item.icon, { sx: { fontSize: 40, color: "#fff" } })}
                      </Box>

                      {/* Title */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          mb: 1,
                          color: "#1a1a1a",
                          fontSize: "1.15rem",
                        }}
                      >
                        {item.title}
                      </Typography>

                      {/* Description */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#666",
                          mb: 2.5,
                          fontSize: "0.9rem",
                        }}
                      >
                        {item.desc}
                      </Typography>

                      {/* Stats */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          pt: 2,
                          borderTop: "1px solid #f0f0f0",
                        }}
                      >
                        <Box>
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: "bold",
                              color: item.color,
                              mb: 0.3,
                            }}
                          >
                            {item.count}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "#999" }}>
                            {item.label}
                          </Typography>
                        </Box>
                        <TrendingUpIcon sx={{ color: item.color, fontSize: 30 }} />
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default AdminPanel;