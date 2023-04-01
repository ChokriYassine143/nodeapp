const express=require("express");
const bodyp= require("body-parser");
const requuest=require("request");
const https=require("https");
app=express();
app.use(bodyp.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",(req,res)=>{
res.sendFile(__dirname+"/signup.html");

});
app.post("/",(req,res)=>{

    
const email=(req.body.email);
const fname=(req.body.fname);
const lname=(req.body.lname);
const data={
    members:[
        {
email_address:email,
status:"subscribed",
merge_fields:{FNAME:fname,LNAME:lname}
        }
    ]
}
const url = "https://us9.api.mailchimp.com/3.0/lists/1b39db282e";
const option={
    method:"POST",
    auth:"yassine:a075c53afc4189a517faef36dbdf4852-us9"
};
const jsonData=JSON.stringify(data);
const requ=https.request(url,option,(resp)=>{
resp.on("data",(data)=>{
    if (resp.statusCode===200){
        res.sendFile(__dirname+"/success.html");
    }
    else {
        res.sendFile(__dirname+"/failure.html");
    }
    console.log(JSON.parse(data));
});

});
requ.write(jsonData);
requ.end();
});
app.post("/failure",(reqq,ress)=>{
   ress.redirect("/");
});
app.listen(process.env.PORT || 3000,(req,res)=>{

    console.log("working");
});
//a075c53afc4189a517faef36dbdf4852-us9
//1b39db282e