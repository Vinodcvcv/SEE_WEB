var usersdata;

var jud=localStorage.getItem("usersdata");
if(!jud){
    usersdata={
     users : [],
     password : [],
     emails : [],
     adress: [],
     bankdetails : [],
     isloggedin:false,
     i:""
};
}
else{
    usersdata=JSON.parse(jud);
}
if(!localStorage.getItem("cart")){
var cart={lists:[],
    prices:[]};
localStorage.setItem("cart",JSON.stringify(cart));

}


function signup(){
 var f=document.querySelector("form");
 f.innerHTML=`<h1>Sign Up</h1>
 <input type="text" id="name" placeholder="Username" required>
 <input type="password" id="password" placeholder="Password (min 8 characters)" required>
 <input type="email" id="email" placeholder="Email" required>
 <input type="button" value="Sign Up" onclick="tryreg()">
 <div>already have an account? <strong onclick="login()">Login</strong></div>`;
}
function login(){
    var f=document.querySelector("form");
    f.innerHTML=`<h1>Login</h1>
    <input type="text" id="name" placeholder="Username" required>
    <input type="password" id="password" placeholder="Password" required>
    <input type="button" value="Login" onclick="trylog()">
    <div>dont have an account? <strong onclick="signup()">Sign up</strong></div>`;
}
var uname;
function trylog(){
    uname=document.getElementById("name").value;
    var pwd=document.getElementById("password").value;
    var idx=usersdata.users.indexOf(uname);
    idx;
    if(idx!=-1 && usersdata.password[idx]===pwd){
        alert("Login successful. Welcome to Plutomart!"+uname);
        usersdata.isloggedin=true;
        usersdata.i=idx;
        localStorage.setItem("usersdata",JSON.stringify(usersdata));
        back();
    }
    else{
        alert("Login Failed! Invalid Credentials");
    }
}
function tryreg(){
    var uname=document.getElementById("name").value;
    var pwd=document.getElementById("password").value;
    var email=document.getElementById("email").value;
    
    // Email validation
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }
    
    // Password length validation
    if (pwd.length < 8) {
        alert("Password must be at least 8 characters long.");
        return;
    }
    
    if(usersdata.users.indexOf(uname)!=-1){
        alert("Username already exists! Please choose a different username.");
        return;
    }
    usersdata.users.push(uname);
    usersdata.password.push(pwd);
    usersdata.emails.push(email);
    usersdata.adress.push("");
    usersdata.bankdetails.push("");
    alert("Registration Successful! You can now log in with your credentials.");
    localStorage.setItem("usersdata",JSON.stringify(usersdata))
    login();
}
document.addEventListener("keydown",function(){
    if(event.key==="Enter"){
        try{
        var f=document.querySelector("form");
        var btn=f.querySelector("input[type='button']");
        btn.click();}
        catch{};
    }

});
document.addEventListener("keydown",function(){
    if(event.key==="F12" || (event.ctrlKey && event.shiftKey && event.key==="I")){
        event.preventDefault();
    }
});



function back(){
    window.location.href="home.html";
    }


if(usersdata.isloggedin){
    back();
}


