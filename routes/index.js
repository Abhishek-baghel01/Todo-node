var express = require("express");
var router = express.Router();
const { v4: uuidv4 } = require("uuid");

var Local_DB = [];

/* GET home page.  */
router.get("/", function (req, res, next) {
  res.render("show", { tasks: Local_DB });
});

router.get("/create", function (req, res, next) {
  res.render("create");
});

router.post("/add", function (req, res, next) {
  const { title, desc } = req.body;

  if (title.length < 1 || desc.length < 4) {
    res.send(
      " <h1>  Length of Title and Description must be atleast 1 and 4 respectively </h1><a href='/create'>Back</a>"
    );
  }

  NewTAsk = {
    id: uuidv4(),
    deadline: new Date().toLocaleDateString(),
    desc: req.body.desc,
    title: req.body.title,
  };
  Local_DB.push(NewTAsk);
  res.redirect("/");
});

router.get("/delete/:id", function (req, res, next) {
  const id = req.params.id;
  const filteredtask = Local_DB.filter(function (task) {
    if (task.id !== id) {
      return task;
    }
  });
  Local_DB = filteredtask;
  res.redirect("/");
});

module.exports = router;
