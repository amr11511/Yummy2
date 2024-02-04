const element = document.querySelector(".nan");
const btnOpen = document.querySelector("#bottomOpen");
const btnClose = document.querySelector("#btnClose");
const searchByName = document.querySelector("#searchByName");
const searchByFL = document.querySelector("#searchByFL");
// const btnSubmit = document.querySelector("#submit");
const searchRow = document.querySelector("#searchRow");
const searchMeal = document.querySelector("#searchMeal");
const detOfMeal = document.querySelector("#detOfMeal");
const elements = document.querySelectorAll(".nan a");
let resArr = [];
/************************************************/
$(document).ready(() => {
  getApi("").then(() => {
    $(".loading-screen").fadeOut(500);
    $("body").css("overflow", "visible");
  });
});

btnOpen.addEventListener("click", function () {
  for (let i = 0; i < 5; i++) {
    $(".nan a")
      .eq(i)
      .animate(
        {
          top: 0,
        },
        (i + 5) * 100
      );
  }
  // element.classList.add(
  //   "animate__animated",
  //   "animate__bounceInUp",
  //   "animate__fast"
  // );
  // element.classList.remove("animate__backOutDown");
});
btnClose.addEventListener("click", function () {
  $(".nan a").animate(
    {
      top: 300,
    },
    500
  );
  // element.classList.add(
  //   "animate__animated",
  //   "animate__backOutDown",
  //   "animate__fast"
  // );
  // element.classList.remove("animate__bounceInUp");
});
/*******************************************/
// btnSubmit.addEventListener("click", function (e) {
//   e.preventDefault();
//   getApi(searchByName.value);
//   searchByName.value = "";
// });
if (searchByFL != null) {
  searchByFL.addEventListener("input", function () {
    searchByFLetter(searchByFL.value);
  });
}
if (searchByName != null) {
  searchByName.addEventListener("input", function () {
    getApi(searchByName.value);
  });
}

