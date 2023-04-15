require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose= require("mongoose");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const date= require(__dirname+ "/date.js")  //Requiring our new Custom "date" module we created
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const PORT= process.env.PORT || 3000;
//to avoid the warning inside our console
mongoose.set("strictQuery",false);
const connectDB= async ()=>{
  try {
      const connect= mongoose.connect(process.env.MONGO_URI);
      console.log("Successfully connected to mongoDB");
  } catch (error) {
      console.log(error);
      process.exit(1);
  }
}
/*Step 1: Connect to a mongoDB */
// mongoose.connect("mongodb://127.0.0.1:27017/blogDB");



/*Step 1 b): Create a Schema and a model for our new database */
const postsSchema=new mongoose.Schema(
  {
    title: String,
    content: String
  }
);

const Post= new mongoose.model("Post",postsSchema);




app.get("/", function (req, res) {
  /* Step 2 : When you go to localhost:3000 you should see the posts you created in the compose page. */
  Post.find().then(function(result){
    //the result would be an array of type objects which we can tap into.
    res.render("home", { startingContent: homeStartingContent, posts:result });

  })
  .catch(function(err){
    console.log(err);
  })
  


});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
})

app.get("/posts/:postId", function (req, res) {
  const day=date.getDate();
  const requestedTitle = req.params.postId
  Post.findOne({_id: requestedTitle}).then(function(result){
    res.render("post", {title:result.title, content: result.content, id:result._id, date:day})
  })
  .catch(function(err){
    console.log(err);
  })
  
})

app.post("/compose", function (req, res) {

/*Step 1 c): Save the Title and content the user types into the input fields on /compose page into our database collection */
  const post=new Post({
    title:req.body.postTitle,
    content: req.body.postBody
  });
/*Step 3: At the moment, when you compose a post and redirect to the root route, sometimes the post is not yet saved and 
doesn’t show up on the home page.
Solution: Add a callback to the save method to only redirect to the home page once save is complete with no errors. */
  post.save().then(function(){
    res.redirect("/");
  }).catch(function(err){
    console.log(err);
  })
  
});

app.post("/delete",function(req,res){

  // console.log(req.body.deleteButton)

  const selectedPost=req.body.deleteButton;
  Post.findByIdAndDelete(selectedPost).then(function(){
    console.log("Successfully deleted the post!");
    res.redirect("/");
  })
  .catch(function(err){
    console.log(err);
  })
 
});

connectDB().then(function(){

  app.listen(PORT, function () {
      console.log(`Server started listening on ${PORT}`);
  });

}) 