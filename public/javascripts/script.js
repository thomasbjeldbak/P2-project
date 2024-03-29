/* eslint-disable comma-dangle */
/* eslint-disable array-callback-return */
/* eslint-disable space-before-function-paren */
/* eslint-disable prefer-const */
/* eslint-disable semi */
/* eslint-disable indent */
/* eslint-disable quotes */

/* Questionnaire */
const multiStepForm = document.querySelector("[data-multi-step]");
const formSteps = [...multiStepForm.querySelectorAll("[data-step]")];

let currentStep = formSteps.findIndex(step => {
    return step.classList.contains("active");
});

if (currentStep < 0) {
    currentStep = 0;
    formSteps[currentStep].classList.add("active");
    showCurrentStep();
}

multiStepForm.addEventListener("click", e => {
    let incrementor;
    if (e.target.matches("[data-next]")) {
        incrementor = 1;
    } else if (e.target.matches("[data-previous]")) {
        incrementor = -1;
    }

    if (incrementor == null) return;

    const inputs = [...formSteps[currentStep].querySelectorAll("input")];
    const allValid = inputs.every(input => input.reportValidity());
    if (allValid) {
        currentStep += incrementor;
        showCurrentStep();
    }

    showCurrentStep();
});

formSteps.forEach(step => {
    step.addEventListener("animationend", e => {
        formSteps[currentStep].classList.remove("hide");
        e.target.classList.toggle(
            "hide",
            !e.target.classList.contains("active")
        );
    });
});

function showCurrentStep() {
    formSteps.forEach((step, index) => {
        step.classList.toggle("active", index === currentStep);
    });
}
