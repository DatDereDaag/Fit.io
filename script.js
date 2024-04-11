let exerciseData = [];

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
    return result;
  } catch (error) {
    console.error(error);
  }
}

async function initApp() {
  exerciseData = await getExerciseData();
}
