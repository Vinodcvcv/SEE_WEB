

const usersdata=JSON.parse(localStorage.getItem("usersdata"));
var uname=usersdata.users[usersdata.i];

var cart=JSON.parse(localStorage.getItem("cart"));
function addtocart(item,price){
    alert(item+" added to cart! Price: ₹"+price);
    cart.lists.push(item);
    cart.prices.push(price);
    localStorage.setItem("cart",JSON.stringify(cart));

}
function viewcart(){
    try{
    var cart=JSON.parse(localStorage.getItem("cart"));
    total=0;
    var cartcontent="<main><h1>Your Cart</h1><ul>";
    for(var j=0;j<cart.lists.length;j++){
        cartcontent+=`<li>${cart.lists[j]} - ₹${cart.prices[j]}</li>`;
        total+=Number(cart.prices[j]);
    }
    cartcontent+=`</ul><h2>Total: ₹${total}</h2>
    <button onclick="pay()">Proceed to Pay</button>
    <button onclick="back()">Continue Shopping</button></main>`;
    document.body.innerHTML=cartcontent;}
    catch{
        document.body.innerHTML="<main><h1>Something went wrong</h1></main>"
    }
}
function back(){
    window.location.href="home.html";
    }
function nav(){
    var x = document.getElementById("vis");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
   
    


}
document.getElementById("search").addEventListener("input",function(e){
    var se=e.target.value.toLowerCase();
    var ele=document.getElementsByTagName("div");
    for(k=0;k<ele.length;k++){
        if(ele[k].innerText.toLowerCase().replace("add to cart","").includes(se)){
            ele[k].style.display="";
        }
        else{
            ele[k].style.display="none";

        }
    }
});
function Settings(){
    document.body.innerHTML=`<main>
    <button onclick="back()">&#8592; Back</button>
    <h1>Settings</h1>
    <h2>Adress</h2>
    <input type="text" placeholder="Enter your address" id="address"><button onclick="Adress()">Update</button>
    <h2>Link Bank account</h2>
    <input type="number" placeholder="Enter your bank account number" id="bankac"><button onclick="bank()">Link</button>
    <h2>Change Password</h2>
    <input type="password" placeholder="Enter Old password" id="old">
    <br>
    <input type="password" placeholder="Enter new password (min 8 characters)" id="new1">
    <br>
    <input type="password" placeholder="Confirm new password" id="new2">
    <br>
    <button onclick="changepass()">Change Password</button>
    <button onclick="logout()">Logout</button>
</main>
<script src="script.js"></script>`;
document.getElementById("address").value=usersdata.adress[usersdata.i];
document.getElementById("bankac").value=usersdata.bankdetails[usersdata.i];
}
function pay(){
    var addr=usersdata.adress[usersdata.i];
    if(addr==="NA" || addr===""){
        alert("Please update your address in settings before proceeding to pay.");
        Settings();
        return;
    }
    if(cart.lists.length==0){
        alert("Your cart is empty! Please add items to your cart before proceeding to pay.");
        back();
        return;
    }
    if(total){
        document.body.innerHTML=`<main>
        <h1>Pay ₹${total}</h1>
        <img src="imgs/pay.jpg"/><br>
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

window.addEventListener("DOMContentLoaded",function(){
    try{
    document.getElementById("Welcome").innerHTML=`Hi, ${uname}<span id="Settings" onclick="Settings()">Settings</span><span onclick="viewcart()"> View Cart</span>`;
}
catch{}
});

function food(){
    filterProducts('food');
}
function clothes(){
    filterProducts('clothes');
}
function electronics(){
    filterProducts('electronics');
}
function toys(){
    filterProducts('toys');
}
function books(){
    filterProducts('books');
}

function filterProducts(category) {
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        if (category === 'all' || product.getAttribute('data-category') === category) {
            product.style.display = '';
        } else {
            product.style.display = 'none';
        }
    });
}

function showAll() {
    filterProducts('all');
}
function confirmorder(){
    alert("Payment Successful! Your order has been placed.");
    cart.lists=[];
    cart.prices=[];
    localStorage.setItem("cart",JSON.stringify(cart));
    back();
}

function Adress(){
    var addr=document.getElementById("address").value;
    usersdata.adress[usersdata.i]=addr;
    localStorage.setItem("usersdata",JSON.stringify(usersdata));
    alert("Address saved successfully!");
    document.getElementById("address").value=addr;
}
function emptycart(){
    var cart=JSON.parse(localStorage.getItem("cart"));
    while(cart.lists.length){
        cart.lists.pop();
        cart.prices.pop();
    }
    localStorage.setItem("cart",JSON.stringify(cart));
    viewcart();
}
function logout(){
    usersdata.isloggedin=false;
    localStorage.setItem("usersdata",JSON.stringify(usersdata));
    location.href="index.html";
}
function bank(){
    var addr=document.getElementById("bankac").value;
    usersdata.bankdetails[usersdata.i]=addr;
    localStorage.setItem("usersdata",JSON.stringify(usersdata));
    alert("Bank details saved successfully!");
    document.getElementById("bankac").value=addr;
}
function changepass(){
    var old=document.getElementById("old").value;
    var new1=document.getElementById("new1").value;
    var new2=document.getElementById("new2").value;
    if(old!=usersdata.password[usersdata.i]){
        alert("incorrect old password!");
        return;
    }
    if(new1.length<8){
        alert("password should have minimum 8 characters");
        return;
    }
    if(new1!=new2){
        alert("new password and confirm password should match!");
        return;
    }
    usersdata.password[usersdata.i]=new1;
    localStorage.setItem("usersdata",JSON.stringify(usersdata));
    alert("Password changed !");
}


