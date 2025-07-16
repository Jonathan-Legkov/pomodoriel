# Pomodoro Timer Desktop App

A simple, elegant Pomodoro timer desktop application built with Electron.

## Features

- **Customizable Timers**: Set custom work and break durations
- **Visual Feedback**: Different color themes for work (soft pink) and break (light blue) sessions
- **Audio Alerts**: Distinct sounds for work-to-break and break-to-work transitions
- **Compact View**: Toggle between full and compact window modes
- **Always On Top**: Keep the timer visible above other windows
- **Keyboard Shortcuts**: Use Ctrl+T (Cmd+T on Mac) to toggle compact view

## Windows-Specific Improvements

### Toggle Button ("Make Small") Fix

The toggle button (⤡) has been optimized for Windows users:

**Previous Issues:**
- Button positioned too close to Windows title bar and window controls
- Poor visibility against different backgrounds
- Difficult to click due to interference with OS window controls

**Solutions Implemented:**
- **Better Positioning**: Moved button further from title bar and window controls (30px from top/right on Windows)
- **Improved Visibility**: Added subtle background, border, and blur effects
- **Larger Click Area**: Increased padding and minimum size for easier clicking
- **Platform Detection**: Automatic detection of Windows platform for specific styling
- **Enhanced Feedback**: Better hover effects and click animations
- **Keyboard Shortcut**: Added Ctrl+T as alternative to clicking the button

### Technical Details

The fixes include:
- **CSS**: Windows-specific styling with `.windows-platform` class
- **JavaScript**: Platform detection and dynamic positioning
- **Electron**: Window positioning improvements for compact mode
- **UX**: Tooltip and improved click handling

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the application: `npm start`

## Usage

### Basic Controls
- **Start/Pause**: Begin or pause the current timer
- **Reset**: Reset to work mode and stop the timer
- **Settings**: Adjust work and break durations
- **Presets**: Quick access to common timing configurations (25/5, 50/10)

### Compact View
- **Click the toggle button** (⤡) in the top-right corner
- **Use keyboard shortcut**: Ctrl+T (Windows) or Cmd+T (Mac)
- **Compact mode**: Shows only timer and essential controls
- **Full mode**: Shows all settings and controls

### Always On Top
- Use the checkbox to keep the timer above other windows
- Helpful for maintaining focus while working

## Testing

Run the functionality tests by opening the developer console and loading `test-functionality.js`. The tests include:
- Basic element existence
- Input validation
- Preset button functionality
- Toggle button behavior (Windows-specific)
- Keyboard shortcuts
- Platform-specific positioning

## Development

### File Structure
- `src/main.js` - Main Electron process
- `src/renderer.js` - Renderer process and UI logic
- `src/index.html` - Main HTML structure
- `src/style.css` - Styling including Windows-specific fixes
- `src/preload.js` - Secure IPC bridge
- `src/utils/timer.js` - Timer logic
- `test-functionality.js` - Functionality tests

### Windows-Specific Code
The application includes platform-specific handling for Windows:
- Automatic Windows detection via user agent
- Dynamic CSS class application
- Adjusted positioning for Windows title bar
- Enhanced click handling for Windows users

## License

ISC 