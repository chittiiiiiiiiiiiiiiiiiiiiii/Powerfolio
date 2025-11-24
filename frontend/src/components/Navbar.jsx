import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(10px)",
        color: "#0d1b2a",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          PowerFolio
        </Typography>
        <Box>
          <Button
            onClick={() => navigate("/")}
            sx={{
              color: "#0d1b2a",
              fontWeight: "bold",
              "&:hover": { color: "#8496e8", backgroundColor: "transparent" },
            }}
          >
            Home
          </Button>
          <Button
            onClick={() => navigate("/admin/login")}
            sx={{
              color: "#0d1b2a",
              fontWeight: "bold",
              ml: 2,
              "&:hover": { color: "#6476c6", backgroundColor: "transparent" },
            }}
          >
            Admin
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
