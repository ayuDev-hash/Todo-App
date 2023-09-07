import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

let newsItems = [];

app.get("/", (req, res) => {
  res.render("index", { listItem: newsItems });
});

app.post("/add", (req, res) => {
  let newItem = req.body.newItems.trim();
  let dueDate = req.body.dueDate;
  const newStatus = req.body.status

  if (newItem === "") {
    // Handle the case where the newItem is blank (e.g., display an error message)
    res.render("index", {
      listItem: newsItems,
      errorMessage: "Please enter a non-empty item.",
    });
  } else {
    // Add the newItem to the list only if it's not blank

    const task = {
      item: newItem,
      date: dueDate,
      completed: newStatus === 'completed' 
    };

    newsItems.push(task);
    res.redirect("/");
  }
});


app.post("/delete", function (req, res) {
  // DELETEbtn
  if (req.body.delete) {
    if (req.body.delete) {
      const taskToDelete = req.body.delete;
  
      // Remove the task from the newsItems array
      newsItems = newsItems.filter(task => task.item !== taskToDelete);
    }
  }
  //items is my array where I'm storing the newly added to-do list items.
  res.redirect("/");
});

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});
