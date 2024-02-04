const element = document.querySelector(".nan");
const btnOpen = document.querySelector("#bottomOpen");
const btnClose = document.querySelector("#btnClose");
$(document).ready(() => {
  searchByCategories("").then(() => {
    document.querySelector("#detOfMeal").style.display = "none";
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

async function searchByCategories() {
  $(".inner-loading-screen").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  response = await response.json();
  displayCategories(response);
  console.log(response);
  $(".inner-loading-screen").fadeOut(300);
}
document.querySelector("#categoriesBtn").addEventListener("click", function () {
  searchByCategories();
});

function displayCategories(dataa) {
  let cartona = ``;
  for (let i = 0; i < dataa.categories.length; i++) {
    cartona += `<div class="col-lg-3 g-3">
            <div class="itemCategories rounded cursorPointer" onclick="filterCategories('${
              dataa.categories[i].strCategory
            }')">
              <img src="${
                dataa.categories[i].strCategoryThumb
              }" class="w-100" alt="" />
              <div class="layerCategories">
                <h3>${dataa.categories[i].strCategory}</h3>
                <p>${dataa.categories[i].strCategoryDescription.slice(
                  0,
                  100
                )}</p>
              </div>
            </div>
          </div>`;
  }
  document.querySelector("#categoriesRow").innerHTML = cartona;
}

async function ApiListCategories(filterName) {
  $(".inner-loading-screen").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${filterName}`
  );
  response = await response.json();
  console.log(response);
  displayfilterCategories(response);
  $(".inner-loading-screen").fadeOut(300);
}

function filterCategories(catName) {
  ApiListCategories(catName);
  document.querySelector("#detOfMeal").style.display = "none";
  document.querySelector("#categoriesId").style.display = "none";
  document.querySelector("#closeIt").classList.remove("d-none");
  document.querySelector("#categoriesFilter").style.display = "block";
}
function closeFilter() {
  document.querySelector("#categoriesFilter").style.display = "none";
  document.querySelector("#closeIt").classList.add("d-none");
  document.querySelector("#categoriesId").style.display = "block";
}
function displayfilterCategories(arr) {
  let cartona = ``;
  for (let i = 0; i < arr.meals.length; i++) {
    cartona += `
     <div class="col-lg-3 g-3 cursorPointer">
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
  document.querySelector("#filterRow").innerHTML = cartona;
}
/****************************/
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
function getDetails(id) {
  getApiDet(id);
  document.querySelector("#categoriesFilter").style.display = "none";
  document.querySelector("#detOfMeal").style.display = "block";
}
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
function closeItem() {
  document.querySelector("#detOfMeal").style.display = "none";
  document.querySelector("#categoriesFilter").style.display = "block";
}
