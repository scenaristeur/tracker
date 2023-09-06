const express = require("express");
var cors = require('cors');
const fs = require("fs");
const app = express();
//this line is required to parse the request body
app.use(express.json());
app.use(cors({
    origin: '*'
  }));
/* Create - POST method */
app.post("/habit/add", (req, res) => {
  //get the existing habit data
  const existHabits = getHabitData();

  //get the new habit data from post request
  const habitData = req.body;
  console.log(habitData);
  //check if the habitData fields are missing
  if (
    habitData.habit_id == null ||
    habitData.title == null ||
    habitData.category == null ||
    habitData.begin == null ||
    habitData.end == null ||
    habitData.goal == null
  ) {
    return res.status(401).send({ error: true, msg: "Habit data missing" });
  }

  //check if the habit_id exist already
  const findExist = existHabits.find(
    (habit) => habit.habit_id === habitData.habit_id
  );
  if (findExist) {
    return res.status(409).send({ error: true, msg: "habit_id already exist" });
  }
  //append the habit data
  existHabits.push(habitData);
  //save the new habit data
  saveHabitData(existHabits);
  res.send({ success: true, msg: "Habit data added successfully" });
});
/* Read - GET method */
app.get("/habit/list", (req, res) => {
  const habits = getHabitData();
  res.send(habits);
});
/* Update - Patch method */
app.patch("/habit/update/:habit_id", (req, res) => {
  //get the habit_id from url
  const habit_id = req.params.habit_id;
  //get the update data
  const habitData = req.body;
  //get the existing habit data
  const existHabits = getHabitData();
  //check if the habit_id exist or not
  const findExist = existHabits.find((habit) => habit.habit_id === habit_id);
  if (!findExist) {
    return res.status(409).send({ error: true, msg: "habit_id not exist" });
  }
  //filter the habitdata
  const updateHabit = existHabits.filter(
    (habit) => habit.habit_id !== habit_id
  );
  //push the updated data
  updateHabit.push(habitData);
  //finally save it
  saveHabitData(updateHabit);
  res.send({ success: true, msg: "Habit data updated successfully" });
});
/* Delete - Delete method */
app.delete("/habit/delete/:habit_id", (req, res) => {
  const habit_id = req.params.habit_id;
  //get the existing habitdata
  const existHabits = getHabitData();
  //filter the habitdata to remove it
  const filterHabit = existHabits.filter(
    (habit) => habit.habit_id !== habit_id
  );
  if (existHabits.length === filterHabit.length) {
    return res
      .status(409)
      .send({ error: true, msg: "habit_id does not exist" });
  }
  //save the filtered data
  saveHabitData(filterHabit);
  res.send({ success: true, msg: "Habit removed successfully" });
});
/* util functions */
//read the habit data from json file
const saveHabitData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync("habits.json", stringifyData);
};
//get the habit data from json file
const getHabitData = () => {
  const jsonData = fs.readFileSync("habits.json");
  return JSON.parse(jsonData);
};
/* util functions ends */
//configure the server port
app.listen(5000, () => {
  console.log("Server runs on port 5000");
});
