## Relevant Files

- `src/main.js` - Main application entry point. Handles window creation and application lifecycle events.
- `src/renderer.js` - Main logic for the renderer process, handling UI updates and user interactions.
- `src/preload.js` - Bridges the main and renderer processes, exposing Node.js APIs securely.
- `src/index.html` - The main HTML file for the application's UI.
- `src/style.css` - Stylesheet for the application, including color themes for work/rest modes.
- `src/utils/timer.js` - Contains the core timer logic (start, pause, reset, countdown).
- `src/utils/timer.test.js` - Unit tests for the timer logic.
- `src/audio/work-end.mp3` - Sound file for the work-to-break transition.
- `src/audio/break-end.mp3` - Sound file for the break-to-work transition.

### Notes

- This project could be set up using a framework like Electron for cross-platform desktop support.
- Unit tests should be written for core logic like the timer utility. Use a framework like Jest.
- To run tests: `npx jest src/utils/timer.test.js`.

## Tasks

- [x] 1.0 Setup Basic Application Structure and UI Shell
  - [x] 1.1 Initialize a new project with a suitable desktop app framework (e.g., Electron).
  - [x] 1.2 Create the main application window and basic HTML structure (`index.html`).
  - [x] 1.3 Design the static UI layout with placeholders for the timer display, controls (start, pause, reset), and settings.
  - [x] 1.4 Link the main stylesheet and implement the default (soft pink) color theme.
- [x] 2.0 Implement Core Timer Logic and Controls
  - [x] 2.1 Create a `timer.js` utility to handle all timer state logic (running, paused, finished).
  - [x] 2.2 Implement the countdown mechanism within the timer utility.
  - [x] 2.3 Connect the "Start," "Pause," and "Reset" UI buttons to the timer logic.
  - [x] 2.4 Display the formatted time (MM:SS) in the UI and ensure it updates every second.
  - [x] 2.5 Write unit tests for the `timer.js` utility to verify its correctness.
- [x] 3.0 Develop Timer Configuration and Settings UI
  - [x] 3.1 Create a settings area or modal in the UI.
  - [x] 3.2 Add input fields for users to set custom work and break durations.
  - [x] 3.3 Add buttons for pre-defined presets (e.g., 25/5, 50/10).
  - [x] 3.4 Ensure the timer logic uses the selected or custom durations when a new session starts.
- [x] 4.0 Implement Visual and Audio Feedback
  - [x] 4.1 Implement the logic to automatically switch between "Work" and "Break" modes when the timer completes.
  - [x] 4.2 Create CSS classes for the different color themes (soft pink for work, light blue for break).
  - [x] 4.3 Dynamically apply the correct color theme class to the main UI container based on the current timer mode.
  - [x] 4.4 Load and play the appropriate audio alert (`work-end.mp3`, `break-end.mp3`) when a session transition occurs.
- [x] 5.0 Implement Window Management and Application State
  - [x] 5.1 Implement the "always on top" functionality, with a UI control (e.g., a checkbox) to toggle it.
  - [x] 5.2 Implement logic to allow the window to be resized to a minimal, compact view.
  - [x] 5.3 Ensure the timer display remains clear and functional in the compact view.
  - [x] 5.4 Implement the pre-close confirmation dialog that appears if the user tries to close the app while a timer is active. 