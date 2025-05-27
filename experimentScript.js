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

let gazeData = [];

async function startEyeTracking() {
  await webgazer
    .setRegression('weightedRidge')
    .setGazeListener((data, elapsedTime) => {
      if (data) {
        gazeData.push({
          x: data.x,
          y: data.y,
          time: elapsedTime,
          step: currentIndex
        });
      }
    })
    .saveDataAcrossSessions(false)
    .begin();

  webgazer
    .showVideoPreview(true)
    .showPredictionPoints(true)
    .applyKalmanFilter(true);
}


slider.addEventListener("input", () => {
  sliderValue.textContent = slider.value;
});

let sequence = [];
let currentIndex = -1;
let stepStartTime = 0;
let paused = false;
let pauseTime = 0;
let responses = [];
let animationFrame;
let soundPlayed = false;
let formShownTime = 0;
let experimentStartTime;

// Start BTN
startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  experimentStartTime = Date.now();
  startEyeTracking();
  startCalibration();
});

// Age
submitBtn2.addEventListener("click", () => {
  const selectedAge = document.querySelector('input[name="age-range"]:checked');
  
  if (selectedAge) {
    responses.push({
      Age: selectedAge.value
    });

    formContainer2.style.display = "none";
    formContainer3.style.display = "block";

  } else {
    alert("Please select an age range before continuing.");
  }
});

// Sound Test
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
    currentIndex = 0;
    runSequence();
  }, 7000);
});

document.getElementById("no").addEventListener("click", () => {
  question.style.display = "none";
  TestSoundText.style.display = "block";
});

// Gender
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
    const finalPayload = {
    timestamp: new Date().toISOString(),
    responses: responses,
    gaze: gazeData,
    DeviceID: navigator.userAgent,
    ScreenWidth: window.innerWidth,
    ScreenHeight: window.innerHeight
  };

  const responsesInput = document.getElementById("responsesInput");
  responsesInput.value = JSON.stringify(finalPayload);

  document.getElementById("responseForm").submit();

  setTimeout(() => {
    alert("Experiment complete! Thank you for your participation.");
    startBtn.style.display = "block";
    updateDisplay(null);
  }, 100);
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
const calibrationPoints = [
  { x: "3%", y: "5%" },
  { x: "50%", y: "5%" },
  { x: "97%", y: "5%" },
  { x: "3%", y: "50%" },
  { x: "50%", y: "50%" },
  { x: "97%", y: "50%" },
  { x: "3%", y: "95%" },
  { x: "50%", y: "95%" },
  { x: "97%", y: "95%" },
];

let currentPoint = 0;
let clickCount = 0;
const maxClicksPerPoint = 5;

function startCalibration() {
  const container = document.getElementById("calibrationContainer");
  alert("Please click on each of the points on the screen. You must click on each point 5 times till it goes yellow. This will calibrate the eye tracking.")
  container.innerHTML = "";
  currentPoint = 0;
  clickCount = 0;
  showNextCalibrationPoint();
}

function showNextCalibrationPoint() {
  const container = document.getElementById("calibrationContainer");
  container.innerHTML = "";

  if (currentPoint >= calibrationPoints.length) {
    console.log("Calibration complete!");
    webgazer.showVideoPreview(false);
    formContainer2.style.display = "block";
    return;
  }

  clickCount = 0;

  const point = calibrationPoints[currentPoint];
  const dot = document.createElement("div");
  dot.classList.add("calibration-dot");

  dot.style.left = `calc(${point.x} - 10px)`;
  dot.style.top = `calc(${point.y} - 10px)`;
  dot.style.position = "absolute";

  container.appendChild(dot);

  dot.addEventListener("click", async () => {
    const feedback = document.createElement("div");
    feedback.classList.add("calibration-feedback");
    feedback.style.position = "absolute";
    feedback.style.top = "10px";
    feedback.style.left = "10px";
    feedback.style.color = "red";

    const prediction = await webgazer.getCurrentPrediction();
    if (prediction) {
      const screenX = window.innerWidth * parseFloat(point.x) / 100;
      const screenY = window.innerHeight * parseFloat(point.y) / 100;

      webgazer.recordScreenPosition(screenX, screenY, "click");
      clickCount++;

      if (maxClicksPerPoint != clickCount) {
        let intensity = ((clickCount + 1) * 0.20);
        dot.style.opacity = intensity;
      } else {
        let green = Math.min(255, Math.floor((clickCount - 0.5) * 2 * 255));
        dot.style.backgroundColor = `rgba(255, ${green}, 0, 1)`;
      }

      if (clickCount >= maxClicksPerPoint) {
        container.removeChild(dot);
        currentPoint++;
        setTimeout(showNextCalibrationPoint, 400);
      }
    } else {
      feedback.textContent = "No gaze detected — please try again.";
      container.appendChild(feedback);
      setTimeout(() => feedback.remove(), 1500);
    }
  });
}