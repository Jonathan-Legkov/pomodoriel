const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 540,
    // Add Windows-specific configurations
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    frame: true,
    resizable: true,
    minimizable: true,
    maximizable: false, // Prevent maximize to avoid layout issues
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  const SIZES = {
      FULL: { width: 400, height: 540 }, // Increased width to match initial window
      COMPACT: { width: 200, height: 110 }
  };
  let isCompact = false;

  mainWindow.loadFile('src/index.html');
  mainWindow.setAlwaysOnTop(true);

  let isTimerRunning = false;

  ipcMain.on('set-always-on-top', (event, isAlwaysOnTop) => {
    mainWindow.setAlwaysOnTop(isAlwaysOnTop);
  });

  ipcMain.on('toggle-view', () => {
    isCompact = !isCompact;
    const newSize = isCompact ? SIZES.COMPACT : SIZES.FULL;
    mainWindow.setResizable(!isCompact);
    mainWindow.setSize(newSize.width, newSize.height, true);
    
    // On Windows, ensure the window stays in a good position after resizing
    if (process.platform === 'win32' && isCompact) {
      const { screen } = require('electron');
      const primaryDisplay = screen.getPrimaryDisplay();
      const { width, height } = primaryDisplay.workAreaSize;
      
      // Position compact window in top-right corner, accounting for window controls
      mainWindow.setPosition(width - newSize.width - 20, 50);
    }
  });

  ipcMain.on('timer-state', (event, state) => {
      isTimerRunning = state === 'running';
  });

  mainWindow.on('close', (e) => {
    if (isTimerRunning) {
        const choice = dialog.showMessageBoxSync(mainWindow, {
            type: 'question',
            buttons: ['Yes', 'No'],
            title: 'Confirm',
            message: 'A timer is still running. Are you sure you want to quit?'
        });
        if (choice === 1) {
            e.preventDefault();
        }
    }
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
}); 