let routineSelected = [[], [], [], [], [], [], [], []];

const pushRoutine = [
  "Chest",
  "Triceps",
  "Shoulders",
  "Chest",
  "Triceps",
  "Shoulders",
];

const legRoutine = [
  "Legs",
  "Hamstring",
  "Quadriceps",
  "Calves",
  "Glutes",
  "Legs",
];

const pullRoutine = ["Back", "Biceps", "Lats", "Trapezius", "Abs", "Back"];

const upperRoutine = ["Back", "Chest", "Biceps", "Triceps", "Shoulders", "Abs"];

const fullRoutine = ["Back", "Chest", "Legs", "Abs", "Shoulders", "Calves"];

function checkRoutine() {
  let template = routineSelected[7];
  for (let i = 0; i < 7; i++) {
    //Ignores the rest days
    if (template[i] == "Rest") continue;

    //Check for empty routines or missing exercises
    let routine = routineSelected[i];
    if (routine.length != 6) return;

    for (let exercise of routine) {
      //Check for missing exercises
      if (exercise == null) return;
    }
  }

  submitRoutine();
}

//TODO:IMPLEMENT LOGIC WITH FIRESTORE TO STORE routineSelected ARRAY
function submitRoutine() {
  console.log("Saving routine");
}

function showCatalogue(group) {
  const exerciseList = document.querySelector("#exercise-list");
  const exerciseSetup = document.querySelector("#exercise-setup");

  exerciseSetup.style.transform = "translateX(-1500px)";
  exerciseList.style.transform = "translateX(0px)";

  const exerciseListCotainer = document.querySelector(
    "#exercise-list-container"
  );
  const exercises = [...filterByGroup(group)];
  let html = getExerciseData(exercises);

  exerciseListCotainer.innerHTML = html;
}

function closeCatalogue() {
  const exerciseList = document.querySelector("#exercise-list");
  const exerciseSetup = document.querySelector("#exercise-setup");

  exerciseSetup.style.transform = "translateX(0px)";
  exerciseList.style.transform = "translateX(1500px)";
}

function loadDays() {
  document.querySelector("#day-select").innerHTML = ``;

  for (let i = 0; i < 7; i++) {
    document.querySelector("#day-select").innerHTML += `
    <div
      class="day"
      data-value="${i}"
      data-routine=""
      onclick="setActiveDay(this)"
    >
      ${getDay(i)}
    </div>
    `;
  }
}

function resetMenu() {
  document.querySelector("#routine-setup").style.transform = "translateX(0px)";
  document.querySelector("#exercise-setup").style.transform =
    "translateX(1500px)";

  setTimeout(() => {
    loadDays();
    document.querySelector("#exercise-select").innerHTML = ``;
  }, 1000);
}

function swapMenu() {
  document.querySelector("#routine-setup").style.transform =
    "translateX(-1500px)";
  document.querySelector("#exercise-setup").style.transform = "translateX(0px)";
}

function getMuscleGroup(routine, index) {
  switch (routine) {
    case "Push":
      return pushRoutine[index];
    case "Legs":
      return legRoutine[index];
    case "Pull":
      return pullRoutine[index];
    case "Upper":
      return upperRoutine[index];
    case "Full":
      return fullRoutine[index];
  }
}

function loadOptions(group) {
  let html = ``;
  const options = [...filterByGroup(group)];

  for (let option of options) {
    html += `
    <option value="${option.WorkOut}">${option.WorkOut}</option>
    `;
  }

  return html;
}

function loadExerciseTemplate(routine, container, day) {
  container.innerHTML = ``;

  for (let i = 0; i < 6; i++) {
    container.innerHTML += `
          <div class="exercise">
            <div class="exercise-top">
              ${getMuscleGroup(routine, i)}
              <select
                id="exercise-options"
                onchange="setExercise(${i}, this.value, ${day})"
              >
                ${loadOptions(`${getMuscleGroup(routine, i)}`)}
              </select>
              <button onclick="showCatalogue('${getMuscleGroup(
                routine,
                i
              )}')">Show Catalogue</button>
            </div>
            <div id="chosen-exercise" class="exercise-bottom">Chosen: ${
              routineSelected[day][i] ? routineSelected[day][i] : " "
            }</div>
          </div>
    `;
  }
}

