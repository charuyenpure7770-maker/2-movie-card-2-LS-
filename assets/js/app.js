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
const addMovie = document.getElementById("addMovie");
const updateMovie = document.getElementById("updateMovie");


//  //database(Local storage)
// let movieArr = [{id:"101",movieName:"Uri",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn3j6yRS5UxRBTz7aDMeOgwAv2E4TLhq-wzfNRz2tipw&s=10",discription:"The movie is divided into clear chapters tracking the escalation of conflict.", rating:4}];
// localStorage.setItem("movieArr",JSON.stringify(movieArr));

let movieArr = JSON.parse(localStorage.getItem("movieArr")) || [];
cl(movieArr);
// //functinality 

function onClickBtn(){
   backdrop.classList.toggle("active");
   movieModel.classList.toggle("active");  
}
function setRating(rating){
   if(rating >=4 && rating <=5){
      return "badge-success";
}else if (rating >=3 && rating <4){
   return "badge-warning";
}else{
   return "badge-danger";
}
}


function showUi(arr) {
   let result = ``;
   arr.forEach(ele => {
      result += ` <div class="col-md-3 mt-4">
              <div class="card movie-card" id="${ele.id}">
                <div class="card-header d-flex justify-content-between">
                   <h4 class="m-0">${ele.movieName}</h4>
                    <h5 class="m-0"><span class="badge ${setRating(ele.rating)}">${ele.rating}</span></h5>   
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
                  <button onclick="onEdit(this)" class="btn btn-sm netflix-sec-color">Edit</button>
                  <button onclick="onRemove(this)" class="btn btn-sm netflix-pri-Color">Delete</button>
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
                    <h5 class="m-0"><span class="badge ${setRating(obj.rating)}">${obj.rating}</span></h5>   
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
                  <button onclick="onEdit(this)" class="btn btn-sm netflix-sec-color">Edit</button>
                  <button onclick="onRemove(this)" class="btn btn-sm netflix-pri-Color">Delete</button>
               </div>
              </div>`;
   movieContainer.append(div);
  Swal.fire({
   title: 'Success!',
   text: 'Movie added successfully.',
   icon: 'success',
   timer: 2000,
  })
}
//edit
function onEdit(ele){
   let EDIT_ID = ele.closest(".movie-card").id;
   let editObj = movieArr.find(obj=> obj.id === EDIT_ID);
   nameControl.value = editObj.movieName;
   image.value = editObj.image;
   discription.value = editObj.discription;
   rating.value = editObj.rating;
   addMovie.classList.add("d-none")
   updateMovie.classList.remove("d-none")
   localStorage.setItem("EDIT_ID",EDIT_ID);
   onClickBtn()
}
//update
function onUpdateMovie(eve){
   let UPDATE_ID = localStorage.getItem("EDIT_ID");
   let updated_obj = {
      id:UPDATE_ID,
      movieName:nameControl.value,
      image:image.value,
      discription:discription.value,
      rating:rating.value
   }
   let index = movieArr.findIndex(t=> t.id === UPDATE_ID);
   movieArr[index] = updated_obj;
   let div = document.getElementById(UPDATE_ID).parentElement;
   div.innerHTML = `<div class="card movie-card" id="${updated_obj.id}">
                <div class="card-header d-flex justify-content-between">
                   <h4 class="m-0">${updated_obj.movieName}</h4>
                    <h5 class="m-0"><span class="badge ${setRating(updated_obj.rating)}">${updated_obj.rating}</span></h5>   
               </div>
               <div class="card-body">
                  <figure>
                  <img src="${updated_obj.image}" alt="${updated_obj.movieName}">
                     <figcaption>
                        <h3 class="m-0">${updated_obj.movieName}</h3>
                         <p>${updated_obj.discription}</p>
                     </figcaption>
                  </figure>
               </div>
               <div class="card-footer d-flex justify-content-between">
                  <button onclick="onEdit(this)" class="btn btn-sm netflix-sec-color">Edit</button>
                  <button onclick="onRemove(this)" class="btn btn-sm netflix-pri-Color">Delete</button>
               </div>
              </div>`;
   localStorage.setItem("movieArr",JSON.stringify(movieArr));
   Swal.fire({
      title: 'Updated!',
      text: 'Movie updated successfully.',
      icon: 'success',
      timer: 2000,
   });
   onClickBtn();
   form.reset();
   addMovie.classList.remove("d-none")
   updateMovie.classList.add("d-none")
}

//remove
function onRemove(ele){
  let confirmation = confirm("Are you sure you want to delete this movie?");
  if(confirmation){
    let REMOVE_ID = ele.closest(".movie-card").id;
  let getIndex = movieArr.findIndex((ele) => ele.id === REMOVE_ID);
   movieArr.splice(getIndex,1);
   ele.closest(".col-md-3").remove();
   localStorage.setItem("movieArr",JSON.stringify(movieArr));
   Swal.fire({
   title: 'Removed!',
   text: 'Movie removed successfully.',
   icon: 'success',
   timer: 2000,
  })
  }
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
      localStorage.setItem("movieArr",JSON.stringify(movieArr));

   createDiv(obj);
   onClickBtn();
   form.reset();
}
backdrop.addEventListener("click", onClickBtn);
closeBtn.addEventListener("click", onClickBtn);
icon.addEventListener("click", onClickBtn);
addBtn.addEventListener("click", onClickBtn);
form.addEventListener("submit", onAddMovie);
updateMovie.addEventListener("click",onUpdateMovie);