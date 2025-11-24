// src/pages/Landing.jsx
import React from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  Stack,
  Chip,
  CardMedia,
  CardActions,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CommunityIcon from "@mui/icons-material/People";
import RecognitionIcon from "@mui/icons-material/EmojiEvents";
import SubmissionIcon from "@mui/icons-material/UploadFile";

const Landing = () => {
  const navigate = useNavigate();

  const platformFeatures = [
    {
      icon: <CommunityIcon sx={{ fontSize: 35, color: "#FF6B6B" }} />,
      title: "Community",
      desc: "Connect with fellow innovators and collaborate.",
      bgColor: "#FFE5E5",
    },
    {
      icon: <RecognitionIcon sx={{ fontSize: 35, color: "#4ECDC4" }} />,
      title: "Recognition",
      desc: "Get recognized for your achievements.",
      bgColor: "#E0F7F6",
    },
    {
      icon: <SubmissionIcon sx={{ fontSize: 35, color: "#FFB84D" }} />,
      title: "Easy Submission",
      desc: "Submit projects quickly and efficiently.",
      bgColor: "#FFF4E0",
    },
  ];

  const featuredProjects = [
    {
      name: "AI Travel Planner",
      tech: ["React", "HTML/CSS", "JavaScript"],
      desc: "AI Travel Planner is a chatbot-powered platform that generates personalized travel itineraries and emails them to you.",
      members: 1,
      date: "29/08/2025",
      creator: "Nikhil Kumar",
      img: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      name: "WeatherNow",
      tech: ["TypeScript", "Node.js"],
      desc: "WeatherNow is a real-time weather forecasting website displaying weather in various countries.",
      members: 1,
      date: "25/08/2025",
      creator: "Aditya Shekhar",
      img: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=400&h=300&fit=crop",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      name: "Smart Study Planner",
      tech: ["Python", "Django"],
      desc: "An intelligent study planner that creates customized study schedules based on your goals and free time.",
      members: 2,
      date: "20/08/2025",
      creator: "Priya Sharma",
      img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },

  ];

  return (
    <>
      <Navbar />

      {/* HERO SECTION - Enhanced with better colors */}
      <Box
        sx={{
          height: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "#ffffff",
          px: 3,
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
          }
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ position: "relative", zIndex: 1 }}
        >
          <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2, textShadow: "2px 2px 4px rgba(0,0,0,0.2)" }}>
            Welcome to PowerFolio
          </Typography>
          <Typography variant="h5" sx={{ mb: 3, opacity: 0.95 }}>
            Submit, view, and manage student projects effortlessly.
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, maxWidth: 600, mx: "auto", opacity: 0.9, fontSize: "1.1rem" }}>
           PowerFolio is a powerful hub for showcasing academic and personal 
           projects. Submit your work, gain visibility, and connect with a 
           community of creators. Join a community of innovators and bring your ideas
            to life!
          </Typography>

          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/auth")}
              sx={{
                fontWeight: "bold",
                px: 7,
                py: 1.8,
                background: "#ffffff",
                color: "#667eea",
                borderRadius: "30px",
                fontSize: "1.1rem",
                boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                "&:hover": { 
                  background: "#f0f0f0",
                  boxShadow: "0 12px 28px rgba(0,0,0,0.4)",
                },
              }}
            >
              Get Started
            </Button>
          </motion.div>
        </motion.div>
      </Box>

      {/* PLATFORM FEATURES - All 3 in ONE ROW (Compact Size) */}
      <Container maxWidth="lg" sx={{ mt: 12, mb: 12 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", mb: 2, textAlign: "center", color: "#667eea" }}
        >
          Platform Features
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 6, textAlign: "center", color: "#666", maxWidth: 700, mx: "auto" }}
        >
          Discover the powerful features that make PowerFolio the best platform for student projects
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {platformFeatures.map((feature, idx) => (
            <Grid item xs={12} sm={4} md={4} key={idx}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card
                  sx={{
                    p: 2,
                    height: "100%",
                    borderRadius: 3,
                    textAlign: "center",
                    boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease",
                    border: "2px solid transparent",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0px 10px 28px rgba(0,0,0,0.15)",
                      borderColor: feature.icon.props.sx.color,
                    }
                  }}
                >
                  <Box 
                    sx={{ 
                      mb: 1.5,
                      display: "inline-flex",
                      p: 1.5,
                      borderRadius: "50%",
                      backgroundColor: feature.bgColor,
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.1) rotate(5deg)",
                      }
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ mb: 1, fontWeight: "700", color: "#333", fontSize: "1.1rem" }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography sx={{ fontSize: "0.9rem", color: "#666", lineHeight: 1.6 }}>
                    {feature.desc}
                  </Typography>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* FEATURED PROJECTS - Enhanced Design */}
      <Box sx={{ py: 12, background: "linear-gradient(180deg, #f8f9ff 0%, #ffffff 100%)" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", mb: 2, textAlign: "center", color: "#667eea" }}
          >
            Featured Projects
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 8, textAlign: "center", color: "#666", maxWidth: 700, mx: "auto" }}
          >
            Discover amazing projects from talented students around the world
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {featuredProjects.map((project, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Card
                    sx={{
                      borderRadius: 5,
                      boxShadow: "0px 8px 24px rgba(0,0,0,0.12)",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      transition: "all 0.3s ease",
                      overflow: "hidden",
                      position: "relative",
                      "&:hover": {
                        boxShadow: "0px 16px 40px rgba(0,0,0,0.2)",
                        "& .project-overlay": {
                          opacity: 1,
                        }
                      }
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      <CardMedia
                        component="img"
                        height="180"
                        image={project.img}
                        alt={project.name}
                        sx={{ objectFit: "cover" }}
                      />
                      <Box
                        className="project-overlay"
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: project.gradient,
                          opacity: 0,
                          transition: "opacity 0.3s ease",
                          mixBlendMode: "multiply",
                        }}
                      />
                    </Box>
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "#333", mb: 1.5, fontSize: "1.15rem" }}
                      >
                        {project.name}
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={0.5}
                        sx={{ my: 1.5, flexWrap: "wrap", gap: 0.5 }}
                      >
                        {project.tech.map((t, i) => (
                          <Chip 
                            key={i} 
                            label={t} 
                            size="small" 
                            sx={{
                              background: project.gradient,
                              color: "#fff",
                              fontWeight: "600",
                              fontSize: "0.75rem",
                            }}
                          />
                        ))}
                      </Stack>
                      <Typography sx={{ fontSize: "0.9rem", color: "#666", lineHeight: 1.6 }}>
                        {project.desc.length > 90
                          ? project.desc.substring(0, 90) + "..."
                          : project.desc}
                      </Typography>
                    </CardContent>
                    <CardActions
                      sx={{ justifyContent: "space-between", px: 3, pb: 2.5 }}
                    >
                      <Typography sx={{ fontSize: "0.8rem", color: "#999" }}>
                        {project.members} member{project.members > 1 ? "s" : ""} • {project.date}
                      </Typography>
                      <Button
                        size="small"
                        sx={{
                          fontSize: "0.8rem",
                          background: project.gradient,
                          color: "#fff",
                          fontWeight: "600",
                          borderRadius: 2,
                          px: 2.5,
                          py: 0.8,
                          "&:hover": { 
                            opacity: 0.9,
                            transform: "scale(1.05)",
                          },
                        }}
                      >
                        View More
                      </Button>
                    </CardActions>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: "center", mt: 8 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/projects-submissions")}
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "#fff",
                px: 7,
                py: 1.8,
                fontWeight: "bold",
                fontSize: "1.05rem",
                borderRadius: "30px",
                boxShadow: "0 8px 20px rgba(102, 126, 234, 0.4)",
                "&:hover": { 
                  boxShadow: "0 12px 28px rgba(102, 126, 234, 0.5)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              View All Projects
            </Button>
          </Box>
        </Container>
      </Box>

      {/* CONTACT FORM - Submit Button Added */}
      <Box sx={{ py: 10, backgroundColor: "#ffffff" }}>
        <Container maxWidth="sm">
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", mb: 2, textAlign: "center", color: "#667eea" }}
          >
            Get In Touch
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 5, textAlign: "center", color: "#666" }}
          >
            Have questions? We'd love to hear from you. Send us a message!
          </Typography>

          <Card sx={{ p: 4, borderRadius: 4, boxShadow: "0px 8px 32px rgba(102, 126, 234, 0.15)" }}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = "mailto:gradxper@gmail.com";
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField 
                    label="Your Name" 
                    fullWidth 
                    required 
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: "#667eea",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#667eea",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    label="Your Email" 
                    type="email" 
                    fullWidth 
                    required 
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: "#667eea",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#667eea",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Message"
                    fullWidth
                    required
                    multiline
                    rows={4}
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: "#667eea",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#667eea",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      py: 1.8,
                      fontWeight: "bold",
                      fontSize: "1.05rem",
                      borderRadius: "30px",
                      boxShadow: "0 6px 20px rgba(102, 126, 234, 0.4)",
                      "&:hover": { 
                        boxShadow: "0 8px 28px rgba(102, 126, 234, 0.5)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    Submit Message
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Container>
      </Box>

      {/* FOOTER - Enhanced */}
      <Box sx={{ 
        py: 5, 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", 
        color: "#fff", 
        textAlign: "center" 
      }}>
        <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
          &copy; 2025 PowerFolio. All rights reserved.
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          Contact us at gradxper@gmail.com
        </Typography>
      </Box>
    </>
  );
};

export default Landing;