async function getApi(searchName) {
  //   $("#loadingShow").fadeIn(300);
  $(".inner-loading-screen").fadeIn(300);
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchName}`
  );
  const finalResponse = await response.json();
  resArr = finalResponse;
  displayReasltSearch(resArr);
  $(".inner-loading-screen").fadeOut(300);
  //   $("#loadingShow").fadeOut(300);
  //   console.log(finalResponse);
}
async function searchByFLetter(term) {
  $(".inner-loading-screen").fadeIn(300);
  term == "" ? (term = "a") : "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
  );
  response = await response.json();
  resArr = response;
  console.log(resArr);
  displayReasltSearch(resArr);
  $(".inner-loading-screen").fadeOut(300);
}
function displayReasltSearch(arr) {
  let cartona = ``;
  for (let i = 0; i < arr.meals.length; i++) {
    cartona += ` <div class="col-lg-3 g-3 cursorPointer">
        <div class="item-container rounded" onclick="getDetails(${arr.meals[i].idMeal})">
          <img
            src="${arr.meals[i].strMealThumb}"
            class="w-100 rounded"
            alt=""
          />
          <div class="layer rounded">
            <h2 class="text-dark text-center">${arr.meals[i].strMeal}</h2>
          </div>
        </div>
      </div>`;
  }
  searchRow.innerHTML = cartona;
}
/***************************************************/
let dispalyDetOfData;
async function getApiDet(id) {
  //   $("#loadingShow").fadeIn(300);
  $(".inner-loading-screen").fadeIn(300);
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const finalResponse = await response.json();
  dispalyDetOfData = finalResponse;
  //   displayDetOfMeal(dispalyDetOfData.meals[0]);
  //   console.log(dispalyDetOfData.meals[0]);
  let mealIngredient = [
    ...new Map(Object.entries(dispalyDetOfData.meals[0])).values(),
  ]
    .slice(9, 28)
    .filter((el) => el.length > 1);
  let mealMeasure = [
    ...new Map(Object.entries(dispalyDetOfData.meals[0])).values(),
  ]
    .slice(29, 48)
    .filter((el) => el.length > 1);
  displayMealDetails(dispalyDetOfData.meals, mealIngredient, mealMeasure);
  $(".inner-loading-screen").fadeOut(300);
  //   $("#loadingShow").fadeOut(300);
}
/****************************************************************/
function getDetails(id) {
  getApiDet(id);
  searchMeal.style.display = "none";
  detOfMeal.style.display = "block";
}
// function displayDetOfMeal(respo) {
//   let cartonaDet = `
//     <div class="d-flex container justify-content-between mt-3">
//         <h1 class="text-white">Details Meal</h1>
//         <div id="exiteBtn" class="exite cursorPointer" onclick="closeItem()">
//           <i class="fa-solid fa-xmark fa-2x"></i>
//         </div>
//     </div>
//     <div id="addDetOfMeal" class="container mt-5">
//         <div class="row">
//             <div class="col-lg-4">
//             <div class="item mb-4">
//                 <img
//                 src="${respo.strMealThumb}"
//                 alt=""
//                 class="w-100 rounded mb-2"
//                 />
//                 <h2 class="text-white">${respo.strMeal}</h2>
//             </div>
//             </div>
//             <div class="col-lg-8">
//             <div class="item text-white">
//                 <h1>Instructions</h1>
//                 <p>
//                 ${respo.strInstructions}
//                 </p>
//                 <h2>Area : ${respo.strArea}</h2>
//                 <h2>Category :${respo.strCategory}</h2>
//                 <h2>Recipes :</h2>
//                 <div class="row">
//                 <div class="col-lg-2 g-2">
//                     <div class="item bg-white p-1 text-dark rounded">
//                     100g Flour
//                     </div>
//                 </div>
//                 <div class="col-lg-2 g-2">
//                     <div class="item bg-white p-1 text-dark rounded">
//                     2 large Eggs
//                     </div>
//                 </div>
//                 <div class="col-lg-2 g-2">
//                     <div class="item bg-white p-1 text-dark rounded">
//                     300ml Milk
//                     </div>
//                 </div>
//                 <div class="col-lg-2 g-2">
//                     <div class="item bg-white p-1 text-dark rounded">
//                     1 tbls Sunflower Oil
//                     </div>
//                 </div>
//                 <div class="col-lg-2 g-2">
//                     <div class="item bg-white p-1 text-dark rounded">
//                     to serve Sugar
//                     </div>
//                 </div>
//                 <div class="col-lg-2 g-2">
//                     <div class="item bg-white p-1 text-dark rounded">
//                     to serve Raspberries

//                     </div>
//                 </div>
//                 <div class="col-lg-2 g-2">
//                     <div class="item bg-white p-1 text-dark rounded">
//                     to serve Blueberries
//                     </div>
//                 </div>
//                 </div>
//                 <h1>Tags :</h1>
//                 <div class="row mb-3">
//                 <div class="col-lg-2 g-2">
//                     <div class="item bg-warning-subtle p-1 text-dark rounded">
//                     Breakfast
//                     </div>
//                 </div>
//                 <div class="col-lg-2 g-2">
//                     <div class="item bg-warning-subtle p-1 text-dark rounded">
//                     Desert
//                     </div>
//                 </div>
//                 <div class="col-lg-2 g-2">
//                     <div class="item bg-warning-subtle p-1 text-dark rounded">
//                     Fruity
//                     </div>
//                 </div>
//                 <div class="col-lg-2 g-2">
//                     <div class="item bg-warning-subtle p-1 text-dark rounded">
//                     Sweet
//                     </div>
//                 </div>
//                 </div>
//                 <div class="mb-4">
//                 <a id="Sourse" href="${respo.strSource}" target="_blank" class="btn btn-success me-2"
//                     >Sourse</a
//                 >
//                 <a id="youtube"href="${respo.strYoutube}"  target="_blank" class="btn btn-danger"
//                     >youtube</a
//                 >
//                 </div>
//             </div>
//             </div>
//         </div>
//     </div>`;

