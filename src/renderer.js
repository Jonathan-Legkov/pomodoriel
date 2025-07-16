// Timer class - moved here to work in browser context without require()
class Timer {
  constructor({ onTick, onEnd }) {
    this.duration = 0;
    this.remainingTime = 0;
    this.isRunning = false;
    this.intervalId = null;
    this.onTick = onTick;
    this.onEnd = onEnd;
  }

  start(durationInSeconds) {
    if (this.isRunning) return;

    this.isRunning = true;
    this.remainingTime = this.remainingTime > 0 ? this.remainingTime : durationInSeconds;
    this.duration = durationInSeconds;

    this.intervalId = setInterval(() => {
      this.remainingTime--;

      this.onTick(this.remainingTime);

      if (this.remainingTime <= 0) {
        this.pause();
        this.onEnd();
      }
    }, 1000);
  }

  pause() {
    if (!this.isRunning) return;
    this.isRunning = false;
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  reset(durationInSeconds) {
    this.pause();
    this.remainingTime = durationInSeconds || this.duration;
    this.onTick(this.remainingTime);
  }

  getFormattedTime() {
    const minutes = Math.floor(this.remainingTime / 60);
    const seconds = this.remainingTime % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
}

// Platform detection and Windows-specific adjustments
function applyPlatformSpecificStyles() {
  // Check if we're on Windows by looking at user agent
  const isWindows = navigator.userAgent.includes('Windows');
  
  if (isWindows) {
    // Add Windows-specific class to body for additional styling
    document.body.classList.add('windows-platform');
    
    // Adjust toggle button positioning for Windows
    const toggleBtn = document.getElementById('toggle-size-btn');
    if (toggleBtn) {
      // Add additional spacing for Windows title bar
      toggleBtn.style.top = '25px';
      toggleBtn.style.right = '25px';
      
      // Add tooltip for better UX on Windows
      toggleBtn.title = 'Toggle compact view';
      
      // Improve click handling for Windows
      toggleBtn.addEventListener('mousedown', (e) => {
        e.preventDefault(); // Prevent any default behavior
        toggleBtn.style.transform = 'scale(0.95)';
      });
      
      toggleBtn.addEventListener('mouseup', () => {
        toggleBtn.style.transform = 'scale(1.1)';
      });
    }
  }
}

// --- UI Elements ---
const timerDisplay = document.querySelector('.timer-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const workDurationInput = document.getElementById('work-duration');
const breakDurationInput = document.getElementById('break-duration');
const setDurationsBtn = document.getElementById('set-durations-btn');
const presetBtns = document.querySelectorAll('.preset-btn');
const container = document.querySelector('.container');
const audioWorkEnd = document.getElementById('audio-work-end');
const audioBreakEnd = document.getElementById('audio-break-end');
const audioTick = document.getElementById('audio-tick');
const devSkipBtn = document.getElementById('dev-skip-btn');
const alwaysOnTopCheckbox = document.getElementById('always-on-top-checkbox');
const toggleSizeBtn = document.getElementById('toggle-size-btn');
const compactStartBtn = document.getElementById('compact-start-btn');
const compactPauseBtn = document.getElementById('compact-pause-btn');
const compactResetBtn = document.getElementById('compact-reset-btn');

// --- State ---
let currentMode = 'work'; // 'work' or 'break'
let workDuration = 25 * 60; // Default 25 minutes
let breakDuration = 5 * 60; // Default 5 minutes

// --- Timer Callbacks ---
const updateDisplay = () => {
    timerDisplay.textContent = timer.getFormattedTime();
};

const onTimerEnd = () => {
    // Switch between work and break modes
    if (currentMode === 'work') {
        currentMode = 'break';
        document.body.classList.remove('work-mode');
        document.body.classList.add('break-mode');
        
        audioWorkEnd.currentTime = 0;
        audioWorkEnd.play();
        
        timer.reset(breakDuration);
        updateDisplay();
    } else {
        currentMode = 'work';
        document.body.classList.remove('break-mode');
        document.body.classList.add('work-mode');
        
        audioBreakEnd.currentTime = 0;
        audioBreakEnd.play();
        
        timer.reset(workDuration);
        updateDisplay();
    }
    
    window.electronAPI.send('timer-state', 'stopped');
};

const timer = new Timer({
    onTick: (remainingTime) => {
        updateDisplay();
        // Play tick sound only during the last 5 seconds
        if (remainingTime <= 5 && remainingTime > 0 && timer.isRunning) {
            audioTick.currentTime = 0;
            audioTick.play();
        }
    },
    onEnd: onTimerEnd,
});

// --- Logic ---
function applyNewDurations() {
    workDuration = parseInt(workDurationInput.value) * 60;
    breakDuration = parseInt(breakDurationInput.value) * 60;

    if (!timer.isRunning) {
        const newDuration = currentMode === 'work' ? workDuration : breakDuration;
        timer.reset(newDuration);
    }
}

function forceResetToWorkState() {
    timer.pause();
    currentMode = 'work';
    document.body.classList.remove('break-mode');
    document.body.classList.add('work-mode');
    timer.reset(workDuration);
    window.electronAPI.send('timer-state', 'stopped');
}

function initializeApp() {
    // Apply platform-specific styles
    applyPlatformSpecificStyles();
    
    // Set initial mode
    document.body.classList.add('work-mode');
    
    // Reset to work state
    forceResetToWorkState();
    
    // Set up always-on-top functionality
    alwaysOnTopCheckbox.addEventListener('change', (e) => {
        window.electronAPI.send('set-always-on-top', e.target.checked);
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);

devSkipBtn.addEventListener('click', () => {
    timer.pause();
    timer.remainingTime = 5; // Set to 5 seconds for testing
    timer.start(5);
    updateDisplay();
    window.electronAPI.send('timer-state', 'running');
});

// Also initialize immediately in case DOMContentLoaded already fired
if (document.readyState === 'loading') {
    // DOM is still loading, wait for DOMContentLoaded
} else {
    // DOM is already loaded
    initializeApp();
}

// --- Event Listeners ---
startBtn.addEventListener('click', () => {
    const durationForCurrentMode = currentMode === 'work' ? workDuration : breakDuration;
    timer.start(durationForCurrentMode);
    window.electronAPI.send('timer-state', 'running');
});

pauseBtn.addEventListener('click', () => {
    timer.pause();
    window.electronAPI.send('timer-state', 'paused');
});

resetBtn.addEventListener('click', forceResetToWorkState);

compactStartBtn.addEventListener('click', () => {
    const durationForCurrentMode = currentMode === 'work' ? workDuration : breakDuration;
    timer.start(durationForCurrentMode);
    window.electronAPI.send('timer-state', 'running');
});

compactPauseBtn.addEventListener('click', () => {
    timer.pause();
    window.electronAPI.send('timer-state', 'paused');
});

compactResetBtn.addEventListener('click', forceResetToWorkState);

setDurationsBtn.addEventListener('click', applyNewDurations);

presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        workDurationInput.value = btn.dataset.work;
        breakDurationInput.value = btn.dataset.break;
        applyNewDurations();
    });
});

// Improved toggle functionality with Windows-specific handling
toggleSizeBtn.addEventListener('click', () => {
    container.classList.toggle('compact-view');
    window.electronAPI.send('toggle-view');
});

// Add keyboard shortcut for toggle (Ctrl+T or Cmd+T)
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault();
        toggleSizeBtn.click();
    }
});