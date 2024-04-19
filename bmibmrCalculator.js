window.onload = () => {
    let button1 = document.querySelector("#submit-bmi");
    let button2 = document.querySelector("#submit-bmr");

    button1.addEventListener("click", calculateBMI);
    button2.addEventListener("click", calculateBMR);
};

function calculateBMI() {
 
    let height = parseInt(document.querySelector("#i-cms").value);
    let weight = parseInt(document.querySelector("#i-kgs").value);
    let result = document.querySelector("#bmi-results");
 
    if (height === "" || isNaN(height)) 
        result.innerHTML = "Provide a valid height!";
 
    else if (weight === "" || isNaN(weight)) 
        result.innerHTML = "Provide a valid weight!";
 
    else {
        
        height = (height/100)*(height/100);
        let bmi = (weight/height).toPrecision(3);
 
        if (bmi < 18.6) result.innerHTML = `Under Weight : <span>${bmi}</span>`;
 
        else if (bmi >= 18.6 && bmi < 24.9) 
            result.innerHTML = `Normal : <span>${bmi}</span>`;
 
        else result.innerHTML = `Over Weight : <span>${bmi}</span>`;

    }
}

function calculateBMR() {
    
    let height = parseFloat(document.querySelector("#r-cms").value);
    let weight = parseFloat(document.querySelector("#r-kgs").value);
    let age = parseFloat(document.querySelector("#r-age").value);
    let sex = parseFloat(document.querySelector("#r-sex").value);
    let result = document.querySelector("#bmr-results");

    if (height === "" || isNaN(height)) 
        result.innerHTML = "Provide a valid height!";
    else if (weight === "" || isNaN(weight)) 
        result.innerHTML = "Provide a valid weight!";
    else if (age === "" || isNaN(age)) 
        result.innerHTML = "Provide a valid age!";
    else {
        if (sex == 1) {
            let bmr = (88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)).toPrecision(4);
            result.innerHTML = `<span>${bmr}</span> calories`;
        }
        if (sex == 2) {
            let bmr = (447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)).toPrecision(4);
            result.innerHTML = `<span>${bmr}</span> calories`;
        }
    }
    
}