//   detOfMeal.innerHTML = cartonaDet;
// }
/******************************************/
function displayMealDetails(list, ingredientsList, measureList) {
  // // Load Screen
  // loadLayerBetweenLinks();

  let detailsContent = ``;
  let recipeDesc = ``;

  for (let i = 0; i < ingredientsList.length; i++) {
    recipeDesc += `<p class="bg-info-subtle text-info-emphasis p-1  rounded me-3">${ingredientsList[i]} ${measureList[i]}</p>`;
  }

  detailsContent += `
  <div class="d-flex container justify-content-between mt-3">
        <h1 class="text-white">Details Meal</h1>
        <div id="exiteBtn" class="exite cursorPointer" onclick="closeItem()">
          <i class="fa-solid fa-xmark fa-2x"></i>
        </div>
      </div>
      <div class="col-md-4 g-4">
        <div id="mealImg" class="text-white ">
          <figure>
              <img src="${list[0].strMealThumb}" class="w-100 rounded" alt="${
    list[0].strMeal
  }">
          </figure>
          <h2  class=" fs-1 ">${list[0].strMeal}</h2>
        </div>
      </div>
      <div class="col-md-8 g-4">
        <div id="meadDesc" class="text-white mb-5">
          <h2 class=" fs-2 ">Instructions</h2>
          <p>${list[0].strInstructions} </p>
          <div id="mealArea" class="d-flex align-items-center">
              <h2 class=" fs-2 ">Area :</h2>
              <h3 class="fs-3 pt-1 ms-2">${list[0].strArea}</h3>
          </div>
          <div id="mealCategory" class="d-flex align-items-center">
              <h2 class=" fs-2 ">Category :</h2>
              <h3 class="fs-3 pt-1 ms-2">${list[0].strCategory}</h3>
          </div>
          <div id="mealRecipes">
              <h2 class=" py-1 fs-2 ">Recipes : </h2>
              <div class="d-flex align-items-center flex-wrap "> ${recipeDesc} </div>
          </div>
          <h2 class=" fs-2 mb-2">Tags : </h2>
          <div id="mealTags" class="d-flex mt-3">
              ${
                list[0].strTags == null
                  ? ""
                  : `<p class="bg-danger-subtle rounded text-danger-emphasis p-1 me-3">${
                      list[0].strTags.split(",")[0]
                    }</p>`
              } 
              ${
                list[0].strTags == null
                  ? ""
                  : list[0].strTags.split(",")[1] == undefined
                  ? ""
                  : `<p class="bg-danger-subtle rounded text-danger-emphasis me-3">${
                      list[0].strTags.split(",")[1]
                    }</p>`
              } 
              ${
                list[0].strTags == null
                  ? ""
                  : list[0].strTags.split(",")[2] == undefined
                  ? ""
                  : `<p class="bg-danger-subtle rounded text-danger-emphasis me-3">${
                      list[0].strTags.split(",")[2]
                    }</p>`
              } 
              ${
                list[0].strTags == null
                  ? ""
                  : list[0].strTags.split(",")[3] == undefined
                  ? ""
                  : `<p class="bg-danger-subtle rounded text-danger-emphasis me-3">${
                      list[0].strTags.split(",")[3]
                    }</p>`
              } 
          </div>
  
          <a href="${
            list[0].strSource
          }" target="_blank" class="btn btn-success text-white"> Source</a>
          <a href="${
            list[0].strYoutube
          }" target="_blank" class="btn btn-danger text-white ms-2"> Youtube</a>
      </div>
    </div>`;
  document.querySelector("#detailsOfMeal").innerHTML = detailsContent;
}

/*********************/
function closeItem() {
  searchMeal.style.display = "block";
  detOfMeal.style.display = "none";
}

/**********************************/
