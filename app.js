const cta = document.getElementById("cta");
const phone = document.getElementById("phone");

const rmCard = document.getElementById("rmCard");
const rmImg = document.getElementById("rmImg");

const searchInput = document.getElementById("searchInput");
const search = document.getElementById("search");
const srCards = document.getElementById("srCards");

const ingredients = document.getElementById("ingredients");
const ingImg = document.getElementById("ingImg");
const ingTitle = document.getElementById("ingTitle");
const ingList = document.getElementById("ingList");
const goBack = document.getElementById("go-back");

let srItemCard;

let data;

function showIngredients(data) {
  ingredients.classList.add("ingActive");
  ingImg.style.backgroundImage = `url(${data.strMealThumb})`;
  ingTitle.innerHTML = data.strMeal.split(" ").slice(0, 2).join(" ");
  ingList.innerHTML = "";
  let i = 1;
  while (
    data["strIngredient" + i] != "" &&
    data["strIngredient" + i] != null &&
    i <= 20
  ) {
    ingList.innerHTML += `<p>${data["strIngredient" + i]}</p>`;
    i++;
  }
}

window.onload = () => {
  axios
    .get("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
    .then((resp) => {
      const dataList = document.getElementById("dataList");
      for (let i = 0; i < resp.data.meals.length; i++) {
        dataList.innerHTML += `<option value="${resp.data.meals[i].strCategory}"></option>`;
      }

      console.clear();
    })
    .catch((err) => {
      console.log("An error occured in Data List: " + err);
    });

  axios
    .get("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((resp) => {
      data = resp.data.meals[0];
      // console.log(data);
      rmImg.style.backgroundImage = `url(${data.strMealThumb})`;
      rmTitle.innerText = data.strMeal.split(" ").slice(0, 2).join(" ");
    })
    .catch((err) => console.log("Error occured in random item: " + err));
  console.clear();
};

rmCard.onclick = () => {
  showIngredients(data);
  console.clear();
};

search.onclick = () => {
  document.getElementById("searchResults").classList.add("active");
  let catData;
  axios
    .get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchInput.value}`
    )
    .then((resp) => {
      //   console.log(resp);
      catData = resp.data.meals;
      // console.log(catData);
      srCards.innerHTML = "";
      for (let i = 0; i < catData.length; i++) {
        srCards.innerHTML += `<div class="card srCard" id="${
          catData[i].idMeal
        }">
        <div class="cardImg" id="rmImg" style="background-image: url(${
          catData[i].strMealThumb
        });"></div>
          <h3 class="cardTitle">${catData[i].strMeal
            .split(" ")
            .slice(0, 2)
            .join(" ")}</h3>
        </div>`;
      }
      srItemCard = document.querySelectorAll(".srCard");
      for (let i = 0; i < srItemCard.length; i++) {
        srItemCard[i].onclick = () => {
          ingredients.classList.add("ingActive");
          let foodId = srItemCard[i].getAttribute("id");
          axios
            .get(
              `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`
            )
            .then((resp) => {
              let data = resp.data.meals[0];
              showIngredients(data);
              // console.log(data);
            });
        };
      }
      console.clear();
    })
    .catch((err) => {
      console.log("An error occured in search results: " + err);
      srCards.innerHTML = "";
      srCards.innerHTML += "Please enter a valid Category name";
    });
};

cta.onclick = () => {
  phone.classList.add("active");
};

search.addEventListener("click", function (event) {
  event.preventDefault();
});

document.getElementById("hemberg").onclick = () => {
  document.getElementById("navBar").classList.toggle("open");
  document.getElementById("navLinks").classList.toggle("active");
  document.getElementById("hemberg").classList.toggle("open");
};

goBack.onclick = () => {
  ingredients.classList.remove("ingActive");
};
