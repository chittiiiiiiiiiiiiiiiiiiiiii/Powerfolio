import React from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Card,
  CardContent,
  LinearProgress,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GroupIcon from "@mui/icons-material/Group";
import FolderIcon from "@mui/icons-material/Folder";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import CancelIcon from "@mui/icons-material/Cancel";

const Analytics = () => {
  const analytics = [
    { 
      title: "Total Users", 
      value: 156, 
      change: "+12%",
      icon: <GroupIcon sx={{ fontSize: 40 }} />,
      color: "#4facfe",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    { 
      title: "Total Projects", 
      value: 45, 
      change: "+8%",
      icon: <FolderIcon sx={{ fontSize: 40 }} />,
      color: "#667eea",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    { 
      title: "Pending Reviews", 
      value: 10, 
      change: "-5%",
      icon: <PendingIcon sx={{ fontSize: 40 }} />,
      color: "#ff9800",
      gradient: "linear-gradient(135deg, #ffa726 0%, #ff9800 100%)",
    },
    { 
      title: "Approved Projects", 
      value: 35, 
      change: "+15%",
      icon: <CheckCircleIcon sx={{ fontSize: 40 }} />,
      color: "#43e97b",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    },
  ];

  const projectStats = [
    { status: "Approved", count: 35, total: 45, color: "#43e97b" },
    { status: "Pending", count: 10, total: 45, color: "#ff9800" },
    { status: "Rejected", count: 0, total: 45, color: "#f5576c" },
  ];

  const recentActivity = [
    { action: "New user registered", user: "Alice Johnson", time: "2 hours ago", color: "#4facfe" },
    { action: "Project submitted", user: "Bob Smith", time: "3 hours ago", color: "#667eea" },
    { action: "Project approved", user: "Carol White", time: "5 hours ago", color: "#43e97b" },
    { action: "User updated profile", user: "David Lee", time: "6 hours ago", color: "#ff9800" },
  ];

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(180deg, #f0f4ff 0%, #ffffff 100%)",
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
                    background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AnalyticsIcon sx={{ color: "#fff", fontSize: 28 }} />
                </Box>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: "bold", color: "#1a1a1a", mb: 0.5 }}
                  >
                    Analytics Dashboard
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#666" }}>
                    Monitor platform performance and user activity
                  </Typography>
                </Box>
              </Box>
            </Box>
          </motion.div>

          {/* Main Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {analytics.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                >
                  <Card
                    sx={{
                      borderRadius: 4,
                      boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                      height: "100%",
                      position: "relative",
                      overflow: "hidden",
                      border: "1px solid #f0f0f0",
                      transition: "all 0.3s",
                      "&:hover": {
                        boxShadow: `0 8px 32px ${item.color}30`,
                        borderColor: item.color,
                      },
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 4,
                        background: item.gradient,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          mb: 2,
                        }}
                      >
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: 3,
                            background: `${item.color}15`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {React.cloneElement(item.icon, { sx: { fontSize: 32, color: item.color } })}
                        </Box>
                        <Box
                          sx={{
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 2,
                            background: item.change.startsWith("+") ? "#e8f5e9" : "#ffebee",
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <TrendingUpIcon
                            sx={{
                              fontSize: 16,
                              color: item.change.startsWith("+") ? "#4caf50" : "#f44336",
                              transform: item.change.startsWith("+") ? "none" : "rotate(180deg)",
                            }}
                          />
                          <Typography
                            variant="caption"
                            sx={{
                              fontWeight: "700",
                              color: item.change.startsWith("+") ? "#4caf50" : "#f44336",
                            }}
                          >
                            {item.change}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: "bold",
                          color: "#1a1a1a",
                          mb: 0.5,
                        }}
                      >
                        {item.value}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#666", fontWeight: "500" }}>
                        {item.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={3}>
            {/* Project Status Distribution */}
            <Grid item xs={12} md={7}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Paper
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                    height: "100%",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", mb: 3, color: "#1a1a1a" }}
                  >
                    Project Status Distribution
                  </Typography>
                  {projectStats.map((stat, idx) => (
                    <Box key={idx} sx={{ mb: 3 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1,
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              borderRadius: "50%",
                              background: stat.color,
                            }}
                          />
                          <Typography variant="body2" sx={{ fontWeight: "600", color: "#1a1a1a" }}>
                            {stat.status}
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ fontWeight: "700", color: stat.color }}>
                          {stat.count} / {stat.total}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={(stat.count / stat.total) * 100}
                        sx={{
                          height: 10,
                          borderRadius: 2,
                          backgroundColor: `${stat.color}20`,
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: stat.color,
                            borderRadius: 2,
                          },
                        }}
                      />
                    </Box>
                  ))}
                </Paper>
              </motion.div>
            </Grid>

            {/* Recent Activity */}
            <Grid item xs={12} md={5}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Paper
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                    height: "100%",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", mb: 3, color: "#1a1a1a" }}
                  >
                    Recent Activity
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                    {recentActivity.map((activity, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          display: "flex",
                          gap: 2,
                          p: 2,
                          borderRadius: 3,
                          background: `${activity.color}08`,
                          border: `1px solid ${activity.color}20`,
                          transition: "all 0.2s",
                          "&:hover": {
                            background: `${activity.color}15`,
                            transform: "translateX(5px)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 2,
                            background: activity.color,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{ color: "#fff", fontWeight: "bold" }}
                          >
                            {activity.user.charAt(0)}
                          </Typography>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: "600", color: "#1a1a1a", mb: 0.3 }}
                          >
                            {activity.action}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "#666" }}>
                            {activity.user}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ display: "block", color: "#999", mt: 0.3 }}
                          >
                            {activity.time}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>

          {/* Performance Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Paper
              sx={{
                p: 4,
                borderRadius: 4,
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                mt: 3,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "#fff",
              }}
            >
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={8}>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                    Platform Performance
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9, mb: 2 }}>
                    Your platform is showing excellent growth this month with a 92% approval
                    rate and increasing user engagement.
                  </Typography>
                  <Box sx={{ display: "flex", gap: 3 }}>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                        92%
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Approval Rate
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                        78%
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Active Users
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box
                    sx={{
                      width: 120,
                      height: 120,
                      borderRadius: "50%",
                      border: "8px solid rgba(255,255,255,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      background: "rgba(255,255,255,0.1)",
                    }}
                  >
                    <Box sx={{ textAlign: "center" }}>
                      <TrendingUpIcon sx={{ fontSize: 40, mb: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        +15%
                      </Typography>
                      <Typography variant="caption">Growth</Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>
        </Container>
      </Box>
    </>
  );
};

export default Analytics;