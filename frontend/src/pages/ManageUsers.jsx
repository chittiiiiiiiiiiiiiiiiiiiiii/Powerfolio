import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Grid,
  Avatar,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import GroupIcon from "@mui/icons-material/Group";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EmailIcon from "@mui/icons-material/Email";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";

const ManageUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Student",
  });

  useEffect(() => {
    // Check if admin is logged in
    const adminData = localStorage.getItem("admin");
    if (!adminData) {
      navigate("/admin/login");
      return;
    }

    setUsers([
      { id: 1, name: "John Doe", email: "john@example.com", role: "Student", projects: 5, joinDate: "Jan 2025" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Admin", projects: 0, joinDate: "Dec 2024" },
      { id: 3, name: "Mike Chen", email: "mike@example.com", role: "Student", projects: 3, joinDate: "Feb 2025" },
      { id: 4, name: "Sarah Johnson", email: "sarah@example.com", role: "Student", projects: 8, joinDate: "Nov 2024" },
      { id: 5, name: "Alex Brown", email: "alex@example.com", role: "Student", projects: 2, joinDate: "Mar 2025" },
    ]);
  }, [navigate]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
    });
    setOpenDialog(true);
  };

  const handleAddNew = () => {
    setEditingUser(null);
    setFormData({ name: "", email: "", role: "Student" });
    setOpenDialog(true);
  };

  const handleSave = () => {
    if (editingUser) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUser.id ? { ...u, ...formData } : u
        )
      );
    } else {
      setUsers((prev) => [
        ...prev,
        { ...formData, id: Date.now(), projects: 0, joinDate: "Today" },
      ]);
    }
    setOpenDialog(false);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleColor = (role) => {
    return role === "Admin"
      ? { bg: "#e3f2fd", color: "#1976d2", border: "#1976d2" }
      : { bg: "#f3e5f5", color: "#7b1fa2", border: "#7b1fa2" };
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(180deg, #e8f5e9 0%, #ffffff 100%)",
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
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2, mb: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: 3,
                      background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <GroupIcon sx={{ color: "#fff", fontSize: 28 }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: "bold", color: "#1a1a1a", mb: 0.5 }}
                    >
                      User Management
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#666" }}>
                      Manage user accounts and permissions
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  startIcon={<PersonAddIcon />}
                  onClick={handleAddNew}
                  sx={{
                    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                    px: 3,
                    py: 1.2,
                    fontWeight: "600",
                    borderRadius: 3,
                    "&:hover": {
                      background: "linear-gradient(135deg, #3d9ce8 0%, #00d9e5 100%)",
                    },
                  }}
                >
                  Add User
                </Button>
              </Box>

              {/* Search Bar */}
              <TextField
                fullWidth
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    background: "#fff",
                    "&:hover fieldset": {
                      borderColor: "#00f2fe",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#00f2fe",
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
                    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                    color: "#fff",
                  }}
                >
                  <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
                    {users.length}
                  </Typography>
                  <Typography variant="body2">Total Users</Typography>
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
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "#fff",
                  }}
                >
                  <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
                    {users.filter((u) => u.role === "Student").length}
                  </Typography>
                  <Typography variant="body2">Students</Typography>
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
                    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                    color: "#fff",
                  }}
                >
                  <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
                    {users.filter((u) => u.role === "Admin").length}
                  </Typography>
                  <Typography variant="body2">Admins</Typography>
                </Card>
              </motion.div>
            </Grid>
          </Grid>

          {/* Users Grid */}
          <Grid container spacing={3}>
            {filteredUsers.map((user, idx) => (
              <Grid item xs={12} sm={6} md={4} key={user.id}>
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
                      height: "100%",
                      border: "1px solid #f0f0f0",
                      "&:hover": {
                        boxShadow: "0 8px 32px rgba(0, 242, 254, 0.2)",
                        borderColor: "#00f2fe",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      {/* Avatar & Role */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "space-between",
                          mb: 2,
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 60,
                            height: 60,
                            background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                          }}
                        >
                          {user.name.charAt(0)}
                        </Avatar>
                        <Chip
                          icon={
                            user.role === "Admin" ? (
                              <AdminPanelSettingsIcon sx={{ fontSize: 16 }} />
                            ) : (
                              <PersonIcon sx={{ fontSize: 16 }} />
                            )
                          }
                          label={user.role}
                          size="small"
                          sx={{
                            background: getRoleColor(user.role).bg,
                            color: getRoleColor(user.role).color,
                            border: `1px solid ${getRoleColor(user.role).border}`,
                            fontWeight: "600",
                            fontSize: "0.75rem",
                          }}
                        />
                      </Box>

                      {/* User Info */}
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "#1a1a1a", mb: 0.5 }}
                      >
                        {user.name}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          mb: 2,
                        }}
                      >
                        <EmailIcon sx={{ fontSize: 14, color: "#999" }} />
                        <Typography variant="body2" sx={{ color: "#666" }}>
                          {user.email}
                        </Typography>
                      </Box>

                      {/* Stats */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          p: 2,
                          borderRadius: 2,
                          background: "#f8f9fa",
                          mb: 2,
                        }}
                      >
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: "bold", color: "#00f2fe" }}
                          >
                            {user.projects}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "#666" }}>
                            Projects
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: "right" }}>
                          <Typography variant="body2" sx={{ fontWeight: "600" }}>
                            {user.joinDate}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "#666" }}>
                            Joined
                          </Typography>
                        </Box>
                      </Box>

                      {/* Actions */}
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Button
                          fullWidth
                          size="small"
                          startIcon={<EditIcon />}
                          onClick={() => handleEdit(user)}
                          sx={{
                            borderColor: "#00f2fe",
                            color: "#00f2fe",
                            fontWeight: "600",
                            "&:hover": {
                              borderColor: "#00d9e5",
                              background: "rgba(0, 242, 254, 0.1)",
                            },
                          }}
                          variant="outlined"
                        >
                          Edit
                        </Button>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(user.id)}
                          sx={{
                            color: "#f5576c",
                            border: "1px solid #f5576c",
                            borderRadius: 2,
                            "&:hover": {
                              background: "rgba(245, 87, 108, 0.1)",
                            },
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {filteredUsers.length === 0 && (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <Typography variant="h6" sx={{ color: "#999" }}>
                No users found matching your search
              </Typography>
            </Box>
          )}
        </Container>
      </Box>

      {/* Add/Edit Dialog */}
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
            background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {editingUser ? "Edit User" : "Add New User"}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <TextField
            fullWidth
            label="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#00f2fe" },
                "&.Mui-focused fieldset": { borderColor: "#00f2fe" },
              },
              "& .MuiInputLabel-root.Mui-focused": { color: "#00f2fe" },
            }}
          />
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#00f2fe" },
                "&.Mui-focused fieldset": { borderColor: "#00f2fe" },
              },
              "& .MuiInputLabel-root.Mui-focused": { color: "#00f2fe" },
            }}
          />
          <TextField
            fullWidth
            select
            label="Role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#00f2fe" },
                "&.Mui-focused fieldset": { borderColor: "#00f2fe" },
              },
              "& .MuiInputLabel-root.Mui-focused": { color: "#00f2fe" },
            }}
          >
            <MenuItem value="Student">Student</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenDialog(false)} sx={{ color: "#999" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
              px: 4,
              fontWeight: "600",
            }}
          >
            {editingUser ? "Save Changes" : "Add User"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ManageUsers;