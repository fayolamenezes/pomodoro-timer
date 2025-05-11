let focusTime = 25 * 60;  // Default focus time (25 minutes in seconds)
let breakTime = 5 * 60;   // Default break time (5 minutes in seconds)
let timeLeft = focusTime; // Current remaining time (starts with focus time)
let isRunning = false;
let isFocus = true;       // Whether current session is focus or break
let interval;             // Stores the interval for the timer

let audio = new Audio();
let isPlaying = false;

const circle = document.querySelector('.progress-ring__circle');
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = `${circumference}`;

function setProgress(percent) {
  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;
}

const volumeSlider = document.getElementById("volumeSlider");

// Set initial volume based on saved value
audio.volume = localStorage.getItem('volume') ? localStorage.getItem('volume') : volumeSlider.value;

// Update volume on slider input and save to localStorage
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
  localStorage.setItem('volume', volumeSlider.value);
});

function changeSound() {
  const sound = document.getElementById("soundSelect").value;
  if (sound) {
    audio.src = `sounds/${sound}.mp3`;
    audio.loop = true;
    audio.volume = 0.5; // Default volume
    if (isPlaying) {
      audio.play();
    }
  } else {
    audio.pause();
    isPlaying = false;
  }
}

function playSound() {
  if (!audio.src) {
    alert("Please select a sound from the dropdown first!");
    return;
  }
  audio.play();
  isPlaying = true;
}

function pauseSound() {
  audio.pause();
  isPlaying = false;
}

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');
  document.getElementById("timer").textContent = `${minutes}:${seconds}`;
  document.getElementById("status").textContent = isFocus ? "Focus Time" : "Break Time";
}

function startTimer() {
  if (!isRunning) {
    const totalTime = timeLeft; // total time of current session (focus or break)

    interval = setInterval(() => {
      timeLeft--;
      updateDisplay();

      // Calculate percentage and update circle animation
      const percentComplete = ((totalTime - timeLeft) / totalTime) * 100;
      setProgress(percentComplete);

      if (timeLeft <= 0) {
        clearInterval(interval);
        isRunning = false;
        isFocus = !isFocus;
        timeLeft = isFocus ? focusTime : breakTime;
        alert(isFocus ? "Break over! Back to focus! 💪" : "Time for a break! ☕");

        // Reset progress to 0 and start next session
        setProgress(0);
        startTimer();
      }
    }, 1000);

    isRunning = true;
  }
}

function pauseTimer() {
  clearInterval(interval);
  isRunning = false;
}

function resetTimer() {
  clearInterval(interval);
  isRunning = false;
  isFocus = true;
  timeLeft = focusTime;
  updateDisplay();
  setProgress(0);
}

// Load saved state from localStorage (timer, sound, and dark mode)
function loadState() {
  // Timer state
  if (localStorage.getItem('focusTime')) {
    focusTime = parseInt(localStorage.getItem('focusTime'));
    breakTime = parseInt(localStorage.getItem('breakTime'));
    timeLeft = parseInt(localStorage.getItem('timeLeft')) || focusTime;
    isFocus = localStorage.getItem('isFocus') === 'true';
  }

  // Sound settings
  const savedSound = localStorage.getItem('sound');
  if (savedSound) {
    document.getElementById('soundSelect').value = savedSound;
    changeSound();
  }

  // Update display and progress after loading state
  updateDisplay();
  setProgress(((focusTime - timeLeft) / focusTime) * 100);
}

loadState(); // Load state on page load

// Save current state to localStorage
function saveState() {
  localStorage.setItem('focusTime', focusTime);
  localStorage.setItem('breakTime', breakTime);
  localStorage.setItem('timeLeft', timeLeft);
  localStorage.setItem('isFocus', isFocus);
  localStorage.setItem('sound', document.getElementById('soundSelect').value);
}

// Get the dark mode toggle button and body element
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

// Check if the user has a saved theme preference
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
  darkModeToggle.textContent = "Light Mode";  // Update button text
} else {
  darkModeToggle.textContent = "Dark Mode";  // Update button text
}

// Toggle dark mode on button click
darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');  // Toggle the 'dark' class
  if (body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
    darkModeToggle.textContent = "Light Mode";
  } else {
    localStorage.setItem('theme', 'light');
    darkModeToggle.textContent = "Dark Mode";
  }
});

// Save state on any changes
window.addEventListener('beforeunload', saveState);
