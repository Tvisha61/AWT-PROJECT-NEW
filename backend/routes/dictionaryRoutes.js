// // routes/dictionaryRoutes.js
// const express = require("express");s
// const router = express.Router();
// const { getMeaning, getHistory } = require("../controllers/dictionaryController");

// router.get("/meaning/:word", getMeaning);
// router.get("/history", getHistory);    

// module.exports = router;
const express = require("express");
const { searchWord } = require("../controllers/dictionaryController");

const router = express.Router();

router.post("/search", searchWord);

module.exports = router; // ✅ Use CommonJS export
