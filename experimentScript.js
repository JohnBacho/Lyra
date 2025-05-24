const startBtn = document.getElementById("startBtn");
const circle = document.getElementById("circle");
const square = document.getElementById("square");
const screamSound = document.getElementById("screamSound");
const formContainer = document.getElementById("formContainer");
const slider = document.getElementById("anticipationSlider");
const sliderValue = document.getElementById("sliderValue");
const submitBtn = document.getElementById("submitBtn");
const text = document.getElementById("text");
const submitBtn2 = document.getElementById("submitBtn2");
const instructionPhase = document.getElementById("instructionPhase");
const TestSoundText = document.getElementById("TestSoundText");
const question = document.getElementById("question");
const submitBtn3 = document.getElementById("submitBtn3"); 
const TestSound = document.getElementById("TestSound");
const formContainer3 = document.getElementById("formContainer3");
const submitBtn4 = document.getElementById("submitBtn4");

slider.addEventListener("input", () => {
  sliderValue.textContent = slider.value;
});

let sequence = [];
let currentIndex = 0;
let stepStartTime = 0;
let paused = false;
let pauseTime = 0;
let responses = [];
let animationFrame;
let soundPlayed = false;
let formShownTime = 0;
let experimentStartTime;

startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  formContainer2.style.display = "block";
  experimentStartTime = Date.now();
});

submitBtn.addEventListener("click", () => {
responses.push({
  step: currentIndex,
  rating: slider.value,
  responseTimeMs: performance.now() - formShownTime,
  stimulus: sequence[currentIndex]?.element?.id || "none",
  background: sequence[currentIndex]?.background || "none",
  soundPlayed: !!sequence[currentIndex]?.soundDelay,
});

  formContainer.style.display = "none";
  paused = false;

  const step = sequence[currentIndex];

  // plays sound 2 seconds after submission if there is a sound delay set
  if (step.soundDelay !== undefined) {
    setTimeout(() => {
      screamSound.currentTime = 0;
      screamSound.play();
    }, 2000);
  }

  // waits 3 seconds before moving to next step
  setTimeout(() => {
    currentIndex++;
    if (currentIndex >= sequence.length) {
      endExperiment();
      return;
    }
    stepStartTime = performance.now();
    soundPlayed = false;
    updateDisplay(sequence[currentIndex].element);
    requestAnimationFrame(updateStep);
  }, 3000);
});

submitBtn2.addEventListener("click", () => {
  const selectedAge = document.querySelector('input[name="age-range"]:checked');
  
  if (selectedAge) {
    responses.push({
      Device: navigator.userAgent,
      Age: selectedAge.value
    });

    formContainer2.style.display = "none";
    formContainer3.style.display = "block";

  } else {
    alert("Please select an age range before continuing.");
  }
});

submitBtn4.addEventListener("click", () => {
  const selectedGender = document.querySelector('input[name="gender"]:checked');

  if (selectedGender) {
    let genderValue = selectedGender.value;

    if (genderValue === "self-describe") {
      const customInput = document.getElementById("self-describe-input").value.trim();
      if (customInput) {
        genderValue = customInput;
      } else {
        alert("Please enter your self-described gender.");
        return;
      }
    }

    responses.push({
      Gender: genderValue
    });

    formContainer3.style.display = "none";
    instructionPhase.style.display = "block";

    setTimeout(() => {
      instructionPhase.style.display = "none";
      TestSoundText.style.display = "block";
    }, 6000);
  } else {
    alert("Please select a gender before continuing.");
  }
});


submitBtn3.addEventListener("click", () => {
  TestSound.play();
  setTimeout(() => {
      TestSoundText.style.display = "none";
    question.style.display = "block";
  }, 1000);
});

document.getElementById("yes").addEventListener("click", () => {
  question.style.display = "none";
  text.style.display = "block"
  setTimeout(() => {
    text.style.display = "none";
    runSequence();
  }, 7000);
});

document.getElementById("no").addEventListener("click", () => {
  question.style.display = "none";
  TestSoundText.style.display = "block";
});



