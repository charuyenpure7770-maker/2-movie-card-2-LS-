const cl = console.log;
const form = document.getElementById("form");
const movieContainer = document.getElementById("movieContainer");
const nameControl = document.getElementById("name");
const image = document.getElementById("image");
const discription = document.getElementById("discription");
const rating = document.getElementById("rating");
const backdrop = document.getElementById("backdrop");
const closeBtn = document.getElementById("closeBtn");
const icon = document.getElementById("icon");
const movieModel = document.getElementById("movieModel");
const addBtn = document.getElementById("addBtn");


// // database(Local storage)
// let movieArr = [{id:"101",movieName:"Uri",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn3j6yRS5UxRBTz7aDMeOgwAv2E4TLhq-wzfNRz2tipw&s=10",discription:"The movie is divided into clear chapters tracking the escalation of conflict.", rating:4}];
// localStorage.setItem("movieArr",JSON.stringify(movieArr));

let movieArr = JSON.parse(localStorage.getItem("movieArr")) || [];
cl(movieArr);
//functinality 

function onClickBtn() {
   backdrop.classList.toggle("active");
   movieModel.classList.toggle("active");  
}

function showUi(arr) {
   let result = ``;
   arr.forEach(ele => {
      result += ` <div class="col-md-3 mt-4">
              <div class="card movie-card" id="${ele.id}">
                <div class="card-header d-flex justify-content-between">
                   <h4 class="m-0">${ele.movieName}</h4>
                    <h5 class="m-0"><span class="badge badge-success">${ele.rating}</span></h5>   
               </div>
               <div class="card-body">
                  <figure>
                  <img src="${ele.image}" alt="${ele.movieName}">
                     <figcaption>
                        <h3>${ele.movieName}</h3>
                         <p>${ele.discription}</p>
                     </figcaption>
                  </figure>
               </div>
               <div class="card-footer d-flex justify-content-between">
                  <button class="btn btn-sm netflix-sec-color">Edit</button>
                  <button class="btn btn-sm netflix-pri-Color">Delete</button>
               </div>
              </div>
         </div>`
   });
   movieContainer.innerHTML = result;
}
showUi(movieArr);
//create
function createDiv(obj) {
   let div = document.createElement("div");
   div.id = obj.id;
   div.className = "col-md-3 mt-4"
   div.innerHTML = `<div class="card movie-card" id="${obj.id}">
                <div class="card-header d-flex justify-content-between">
                   <h4 class="m-0">${obj.movieName}</h4>
                    <h5 class="m-0"><span class="badge badge-success">${obj.rating}</span></h5>   
               </div>
               <div class="card-body">
                  <figure>
                  <img src="${obj.image}" alt="${obj.movieName}">
                     <figcaption>
                        <h3 class="m-0">${obj.movieName}</h3>
                         <p>${obj.discription}</p>
                     </figcaption>
                  </figure>
               </div>
               <div class="card-footer d-flex justify-content-between">
                  <button class="btn btn-sm netflix-sec-color">Edit</button>
                  <button class="btn btn-sm netflix-pri-Color">Delete</button>
               </div>
              </div>`;
   movieContainer.append(div);
  
}

function onAddMovie(eve) {
   eve.preventDefault();
   let obj = {
      id: crypto.randomUUID(),
      movieName: nameControl.value,
      image: image.value,
      discription: discription.value,
      rating: rating.value
   }
   movieArr.push(obj);
   localStorage.setItem("movieArr", JSON.stringify(movieArr));
   createDiv(obj);
   onClickBtn();
   form.reset();
}
backdrop.addEventListener("click", onClickBtn);
closeBtn.addEventListener("click", onClickBtn);
icon.addEventListener("click", onClickBtn);
addBtn.addEventListener("click", onClickBtn);
form.addEventListener("submit", onAddMovie);