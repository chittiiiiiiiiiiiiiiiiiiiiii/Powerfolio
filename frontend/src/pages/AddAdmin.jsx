import React, { useState } from "react";
import axios from "../api"; // use centralized Axios
import Navbar from "../components/Navbar";

const AddAdmin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleAddAdmin = async () => {
    if (!name || !email) {
      setMsg("Please enter name and email");
      return;
    }

    try {
      const res = await axios.post("/admin/add", {  // note: removed 'http://localhost:5000'
        name,
        email,
      });
      setMsg(res.data.msg);
      setName("");
      setEmail("");
    } catch (err) {
      setMsg(err.response?.data?.msg || "Error adding admin");
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Add Admin</h2>
        <input
          placeholder="Admin Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ margin: "5px", padding: "5px" }}
        />
        <br />
        <input
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ margin: "5px", padding: "5px" }}
        />
        <br />
        <button
          onClick={handleAddAdmin}
          style={{ padding: "5px 10px", marginTop: "10px" }}
        >
          Add Admin
        </button>
        <p>{msg}</p>
      </div>
    </>
  );
};

export default AddAdmin;
