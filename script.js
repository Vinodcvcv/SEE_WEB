var usersdata={
     users : ["admin","Vinod","Sudhanva",""],
     password : ["admin123","Vinu1234","sudh@123",""],
     emails : ["NA","NA","NA",""],
     adress: ["NA","NA","NA",""],
     bankdetails : ["NA","NA","NA",""]
};
var cart={lists:[],
    prices:[]};

var i;

function nav(){
    var x = document.getElementById("vis");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
   
    


}
function signup(){
 var f=document.querySelector("form");
 f.innerHTML=`<h1>Sign Up</h1>
 <input type="text" id="name" placeholder="Username" required>
 <input type="password" id="password" placeholder="Password" required>
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
    i=idx;
    if(idx!=-1 && usersdata.password[idx]===pwd){
        alert("Login successful. Welcome to Plutomart!"+uname);
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
    if(usersdata.users.indexOf(uname)!=-1){
        alert("Username already exists! Please choose a different username.");
        return;
    }
    usersdata.users.push(uname);
    usersdata.password.push(pwd);
    usersdata.emails.push(email);
    alert("Registration Successful! You can now log in with your credentials.");
    login();
}
document.addEventListener("keydown",function(){
    if(event.key==="Enter"){
        var f=document.querySelector("form");
        var btn=f.querySelector("input[type='button']");
        btn.click();
    }
    if(event.key==="F5"){
        event.preventDefault();
    }

});
document.addEventListener("keydown",function(){
    if(event.key==="F12" || (event.ctrlKey && event.shiftKey && event.key==="I")){
        event.preventDefault();
    }
});
document.body.onchange= function() {
    var products = document.querySelectorAll("#product");
    products.forEach(function(product) {
        product.addEventListener("mouseover", function() {
            var priceSpan = this.querySelector(".ishov");
            if (priceSpan) {
                priceSpan.style.display = "inline";
            }
        });
        product.addEventListener("mouseout", function() {
            var priceSpan = this.querySelector(".ishov");
            if (priceSpan) {
                priceSpan.style.display = "none";
            }
        }); 
    });
};
function Adress(){
    var addr=document.getElementById("address").value;
    usersdata.adress[i]=addr;
    alert("Address saved successfully!");
    document.getElementById("address").value=addr;
}
function Settings(){
    document.body.innerHTML=`<main>
    <button onclick="back()">&#8592; Back</button>
    <h1>Settings</h1>
    <h2>Adress</h2>
    <input type="text" placeholder="Enter your address" id="address"><button onclick="Adress()">Update</button>
    <h2>Link Bank account</h2>
    <input type="text" placeholder="Enter your bank account number"><button onclick="bank()">Link</button>
    <h2>Change Password</h2>
    <input type="password" placeholder="Enter new password">
    <br>
    <input type="password" placeholder="Confirm new password">
    <br>
    <button onclick="changepass()">Change Password</button>
    <button onclick="location.reload()">Logout</button>
</main>
<script src="script.js"></script>`;
document.getElementById("address").value=usersdata.adress[i];
}
function back(){
    document.body.innerHTML=` <strong id="Welcome">Hi , Vinod<span id="Settings" onclick="Settings()">Settings</button></strong>
    <div id="logo"><h2>Pluto<strong>Mart</strong></h2></div>
    <main>
        <nav><button onclick="nav()" id="btn"> </button><input id="search" placeholder="Search....">
        <div id="vis">
            <button onclick="food()">Food</button>
            <button onclick="clothes()">Clothes</button>
            <button onclick()="electronics">Electronics</button>
            <button onclick()="toys()">Toys</button>
            <button onclick()="books()">Books</button>
        </div> 
        </nav>
        <div id="top-products">
            <div id="product"><img src="imgs/elec/phone.jpeg" alt=""><span>Smartphones</span><button onclick="addtocart('smart phone','200')">Add to cart</button><span class="ishov">$200</span></div>
            <div id="product"><img src="imgs/clothes/accessories.jpg" alt=""><span>Accessories</span><button onclick="addtocart('jacket','50')">Add to cart</button><span class="ishov">$50</span></div>
            <div id="product"><img src="imgs/clothes/download.jpg" alt=""><span>Clothes</span><button onclick="addtocart('pant shirt','40')">Add to cart</button><span class="ishov">$40</span></div>
            <div id="product"><img src="imgs/clothes/shirt.jpeg" alt=""><span>Trending Outfits</span><button onclick="addtocart('shirt','35')">Add to cart</button><span class="ishov">$35</span></div>
            <div id="product"><img src="imgs/toys/doll.jpeg" alt=""><span>Toys</span><button onclick="addtocart('teddy bear','15')">Add to cart</button><span class="ishov">$15</span></div>
            <div id="product"><img src="imgs/books/novel.jpg" alt=""><span>Novel Books</span><button onclick="addtocart('novel book','10')">Add to cart</button><span class="ishov">$10</span></div>
            <div id="product"><img src="imgs/food/biriyani.jpeg" alt=""><span>Biriyani</span><button onclick="addtocart('pizza','25')">Add to cart</button><span class="ishov">$25</span></div>
            <div id="product"><img src="imgs/food/masaladosa.jpeg" alt=""><span>Masala Dosa</span><button onclick="addtocart('masala dosa','15')">Add to cart</button><span class="ishov">$15</span></div>
            <div id="product"><img src="imgs/food/samosa.jpeg" alt=""><span>Samosa</span><button onclick="addtocart('samosa','5')">Add to cart</button><span class="ishov">$5</span></div>
            <div id="product"><img src="imgs/food/donut.jpeg" alt=""><span>Donut</span><button onclick="addtocart('donut','20')">Add to cart</button><span class="ishov">$20</span></div>

    </div>
    </main>
    <script src="script.js"></script>`;
    document.getElementById("Welcome").innerHTML=`Hi, ${uname}<span id="Settings" onclick="Settings()">Settings</span><span onclick="viewcart()"> View Cart</span>`;
    }
function addtocart(item,price){
    alert(item+" added to cart! Price: $"+price);
    cart.lists.push(item);
    cart.prices.push(price);

}
var total=0;    
function viewcart(){
    total=0;
    var cartcontent="<main><h1>Your Cart</h1><ul>";
    for(var j=0;j<cart.lists.length;j++){
        cartcontent+=`<li>${cart.lists[j]} - $${cart.prices[j]}</li>`;
        total+=Number(cart.prices[j]);
    }
    cartcontent+=`</ul><h2>Total: $${total}</h2>
    <button onclick="pay()">Proceed to Pay</button>
    <button onclick="back()">Continue Shopping</button></main>`;
    document.body.innerHTML=cartcontent;
}
function pay(){
    var addr=usersdata.adress[i];
    if(addr==="NA" || addr===""){
        alert("Please update your address in settings before proceeding to pay.");
        Settings();
        return;
    }
    if(cart.lists.length===0){
        alert("Your cart is empty! Please add items to your cart before proceeding to pay.");
        back();
        return;
    }
    if(total){
        document.body.innerHTML=`<main>
        <h1>Pay $${total}</h1>
        <input type="text" placeholder="UPI ID"><br>
        <input type="text" placeholder="Card Number">
        <input type="text" placeholder="Expiry Date">
        <input type="text" placeholder="CVV"><br>
        <button onclick="confirmorder()">Confirm Payment</button>
        <button onclick="viewcart()">Back to Cart</button>

        <h1>Your order will be delivered to: ${addr}</h1>
    </main>`;
    }
}
function confirmorder(){
    alert("Payment Successful! Your order has been placed.");
    cart.lists=[];
    cart.prices=[];
    back();
}
function food(){
    document.body.innerHTML=`
    <button onclick="back()"> &#8592;back</button>
    <main>
    <div id="top-products">
     <div id="product"><img src="imgs/food/masaladosa.jpeg" alt=""><span>Masala Dosa</span><button onclick="addtocart('masala dosa','15')">Add to cart</button><span class="ishov">$15</span></div>
     <div id="product"><img src="imgs/food/biriyani.jpeg" alt=""><span>Biriyani</span><button onclick="addtocart('Biriyani','50')">Add to cart</button><span class="ishov">$50</span></div>
    </div>
    </main>
    <script src="script.js"></script>
    `;
}