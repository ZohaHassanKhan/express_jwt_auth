const express=require('express')
const app=express()
const jwt=require('jsonwebtoken')
const port=5000
const security_key="security"

app.get('/',(req,res)=>{
    res.send("working!")
})
     
   
app.post('/login', (req, res) => {
    const user = {
        id: "1",
        name: "zoha",
        email: "zoha@gmail.com"
    };

    jwt.sign(user, security_key, (err, token) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error creating JWT' });
        } else {
            console.log(token); // Log the actual token, not 'token'
            res.json({ token });
        }
    });
});
app.use(verifyToken)

app.post('/profile',(req,res)=>{
    jwt.verify(req.token,security_key, (err,authData)=>{
        if(err){
            res.send({
                result:"invalid token"
            })
        }
        else{
            res.json({
                message:"profile accessed",
                authData
            })
        }
    })
})

function verifyToken(req,res,next)
{
 const req_token= req.headers['authorization']
 if(typeof req_token !== "undefined")
 {
     const bearer= req_token.split(" ")
     const token=bearer[1]
     req.token=token
     next() 
 }
 else{
    res.send("Token not available")
 }
}

app.listen(port,()=>{
    console.log(`Server is listening on Port ${port}`);
})