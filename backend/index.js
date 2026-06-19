require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const auth = require("./middleware/auth")


const app = express();
app.use(cors());
app.use(express.json());
const createSlug = require("./util/slugify");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// 1. Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

//2. Set Up player Schema
const playerSchema = new mongoose.Schema({
     Name: String,
     Image: String,
     Height: String,
     HighSchool: String,
     Commitment: String,
     Rank: Number, 
     Position: String,
     Class: Number,
     Aau: String,
     Slug: String

})
// Create a player model use this model to create and update players
const Player = mongoose.model("Player", playerSchema);

//set up article schema
const articleSchema = new mongoose.Schema({
  title: String,
  author: String,
  createdAt: {type: Date, default: Date.now},
  body: String,
  Players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: Player
  }],
  image: String
});

//Create Article model
const Article = mongoose.model("Article", articleSchema);

// UserSchema
const userSchema = new mongoose.Schema({
  name: String,
  email: {type: String,
          required : true,
          unique: true},
  phone: String,
  token: String,
  password : {type: String,
              required: true},
  role: String,
  image: String
})

//Create new User Model
const User = mongoose.model("User", userSchema);

//route creates user
app.post("/createuser",auth, async (req,res)=>{

  try {
    const password =  await bcrypt.hash(req.body.password,10)
    req.body.password = password
    const user = await User.create(req.body)
    res.json({message:" Player created "})

  } catch (error) {
    console.log(error)
    res.json({message:"Player not created "+ error})
  }
  


})
// creates a new player
app.post("/createplayer",auth, async(req,res) => {

  req.body.Slug = createSlug(req.body.Name)
  try {
    await Player.create(req.body);
  } catch (error) {
    console.log(error);
  };
  res.json({
    mesage: " Player Created"
  })
});

// create a new Article

app.post("/createarticle",auth,async (req,res)=>{
  try {
    const article = req.body;
    await Article.insertOne(article);

    res.json({
      message: "article saved",
      title: article.title
    })
  } catch (error) {
    console.log(error);

  }
})

//imports batch players from excel file
app.post("/imports",upload.single("file"),auth, async (req,res)=> {
  try{   
  const excel = require("xlsx");  
  const excelFile = req.file.path;
  const workbook = excel.readFile(excelFile);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = excel.utils.sheet_to_json(worksheet);
  
  // Add slug field replace all spaces with _
  data.forEach( p =>{
  p.Slug = createSlug(p.Name);
  });

  await Player.deleteMany({});
  await Player.insertMany(data);
  
  res.json({
    message: "Excel file uploaded" ,
    count: data.length
  });
  }catch(err){
    console.log(err);
    res.status(500).json({error: "import failed"});
  }
});

// Login User by email and password

app.post("/login", async(req,res)=>{

  const user =  await User.findOne({email:req.body.email})
  try {
    const loggedIn = await bcrypt.compare(req.body.password,user.password)
    if(!loggedIn){
      req.json({message:"Invalid Credentials"})
    }
    
  } catch (error) {
    console.log(error)
    res.json({message:"email or password inccorect"})
  }
  const token = jwt.sign({id:user._id,role:user.role,name:user.name},process.env.JWT_SECRET,
    { expiresIn: "1d" })

  res.json({token: token,
            user: {id:user._id,name:user.name,role:user.role},
            message: "Login Sucessful"})  
})
//Find article by id

app.get("/articles/:id", async(req,res)=>{
  try {
    const article = await Article.findById(req.params.id).populate("Players");
    res.json(article);

  } catch (error) {
    console.log(error, "can not find article");
  }
  
});
  

// Find player by unique ID in mongo Db
app.get("/player/:id", async (req,res)=>{
  try {
    const player = await Player.findById(req.params.id);
    res.json(player);
  } catch (error) {
    console.log(" can not find player");
  }
  
});

//Get all articles
app.get("/news", async(req,res)=>{

  try {
    const articles = await Article.find().sort({createdAt:-1});
    res.json(articles);

  } catch (error) {
    console.log(error);
    res.status(500).json({error: "can not load articles"})
  }

})


//get all players
app.get("/players", async (req, res) => {
  try {
    // find all players from MongoDB and turn into json 
  const players = await Player.find().sort({Rank:1});

  res.json(players);

  } catch (error) {
    console.log(error);;
    res.status(500).json({error: "could no load players"})
  }
  
});

// update player by ID
app.put("/updateplayer/:id", auth, async(req,res)=>{

  try {
    console.log(req.params.id);
    console.log("sherwyn");
    const player = await Player.findByIdAndUpdate(req.params.id,req.body,{new: true});
    
    if(!player){
      return res.status(404).json({
        error: "Player not found"
      })
    }
    res.json({
      message: "Player Updated rihgt now",
      player: player
      });
  } catch (error) {
    console.log("can not be updated")
  }
  
});

//delete an article by id

app.delete("/articles/delete/:id", auth,async(req,res)=>{
  try {
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);
    if(!deletedArticle){
      return  res.status(404).json({error: "can not find article"})
    }
    res.json({title: deletedArticle.title, message:"has been deleted"});

  } catch (error) {
      console.log(error,"could not delete article")
  }
});

//delete player by id
app.delete("/delete/:id", auth, async (req,res)=>{
  try{
    const deletedPlayer = await Player.findByIdAndDelete(req.params.id);

    if(!deletedPlayer){
      return res.status(404).json({ error: "player not found" });
    }
    res.json({message: "player deleted",
              player: deletedPlayer});
  }catch(err){
    console.log(err);
    res.status(500).json({error: "Could Not delete player"})
  }
});
//update an article
app.put("/articles/update/:id",auth, async(req,res)=>{
  try {
    const updatedArticle = await Article.findByIdAndUpdate(req.params.id,req.body,{returnDocument:"after"});
    if(!updatedArticle){
      return res.status(404).json({error:"article not found"});
    }
    res.json(updatedArticle);
  } catch (error) {
    console.log(error);
  }

});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(" server Started " + PORT);
});





  
