import express from "express";
import Project from "../models/project.js";

const router = express.Router();

// ---------------- SUBMIT NEW PROJECT ----------------
router.post("/submit", async (req, res) => {
  try {
    const { title, description, category, image, github, userId } = req.body;

    if (!title || !description || !userId)
      return res.status(400).json({ msg: "Required fields missing" });

    const project = new Project({
      title,
      description,
      category,
      image,
      github,
      userId,
    });

    await project.save();
    res.json({ msg: "Project submitted successfully", project });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ---------------- GET PROJECTS FOR A USER ----------------
router.get("/my-projects/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const projects = await Project.find({ userId });

    res.json(projects);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ---------------- EDIT PROJECT ----------------
router.put("/edit/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ msg: "Project updated", project });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ---------------- DELETE PROJECT ----------------
router.delete("/delete/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ msg: "Project deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;
