function calculateFitness() {
    const age = document.getElementById('age').value;
    const weight = document.getElementById('weight').value; // kg
    const height = document.getElementById('height').value; // cm
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const activityLevel = document.getElementById('activity2').value;

    const bmi = calculateBMI(weight, (height / 100));
    const bmr = calculateBMR(gender, weight, height, age);
    const tdee = calculateTDEE(bmr, activityLevel);

    displayResults(bmi, bmr, tdee);
}

function calculateBMI(weight, height) {
    return weight / (height * height);
}

function calculateBMR(gender, weight, height, age) {
    if (gender === 'male') {
        return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
        return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
}

function calculateTDEE(bmr, activityLevel) {
    const activityFactors = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        veryActive: 1.9
    };
    return bmr * activityFactors[activityLevel];
}

function displayResults(bmi, bmr, tdee) {
    const results = `BMI: ${bmi.toFixed(2)}
BMR: ${bmr.toFixed(0)} calories/day
TDEE: ${tdee.toFixed(0)} calories/day`;

    document.getElementById('results').innerText = results;
}
