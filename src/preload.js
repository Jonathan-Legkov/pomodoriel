// This file helps to securely expose Node.js APIs to the renderer process.
// We will add contextBridge logic here if needed for IPC. 

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  send: (channel, data) => {
    // Whitelist channels
    let validChannels = ['set-always-on-top', 'timer-state', 'toggle-view'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  on: (channel, func) => {
    let validChannels = []; // No channels from main to renderer needed yet
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender` 
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  }
}); 