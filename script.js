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

"http://localhost:5000/create-order",

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

handler:function(response){

alert("Payment Successful");

// OPTIONAL

window.location.href =
"thankyou.html";

}

};

// OPEN PAYMENT

const rzp =
new Razorpay(options);

rzp.open();

});