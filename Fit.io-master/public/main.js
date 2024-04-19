let exerciseData = [];

function getDay(value) {
  switch (value) {
    case 0:
      return "Monday";
    case 1:
      return "Tuesday";
    case 2:
      return "Wednesday";
    case 3:
      return "Thursday";
    case 4:
      return "Friday";
    case 5:
      return "Saturday";
    case 6:
      return "Sunday";
  }
}

function filterByGroup(group) {
  return exerciseData.filter((exercise) => exercise.Muscles == group);
}

function filterByDifficulty(diffculty) {
  return exerciseData.filter(
    (exercise) => exercise.Intensity_Level == diffculty
  );
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

async function getTestData() {
  const data = await fetch("exerciseData.json");
  return await data.json();
}

async function initData() {
  //exerciseData = await getExerciseData();
  exerciseData = await getTestData();
}

initData();