function setActiveDay(element) {
  const day = element.getAttribute("data-value");
  const routine = element.getAttribute("data-routine");

  const dateSelect = document.querySelector("#day-select");
  const dateSelected = dateSelect.getAttribute("date-selected");

  const exerciseSelect = document.querySelector("#exercise-select");

  dateSelect.children[dateSelected].classList.replace("day-selected", "day");

  element.classList.replace("day", "day-selected");

  dateSelect.setAttribute("date-selected", day);

  loadExerciseTemplate(routine, exerciseSelect, day);
}

function setExercise(index, value, day) {
  const exerciseSelect = document.querySelector("#exercise-select");
  const chosenExericse =
    exerciseSelect.children[index].querySelector("#chosen-exercise");

  let routine = routineSelected[day];
  routine[index] = value;

  chosenExericse.innerHTML = `Chosen: ${value}`;
}

function loadPPLTemplate() {
  routineSelected = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    ["Push", "Pull", "Legs", "Rest", "Push", "Pull", "Legs"],
  ];
  const days = document.querySelector("#day-select");

  days.children[3].innerHTML = "Thursday-REST DAY";
  days.children[3].classList.replace("day", "rest-day");
  days.children[3].removeAttribute("onclick");

  days.children[0].setAttribute("data-routine", "Push");
  days.children[4].setAttribute("data-routine", "Push");

  days.children[1].setAttribute("data-routine", "Pull");
  days.children[5].setAttribute("data-routine", "Pull");

  days.children[2].setAttribute("data-routine", "Legs");
  days.children[6].setAttribute("data-routine", "Legs");

  console.log("Loading PPL template...");
}

function loadUpLowTemplate() {
  routineSelected = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [
      "Upper-Body",
      "Lower-Body",
      "Rest",
      "Upper-Body",
      "Lower-Body",
      "Rest",
      "Rest",
    ],
  ];
  const days = document.querySelector("#day-select");

  days.children[2].innerHTML = "Wednesday-REST DAY";
  days.children[2].classList.replace("day", "rest-day");
  days.children[2].removeAttribute("onclick");

  days.children[5].innerHTML = "Saturday-REST DAY";
  days.children[5].classList.replace("day", "rest-day");
  days.children[5].removeAttribute("onclick");

  days.children[6].innerHTML = "Sunday-REST DAY";
  days.children[6].classList.replace("day", "rest-day");
  days.children[6].removeAttribute("onclick");

  days.children[0].setAttribute("data-routine", "Upper");
  days.children[3].setAttribute("data-routine", "Upper");

  days.children[1].setAttribute("data-routine", "Legs");
  days.children[4].setAttribute("data-routine", "Legs");

  console.log("Loading Upper-Lower template...");
}

function loadFullBodTemplate() {
  routineSelected = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    ["Full-Body", "Rest", "Full-Body", "Rest", "Full-Body", "Rest", "Rest"],
  ];
  const days = document.querySelector("#day-select");

  days.children[1].innerHTML = "Tuesday-REST DAY";
  days.children[1].classList.replace("day", "rest-day");
  days.children[1].removeAttribute("onclick");

  days.children[3].innerHTML = "Thursday-REST DAY";
  days.children[3].classList.replace("day", "rest-day");
  days.children[3].removeAttribute("onclick");

  days.children[5].innerHTML = "Saturday-REST DAY";
  days.children[5].classList.replace("day", "rest-day");
  days.children[5].removeAttribute("onclick");

  days.children[6].innerHTML = "Sunday-REST DAY";
  days.children[6].classList.replace("day", "rest-day");
  days.children[6].removeAttribute("onclick");

  days.children[0].setAttribute("data-routine", "Full");
  days.children[2].setAttribute("data-routine", "Full");
  days.children[4].setAttribute("data-routine", "Full");

  console.log("Loading Full Body template...");
}

function getRotuineTemplate(routine) {
  loadDays();
  if (routine == "PPL") loadPPLTemplate();
  else if (routine == "UPPER-LOWER") loadUpLowTemplate();
  else if (routine == "FULLBODY") loadFullBodTemplate();

  swapMenu();
}
