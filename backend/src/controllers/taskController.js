import Task from "../models/Task.js";

// Create Task
export const createTask = async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Task title is required",
      });
    }

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all Task
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Task
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true, 
      }
    );

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: updatedTask,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};