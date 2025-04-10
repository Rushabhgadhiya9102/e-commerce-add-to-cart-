// --------------- N A V B A R ----------------

let lastScrollY = window.scrollY;
const header = document.getElementById("header");

window.addEventListener("scroll", () => {

  if (window.scrollY > lastScrollY) {
    header.style.top = "-120px";
    
  } else {
    header.style.top = "0";

  }

  lastScrollY = window.scrollY;
});

// --------------- N A V B A R ----------------

// -------------- M E G A - D R O P D O W N - M E N U ---------------

let navitems = document.querySelectorAll(".nav-item");

navitems.forEach((item) => {
  const megaMenu = item.querySelector(".mega-menu");

  if(megaMenu){
  item.addEventListener("mouseenter", () => {
    megaMenu.classList.remove("hidden");
  });

  item.addEventListener("mouseleave", () => {
    megaMenu.classList.add("hidden");
  });

  megaMenu.addEventListener("mouseleave", () => {
    megaMenu.classList.add("hidden");
  });

}
});

// -------------- M E G A - D R O P D O W N - M E N U ---------------

// -------------- S L I D E R -------------------

const sliderContainer = document.querySelectorAll(".slider-container");

sliderContainer.forEach((container) => {
  let slider = container.querySelector(".slider");
  let next = container.querySelector(".next");
  let prev = container.querySelector(".prev");

  next.addEventListener("click", () => {
    slider.scrollLeft += 300;
  });

  prev.addEventListener("click", () => {
    slider.scrollLeft -= 300;
  });
});

// -------------- S L I D E R -------------------

// -------------- A D D - T O - C A R T -------------

let home = document.getElementById("mainSection");
let cart = document.getElementById("cartSection");
let cartBtn = document.querySelectorAll(".cart-btn");
let items = document.querySelectorAll(".latest-shoes .slider-item");
let cartItem = JSON.parse(localStorage.getItem("cartItems")) || []

cart.style.display="none";

function toCartPage(){
  home.style.display="none"
  cart.style.display="block"
}

function toHomePage(){
  home.style.display = "block";
  cart.style.display = "none";
}

// ------ MAIN LOGIC --------


cartBtn.forEach((btn) => {
  
  btn.addEventListener("click", (e) =>{

    const item = e.target.closest(".slider-item");
    const itemName = item.querySelector('h5').innerText;
    const itemImage = item.querySelector('img').src;
    const itemPrice = item.querySelector(".price").innerText.replace('MRP: ₹', '').replace(',','');
    const itemDescription = item.querySelector(".description").innerText;

    const existingItem = cartItem.find(cartItem => cartItem.name === itemName);

    if(existingItem){
      existingItem.quantity += 1;
    }
    else{

      let obj = {
        name: itemName,
        image: itemImage,
        price: itemPrice,
        description: itemDescription,
        quantity: 1,
      };

      cartItem.push(obj);
    }

    updateCart();
    toastMsg();
  });

});

function updateCart(){

  const cartContent = document.querySelector(".bag-content")
  cartContent.innerHTML = "";
  let subtotal = 0;

  cartItem.forEach((item)=>{

    const bagItem = document.createElement('div');
    bagItem.classList.add('bag-item');
    bagItem.innerHTML = `
       <div class="flex my-5">
                      <img src="${item.image}" class="w-50 h-50" alt="" />
                      <div class="bag=product-content ms-5">
                        <h5 class="font-semibold text-lg">${item.name}</h5>
                        <p class="text-lg text-slate-500">${item.description}</p>
                        <p class="font-semibold text-lg">₹${item.price}</p>

                        <div class="quantity-button flex items-center gap-3 mt-5">
                          <button class="decrement bg-slate-100 p-2 rounded-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="size-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                            </svg>
                          </button>
                          <span class="text-xl">${item.quantity}</span>
                          <button class="increment bg-slate-100 p-2 rounded-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="size-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

    `;

    const increment = bagItem.querySelector(".increment");
    const decrement = bagItem.querySelector(".decrement");

    cartContent.append(bagItem);
    subtotal += parseFloat(item.price) * item.quantity;

    increment.addEventListener("click",()=>{
      item.quantity+=1;
      updateCart();
    });

    decrement.addEventListener("click",()=>{
      if(item.quantity > 1){
        item.quantity -= 1;
      }else{
        cartItem = cartItem.filter(cartItem => cartItem.name !== item.name);
      }

      updateCart()
    });
  });

  const deliveryCharges = cartItem.length > 0 ? 600 : 0;  
  const total = subtotal + deliveryCharges;
  document.querySelector(".delivery-charges").innerText = `₹${deliveryCharges.toFixed(2)}`;
  document.querySelector(".subtotal-price").innerText = `₹${subtotal.toFixed(2)}`;
  document.querySelector('.total-price').innerText = `₹${total.toFixed(2)}`;

  
  localStorage.setItem("cartItems", JSON.stringify(cartItem));
}

updateCart()

// ------ MAIN LOGIC --------

// -------------- A D D - T O - C A R T -------------

// -------------- T O A S T - M E S S A G E --------------

const toast = document.querySelector(".toast");

function toastMsg(){

  toast.classList.remove("hidden");
  toast.classList.add("opacity-100");
  toast.style.transition = "all 0.3s";

  setTimeout(()=>{

    toast.classList.remove("opacity-100");
    toast.classList.add("opacity-0");
    toast.classList.add("hidden");
    toast.style.transition = "all 0.3s";

  }, 3000)

}

// -------------- T O A S T - M E S S A G E --------------