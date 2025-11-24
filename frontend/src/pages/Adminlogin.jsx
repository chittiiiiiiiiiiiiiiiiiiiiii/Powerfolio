// src/pages/AdminLogin.jsx
import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  AppBar,
  Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AdminLogin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!name || !email) {
      setError("Please enter both name and email");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/admin/login", {
        name: name.trim(),
        email: email.trim(),
      });

      localStorage.setItem("admin", JSON.stringify(res.data.admin));
      navigate("/admin-panel");
    } catch (err) {
      setError(err.response?.data?.msg || "Invalid admin details. Please try again.");
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: "#fff",
          color: "#764ba2",
          borderBottom: "1px solid rgba(118, 75, 162, 0.2)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              cursor: "pointer",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
            onClick={() => navigate("/")}
          >
            Home
          </Typography>

          <Button
            variant="text"
            onClick={() => navigate("/admin/login")}
            sx={{
              color: "#764ba2",
              fontWeight: 600,
              "&:hover": {
                background: "rgba(118, 75, 162, 0.1)",
              },
            }}
          >
            Admin
          </Button>
        </Toolbar>
      </AppBar>

      {/* MAIN LOGIN FORM */}
      <Container maxWidth="sm" sx={{ mt: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper
            elevation={8}
            sx={{
              p: 5,
              borderRadius: 4,
              background: "#fff",
              boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                mb: 3,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Admin Login
            </Typography>

            <TextField
              label="Admin Name"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#764ba2",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#764ba2",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#764ba2",
                },
              }}
            />

            <TextField
              label="Admin Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#764ba2",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#764ba2",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#764ba2",
                },
              }}
            />

            {error && (
              <Typography sx={{ color: "#f44336", mt: 1 }}>{error}</Typography>
            )}

            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                py: 1.8,
                fontWeight: 700,
                fontSize: "1rem",
                borderRadius: "30px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: "0 6px 20px rgba(118, 75, 162, 0.3)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 28px rgba(118, 75, 162, 0.4)",
                },
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </Paper>
        </motion.div>
      </Container>
    </>
  );
};

export default AdminLogin;