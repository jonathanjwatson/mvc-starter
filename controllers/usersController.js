const express = require("express");
const router = express.Router();

// /api/users/
router.post("/", (req, res) => {
  res.json({
    message: "Post route",
  });
});

// /api/users/:id
router.put("/:id", (req, res) => {
  res.json({
    message: "Put route",
  });
});

// /api/users/:id
router.delete("/:id", (req, res) => {
  res.json({
    message: "Delete route",
  });
});

module.exports = router;
