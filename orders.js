function back(){
    location.href="home.html";
}
orders=JSON.parse(localStorage.getItem("orders"));
document.addEventListener("DOMContentLoaded",function(){
    var x = "";
    if(orders && orders.items && orders.items.length ){
        for(var i = 0; i < orders.items.length; i++){
            var status = "Pending";
            if(orders.deled[i]){
                status = "Delivered";
            } else if(orders.outfordel[i]){
                status = "Out for Delivery";
            } else if(orders.shipped[i]){
                status = "Shipped";
            } else if(orders.payment[i]){
                status = "Order Placed";
            }
            var dateStr = orders.date[i] ? new Date(orders.date[i]).toLocaleString() : "Unknown";
            x += `<div class="order-item">
                <h2>${orders.items[i]}</h2>
                <p><strong>Date:</strong> ${dateStr}</p>
                <p><strong>Status:</strong> ${status}</p>
            </div>`;
        }
    } else {
        x = "<p>No orders found.</p>";
    }
    const y=document.body.getElementsByTagName("article");
    y[0].innerHTML=x;
});