const startBtn = document.getElementById("startBtn");
const circle = document.getElementById("circle");
const square = document.getElementById("square");
const screamSound = document.getElementById("screamSound");
const formContainer = document.getElementById("formContainer");
const slider = document.getElementById("anticipationSlider");
const sliderValue = document.getElementById("sliderValue");
const submitBtn = document.getElementById("submitBtn");
const text = document.getElementById("text");

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

startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  responses = [];
  currentIndex = 0;
  text.style.display = "block";
  setTimeout(() => {
    text.style.display = "none";
    runSequence();
  }, 7000);
});

submitBtn.addEventListener("click", () => {
  responses.push({
    step: currentIndex,
    rating: slider.value,
    responseTimeMs: performance.now() - formShownTime,
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

function runSequence() {
  sequence = [
    //Habituation
    { element: square, duration: 8000, showForm: true, soundDelay: 7000 },
    { element: null, duration: 9000 },
    { element: circle, duration: 8000, showForm: true },
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
  const responsesInput = document.getElementById("responsesInput");
  responsesInput.value = JSON.stringify(responses);
  document.getElementById("responseForm").submit();
  alert("Experiment complete! Thank you for your participation.");
  startBtn.style.display = "block";
  updateDisplay(null);
}