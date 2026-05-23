// PLAN SELECTION EFFECT

const plans =
document.querySelectorAll(".plan-card");

plans.forEach((plan)=>{

plan.addEventListener("click",()=>{

plans.forEach((p)=>{

p.classList.remove("selected");

p.style.opacity = "0.4";

});

plan.classList.add("selected");

plan.style.opacity = "1";

});

});

// FORM SUBMIT + PAYMENT

document
.getElementById("fitnessForm")

.addEventListener("submit",

async function(e){

e.preventDefault();

// SELECTED PLAN

const selectedPlan =
document.querySelector(
'input[name="plan"]:checked'
);

// VALIDATION

if(!selectedPlan){

alert("Please select a plan");

return;

}

// GET AMOUNT

const amount = selectedPlan.value;

const planName =
selectedPlan.dataset.plan;

// CREATE ORDER

const response = await fetch(

"https://fitness-registration.onrender.com/create-order",

{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({

amount: amount

})

}

);

// ORDER RESPONSE

const order = await response.json();

// RAZORPAY OPTIONS

const options = {

key: "rzp_test_SsJ41JxFErdV4O"
,

amount: order.amount,

currency:"INR",

name:"Fitness Coaching",

description: planName,

order_id: order.id,

theme:{
color:"#000000"
},

handler: async function(response){

await fetch(
"https://script.google.com/macros/s/AKfycbyKGHI4MTKBTyR9dp5VDsgo-jbP7BJfOslA-vle4loE3-oStZGZ3mTMdlK2ZTbwuJa_-w/exec",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({

name: document.querySelector(
'input[placeholder="Full Name"]'
).value,

phone: document.querySelector(
'input[placeholder="WhatsApp Number"]'
).value,

email: document.querySelector(
'input[placeholder="Email Address"]'
).value,

goal:
document.querySelectorAll("select")[1].value,

plan: planName,

payment_id:
response.razorpay_payment_id

})

}

);

alert("Payment Successful");

window.location.href =
"thankyou.html";

}

};

// OPEN PAYMENT

const rzp =
new Razorpay(options);

rzp.open();

});