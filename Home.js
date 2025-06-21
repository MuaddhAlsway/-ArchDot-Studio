//step 1: get DOM
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 7000;

nextDom.onclick = function(){
    showSlider('next');    
}

prevDom.onclick = function(){
    showSlider('prev');    
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext)
function showSlider(type){
    let  SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext)
}


  const container = document.getElementById('scrollContent');
  container.innerHTML += container.innerHTML;

window.addEventListener("scroll", () => {
  const scrollUp = document.getElementById("scroll-up");
  if (window.scrollY >= 350) {
    scrollUp.classList.add("show-scroll");
  } else {
    scrollUp.classList.remove("show-scroll");
  }
});

// Check that firebase is loaded
console.log("Firebase object:", firebase);

// Your Firebase config - make sure this matches your project exactly
const firebaseConfig = {
  apiKey: "AIzaSyDW2BWFp5EvQmfMPUvgNYaqmYde0S49uOI",
  authDomain: "form-archdot.firebaseapp.com",
  projectId: "form-archdot",
  storageBucket: "form-archdot.appspot.com",
  messagingSenderId: "614347302945",
  appId: "1:614347302945:web:f3491281632234c7265b60"
};

// Initialize Firebase App
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Subscribe function to be called on button click
function subscribe() {
  const emailInput = document.getElementById('subscriber-email');
  const email = emailInput.value.trim();

  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Add email to Firestore collection 'subscribers'
  db.collection('subscribers').add({
    email: email,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then((docRef) => {
    console.log('Document written with ID:', docRef.id);
    alert('Thank you for subscribing!');
    emailInput.value = '';
  })
  .catch((error) => {
    console.error('Error adding document:', error);
    alert('Error saving email: ' + error.message);
  });
}
