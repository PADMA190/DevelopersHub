const express=require('express');
const mongoose=require('mongoose');
const devuser=require('./devusermodel');
const jwt=require('jsonwebtoken');
const middleware=require('./middleware');
const reviewmodel=require('./reviewmodel');
const cors=require('cors');
const app=express();



//connecting to database
mongoose.connect('mongodb+srv://padmalatchi:ukkiueK5PSk0dD4t@cluster0.fx2gape.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
  
  tls: true
}).then(
    ()=> console.log('DB connected')
)

app.use(express.json());
//cors(cross origin policy helps us to access the routes in the frontend which we have created in the backend properly)
app.use(cors({origin:"*"}));


app.get('/',(req,res)=>{
    return res.send('Hello World!!')
})

//register route
app.post('/register',async(req,res)=>{
    try{
       const {fullname,email,mobile,skill,password,confirmpassword}=req.body;
       const exist=await devuser.findOne({email});
       if(exist){
        return res.status(400).send('User Already Registered');
       }
       if(password!=confirmpassword){
        return res.status(403).send('Password Invalid');
       }
       let newUser=new devuser({
        fullname,email,mobile,skill,password,confirmpassword
       })
       newUser.save();
       return res.status(200).send('User Registered');
    }
    catch(err){
         console.log(err);
         return res.status(500).send('Server Error')
    }
})

//login route
app.post('/login',async(req,res)=>{
    try{
    const {email,password}=req.body;
    const exist=await devuser.findOne({email});
    if(!exist){
        return res.status(400).send('User Not Exist')
    }
    if(exist.password!=password){
        return res.status(400).send('Password Invalid');
    }
    let payload={
        user:{
            id:exist.id
        }
    }
    jwt.sign(payload,'jwtPassword',{expiresIn:360000000},
        (err,token)=>{
           if(err) throw err
           return res.json({token})
        }
    )

    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
})

//allprofiles route
app.get('/allprofiles',middleware,async(req,res)=>{
    try{
        //find method returns all objects in devuser model
        let allprofiles=await devuser.find();
        return res.json(allprofiles);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
})

//myprofile route
app.get('/myprofile',middleware,async(req,res)=>{
    try{
      let user=await devuser.findById(req.user.id);
      return res.json(user);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
})


// Get profile by ID route
app.get('/profile/:id', middleware, async (req, res) => {
    try {
        const user = await devuser.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Server Error');
    }
});



//addreview router
app.post('/addreview',middleware,async(req,res)=>{
    try{
       const {taskworker,rating}=req.body;
       //here we are getting the details of the logged in user using the id stored in the middleware(we haver stored the logged  in user id in req.user. so from there first we are getting detials of the user like by using id req.user.id)
       const exist=await devuser.findById(req.user.id);
       const newReview=new reviewmodel({
        taskprovider:exist.fullname,
        taskworker,rating
       })
       newReview.save();
       return res.status(200).send('Review updated successfully')
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
})

//myreview route
//myreview route
app.get('/myreview', middleware, async (req, res) => {
    try {
      const user = await devuser.findById(req.user.id);
      if (!user) {
        return res.status(400).send('User not found');
      }
      const myreviews = await reviewmodel.find({ taskworker: user.fullname });
      return res.status(200).json(myreviews);
    } catch (err) {
      console.log(err);
      return res.status(500).send('Server Error');
    }
  });
  

//assigning port to run the server
app.listen(5000,()=>console.log('server running..'))