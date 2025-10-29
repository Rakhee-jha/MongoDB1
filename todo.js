import { Router } from "express";
import { Todo } from "../routes/todo.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

// CREATE
router.post("/", asyncHandler(async (req, res) => {
  const todo = await Todo.create(req.body);
  res.status(201).json(todo);
}));

// READ all
router.get("/", asyncHandler(async (req, res) => {
  const todos = await Todo.find().lean();
  res.json(todos);
}));

// READ one
router.get("/:id", asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id).lean();
  if (!todo) return res.status(404).json({ message: "Not found" });
  res.json(todo);
}));

// UPDATE
router.put("/:id", asyncHandler(async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(
    req.params.id, req.body, { new: true, runValidators: true }
  ).lean();
  if (!todo) return res.status(404).json({ message: "Not found" });
  res.json(todo);
}));

// DELETE
router.delete("/:id", asyncHandler(async (req, res) => {
  const out = await Todo.findByIdAndDelete(req.params.id).lean();
  if (!out) return res.status(404).json({ message: "Not found" });
  res.status(204).end();
}));

export default router;
