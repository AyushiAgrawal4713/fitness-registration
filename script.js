// ACTIVE PLAN CARD EFFECT

const planCards =
document.querySelectorAll(".plan-card");

planCards.forEach((card)=>{

card.addEventListener("click",()=>{

planCards.forEach((c)=>{

c.classList.remove("active");

});

card.classList.add("active");

});

});

// FORM SUBMIT

document
.getElementById("fitnessForm")

.addEventListener(
"submit",

async function (e) {

e.preventDefault();

// SELECTED INSTALLMENT

const selectedPlan =
document.querySelector(
'input[name="plan"]:checked'
);

// VALIDATION

if (!selectedPlan) {

alert(
"Please select a plan/installment"
);

return;

}

// PLAN DETAILS

const amount =
selectedPlan.value;

const planName =
selectedPlan.dataset.plan;

// FORM VALUES

const fullName =
document.querySelector(
'input[placeholder="Full Name"]'
).value;

const phone =
document.querySelector(
'input[placeholder="WhatsApp Number"]'
).value;

const email =
document.querySelector(
'input[placeholder="Email Address"]'
).value;

// GOAL VALUE

const goal =
document.querySelector("select").value;

// GOOGLE SHEET URL

const sheetURL =
"https://script.google.com/macros/s/AKfycbyNu5eVOOzXgrnye9HEUncXibSQX2szTX8UJSGg41l0ItjDdkRwa24iaY8Xw8jmJ_PZ0w/exec";

// SAVE PENDING LEAD

try {

await fetch(sheetURL, {

method: "POST",

mode: "no-cors",

headers: {

"Content-Type":
"application/json"

},

body: JSON.stringify({

name: fullName,

phone: phone,

email: email,

goal: goal,

plan: planName,

status: "Pending",

payment_id: ""

})

});

console.log(
"Pending Saved"
);

} catch (error) {

console.log(
"Pending Error:",
error
);

}

// CREATE ORDER

const response =
await fetch(

"https://fitness-registration.onrender.com/create-order",

{

method: "POST",

headers: {

"Content-Type":
"application/json"

},

body: JSON.stringify({

amount: amount

})

}

);

// ORDER RESPONSE

const order =
await response.json();

// RAZORPAY OPTIONS

const options = {

key:
"rzp_test_SsJ41JxFErdV4O",

amount:
order.amount,

currency:
"INR",

name:
"Fitness Coaching",

description:
planName,

order_id:
order.id,

theme: {

color:"#000000"

},

// SUCCESS PAYMENT

handler:
async function(response){

try {

await fetch(sheetURL, {

method:"POST",

mode:"no-cors",

headers:{

"Content-Type":
"application/json"

},

body: JSON.stringify({

name: fullName,

phone: phone,

email: email,

goal: goal,

plan: planName,

status:"Paid",

payment_id:
response
.razorpay_payment_id

})

});

console.log(
"Paid Saved"
);

} catch(error){

console.log(
"Paid Error:",
error
);

}

alert(
"Payment Successful"
);

window.location.href =
"thankyou.html";

}

};

// OPEN PAYMENT

const rzp =
new Razorpay(options);

// PAYMENT FAILED

rzp.on(
"payment.failed",

async function(response){

try {

await fetch(sheetURL, {

method:"POST",

mode:"no-cors",

headers:{

"Content-Type":
"application/json"

},

body: JSON.stringify({

name: fullName,

phone: phone,

email: email,

goal: goal,

plan: planName,

status:"Failed",

payment_id:""

})

});

console.log(
"Failed Saved"
);

} catch(error){

console.log(
"Failed Error:",
error
);

}

alert(
"Payment Failed"
);

}

);

// OPEN POPUP

rzp.open();

}

);
window.addEventListener(
"scroll",
function(){

const hero =
document.querySelector(".hero");

hero.style.backgroundPositionY =
window.pageYOffset * 0.5 + "px";

}
);