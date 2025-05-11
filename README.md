# ⏱ Pomodoro Timer

A visually engaging and functional **Pomodoro Timer** built with HTML, CSS, and JavaScript. Designed to help boost productivity through structured focus and break sessions, with added ambient sounds, progress animation, and dark mode support.

---

## Features

- 25-minute focus & 5-minute break timer (Pomodoro Technique)
- Ambient sound selector (rain, beach, birds, forest, wind)
- Volume control for ambient sounds
- Auto-switch between focus and break sessions
- Circular progress ring animation
- Toggle between light and dark mode
- State persistence via `localStorage` (timer, sound, theme)
- Motivational popup messages

---
## Project Structure
pomodoro-timer/
├── index.html
├── styles.css
├── script.js
├── sounds/
│ ├── rain.mp3
│ ├── beach.mp3
│ ├── birds.mp3
│ ├── forest.mp3
│ └── calm.mp3
└── images/
└── bg.jpg

---

## How to Run

1. **Clone the repository** or download the files:

   ```bash
   git clone https://github.com/fayolamenezes/pomodoro-timer.git
   cd pomodoro-timer

2. **Open index.html in your browser:**
   You can simply double-click index.html, or
   Run a local server with VS Code Live Server extension

3. **You can tweak it easily:**
   Change focus/break duration in script.js:

    let focusTime = 25 * 60; // 25 minutes
    let breakTime = 5 * 60;  // 5 minutes
    Add/Replace ambient sounds in the sounds/ folder.
    Change background image in images/bg.jpg.

License
This project is licensed under the MIT License.
