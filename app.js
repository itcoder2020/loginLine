const app = require('express')();
let PORT  = 80 || process.env.PORT
const {authorize,requestAccessToken,getAllProfile} = require('./service/lineApi')


app.get('/callback', async (req, res, next) => {
    try {
    let code = req.query.code
    let token = await requestAccessToken(code)
    if(token == false){
        res.redirect("/login")
    }

    let profile = await getAllProfile(token)

    res.json(profile)
} catch (error) {
        
}

})
app.get('/login',(req,res,next)=>{
    res.redirect(authorize())
    next();
})
app.listen(PORT,()=>{
    console.log('Start PORT '+ PORT)
})
