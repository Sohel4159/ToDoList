const express = require('express');

var app = express();

const bodyparser = require("body-parser");

const mongoose = require("mongoose");
const { name } = require('ejs');

app.use(bodyparser.urlencoded({
    extends: true
}));

app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/toDoList", { useNewUrlParser: true });

const itemsSchema = {
    name: String
};


const Item = mongoose.model("Item", itemsSchema);

var today = new Date();

// var a = today.getDay();
// var day = "";
// var date = today.getDate();
// var month = today.getMonth();
// var year = today.getFullYear();
//;
// }

var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
}

var day = today.toLocaleDateString("en-US", options);



// var Item1 = new Item({ name: "Sohel" });

// var Item2 = new Item({ name: "Samir" });

// var Item3 = new Item({ name: "Danish" });

// const arr = [Item1, Item2, Item3];

// var items = [];

// Item.findOneAndDelete({ name: "Sohel" });

// Item.insertMany(arr);

// Item.find({}).then(function(foundItems) {
//     foundItems.forEach(function(obj) { items.push(obj.name) });
// }).catch(function(err) { console.log(err) });



app.set('view engine', 'ejs');

app.get("/", function(req, res) {

    Item.find({}, 'name').then(function(foundItems) {

        res.render("index", { ListTitle: day, newItems: foundItems });
    })

});



app.post("/", function(req, res) {


    const item = req.body.newItem;

    Item.create({ name: item })

    res.redirect("/");

});

app.post("/delete", function(req, res) {
    // console.log(req.body.checkbox);
    Item.findByIdAndRemove({ _id: req.body.checkbox }).then(function(deletedItem) {

    });
    res.redirect("/");
});





app.listen(3000, function() {
    console.log("server is running");
});