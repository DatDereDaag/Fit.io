function openList() {
  const container = document.querySelector("#catalogue-container");
  const exerciseList = document.querySelector("#exercise-list");

  container.style.transform = "translateX(-2000px)";
  exerciseList.style.transform = "translateX(350px)";
}

function closeList() {
  const container = document.querySelector("#catalogue-container");
  const exerciseList = document.querySelector("#exercise-list");

  container.style.transform = "translateX(0px)";
  exerciseList.style.transform = "translateX(2000px)";
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

function getExerciseData(exercises) {
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
            <a target="_blank" href = "${exercise.Video}">Youtube Videos</a>
          </div>
        </div>
          `;
  }
  return html;
}

function loadExercises(group) {
  const exerciseListCotainer = document.querySelector(
    "#exercise-list-container"
  );
  const exercises = [...filterByGroup(group)];
  let html = getExerciseData(exercises);

  exerciseListCotainer.innerHTML = html;

  openList();
}
