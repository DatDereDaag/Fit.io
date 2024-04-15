let exerciseData = [];

function filterByGroup(group) {
  return exerciseData.filter((exercise) => exercise.Muscles == group);
}

function filterByDifficulty(diffculty) {
  return exerciseData.filter(
    (exercise) => exercise.Intensity_Level == diffculty
  );
}

function openList() {
  const container = document.querySelector("#catalogue-container");
  const exerciseList = document.querySelector("#exercise-list");

  container.style.transform = "translateX(-2000px)";
  exerciseList.style.transform = "translateX(-2000px)";
}

function closeList() {
  const container = document.querySelector("#catalogue-container");
  const exerciseList = document.querySelector("#exercise-list");

  container.style.transform = "translateX(0px)";
  exerciseList.style.transform = "translateX(0px)";
}

function displayInfo(element) {
  if (element.getAttribute("data-isClicked") == "true") {
    element.children[2].style.transform = "translateX(500px)";
    element.children[1].style.transform = "translateX(0px)";

    element.setAttribute("data-isClicked", "false");
  } else {
    element.children[1].style.transition = "all 1s ease";
    element.children[1].style.transform = "translateX(-500px)";

    element.children[2].style.transform = "translateX(0px)";

    element.setAttribute("data-isClicked", "true");
  }
}

function loadExercises(group) {
  const exerciseListCotainer = document.querySelector(
    "#exercise-list-container"
  );
  const exercises = [...filterByGroup(group)];
  let html = ``;

  for (let exercise of exercises) {
    html += `

        <div class = "exercise-list-card" data-isClicked = "false" onclick = "displayInfo(this)">
          <h1 class ="card-title">${exercise.WorkOut.toUpperCase()}</h1>
          <div>
            <h2 class = "card-front">Difficulty: ${
              exercise.Intensity_Level
            }</h2>
            <h2 class = "card-front">Beginner Sets: ${
              exercise["Beginner Sets"]
            }</h2>
            <h2 class = "card-front">Intermediate Sets: ${
              exercise["Intermediate Sets"]
            }</h2>
            <h2 class = "card-front">Expert Sets: ${
              exercise["Expert Sets"]
            }</h2>
            <h2 class = "card-front">Equipment: ${
              exercise.Equipment ? exercise.Equipment : "None"
            }</h2>
          </div>
          <div class = "exercise-info">
            <p class = "card-back">${exercise.Explaination}</p>
            <a href = "${exercise.Video}">Youtube Videos</a>
          </div>
        </div>
          `;
  }

  exerciseListCotainer.innerHTML = html;

  openList();
}

async function getExerciseData() {
  const url = "https://work-out-api1.p.rapidapi.com/search";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "f3f7425e2cmshe5260b3af03762cp12b226jsn32bc146c795b",
      "X-RapidAPI-Host": "work-out-api1.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log("Data returned");
    return result;
  } catch (error) {
    console.error(error);
  }
}

async function initData() {
  exerciseData = await getExerciseData();
}

initData();