function runSequence() {
  sequence = [
    //Habituation
    { element: square, duration: 8000, showForm: true, soundDelay: 7000, background: "environment1"},
    { element: null, duration: 9000 },
    { element: circle, duration: 8000, showForm: true, background: "environment2"},
    { element: null, duration: 14000 },
    { element: square, duration: 8000, soundDelay: 7000 },
    { element: null, duration: 10000 },
    { element: circle, duration: 8000, showForm: true, soundDelay: 7000 },
    // { element: null, duration: 12000 },
    // fear acquisition
    // { element: circle, duration: 8000 },
    // { element: null, duration: 11000 },
    // { element: circle, duration: 8000 },
    // { element: null, duration: 14000 },
    // { element: square, duration: 8000, soundDelay: 7000 },
    // { element: null, duration: 9000 },
    // { element: square, duration: 8000, soundDelay: 7000 },
    // { element: null, duration: 15000 },
    // { element: circle, duration: 8000 },
    // { element: null, duration: 12000 },
    // { element: square, duration: 8000, soundDelay: 7000 },
    // { element: null, duration: 10000 },
    // { element: square, duration: 8000 },
    // { element: null, duration: 13000 },
    // { element: circle, duration: 8000 },
    // { element: null, duration: 11000 },
    // { element: square, duration: 8000, soundDelay: 7000 },
    // { element: null, duration: 9000 },
    // { element: circle, duration: 8000 },
    // { element: null, duration: 12000 },
    // { element: square, duration: 8000, soundDelay: 7000 },
    // { element: null, duration: 15000 },
    // { element: circle, duration: 8000 },
    // { element: null, duration: 12000 },
    // { element: circle, duration: 8000 },
    // { element: null, duration: 10000 },
    // { element: square, duration: 8000 },
    // { element: null, duration: 13000 },
    // { element: circle, duration: 8000 },
    // { element: null, duration: 9000 },
    // { element: square, duration: 8000, soundDelay: 7000 },
    // { element: null, duration: 12000 },
    // // fear extinction
    // { element: circle, duration: 8000 },
    // { element: null, duration: 12000 },
    // { element: square, duration: 8000 },
    // { element: null, duration: 10000 },
    // { element: square, duration: 8000 },
    // { element: null, duration: 15000 },
    // { element: circle, duration: 8000 },
    // { element: null, duration: 9000 },
    // { element: circle, duration: 8000 },
    // { element: null, duration: 11000 },
    // { element: square, duration: 8000 },
    // { element: null, duration: 14000 },
    // { element: circle, duration: 8000 },
    // { element: null, duration: 13000 },
    // { element: square, duration: 8000 },
    // { element: null, duration: 10000 },
    // { element: square, duration: 8000 },
    // { element: null, duration: 15000 },
    // { element: circle, duration: 8000 },
    // { element: null, duration: 12000 },
    // { element: square, duration: 8000 },
    // { element: null, duration: 9000 },
    // { element: circle, duration: 8000 },
    // { element: null, duration: 12000 },
    // { element: circle, duration: 8000 },
    // { element: null, duration: 10000 },
    // { element: square, duration: 8000 },
    // { element: null, duration: 13000 },
    // { element: square, duration: 8000 },
    // { element: null, duration: 14000 },
    // { element: circle, duration: 8000 },
    // { element: null, duration: 10000 },
    // { element: square, duration: 8000 },
    // { element: null, duration: 12000 },
    // { element: circle, duration: 8000 },
    // { element: null, duration: 15000 },
    // { element: circle, duration: 8000 },
    // { element: null, duration: 11000 },
    // { element: square, duration: 8000 },
    // { element: null, duration: 13000 },
    // { element: square, duration: 8000 },
    // { element: null, duration: 10000 },
    // { element: circle, duration: 8000 },
    // { element: null, duration: 14000 },
    // { element: square, duration: 8000 },
    // { element: null, duration: 9000 },
    // { element: square, duration: 8000 },
    // { element: null, duration: 12000 },
    // { element: circle, duration: 8000 },
    // { element: null, duration: 15000 },
    // { element: square, duration: 8000 },
    // { element: null, duration: 11000 },
    // { element: square, duration: 8000 },
    // { element: null, duration: 13000 },
    // { element: circle, duration: 8000 },
    // { element: null, duration: 10000 },
    // { element: circle, duration: 8000 },
    // { element: null, duration: 14000 },
    // { element: square, duration: 8000 },
    // { element: null, duration: 12000 },
    // { element: circle, duration: 8000 },
    // { element: null, duration: 9000 },
    // { element: square, duration: 8000 },
    // { element: null, duration: 15000 },
    // { element: circle, duration: 8000 },
    // { element: null, duration: 11000 },
    // { element: square, duration: 8000 },
    // { element: null, duration: 13000 },
    // { element: square, duration: 8000 },
    // { element: null, duration: 10000 },
    // { element: circle, duration: 8000 },
    // { element: null, duration: 14000 },
    // { element: square, duration: 8000 },
    // { element: null, duration: 12000 },
    // { element: circle, duration: 8000 },
    // { element: null, duration: 13000 },
    // { element: circle, duration: 8000 },
    // { element: null, duration: 9000 },
    // { element: square, duration: 8000 },
  ];
  stepStartTime = performance.now();
  soundPlayed = false;
  updateDisplay(sequence[currentIndex].element);
  requestAnimationFrame(updateStep);
}

function updateDisplay(el) {
  circle.style.display = "none";
  square.style.display = "none";
  if (el) el.style.display = "block";
}

function updateStep(timestamp) {
  if (paused) return;

  const step = sequence[currentIndex];
  const elapsed = timestamp - stepStartTime;

  if (
    step.soundDelay !== undefined &&
    !soundPlayed &&
    elapsed >= step.soundDelay
  ) {
    screamSound.currentTime = 0;
    screamSound.play();
    soundPlayed = true;
  }

  if (step.showForm && elapsed >= 5000 && !paused) {
    paused = true;
    formContainer.style.display = "block";
    slider.value = 0;
    sliderValue.textContent = "0";
    pauseTime = 5000;
    formShownTime = performance.now();
    return;
  }

  if (elapsed >= step.duration) {
    currentIndex++;
    if (currentIndex >= sequence.length) {
      endExperiment();
      return;
    }
    stepStartTime = performance.now();
    soundPlayed = false;
    updateDisplay(sequence[currentIndex].element);
    requestAnimationFrame(updateStep);
  } else {
    animationFrame = requestAnimationFrame(updateStep);
  }
}

function endExperiment() {
  responses.push({
  TotalTime: Date.now() - experimentStartTime,
});
  const responsesInput = document.getElementById("responsesInput");
  responsesInput.value = JSON.stringify(responses);
  document.getElementById("responseForm").submit();
  alert("Experiment complete! Thank you for your participation.");
  startBtn.style.display = "block";
  updateDisplay(null);
}

function updateDisplay(el) {
  circle.style.display = "none";
  square.style.display = "none";
  document.body.classList.remove('environment1', 'environment2');

  const step = sequence[currentIndex];
  if (step?.background) {
    document.body.classList.add(step.background);
  }

  if (el) el.style.display = "block";
}