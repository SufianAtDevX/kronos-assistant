// main.js
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

/**
 * Creates the main Electron browser window.
 */
function createWindow() {
  // Initialize the browser window with specific dimensions and web preferences.
  const mainWindow = new BrowserWindow({
    width: 1200, // Initial width of the window
    height: 800, // Initial height of the window
    minWidth: 800, // Minimum width allowed for resizing
    minHeight: 600, // Minimum height allowed for resizing
    webPreferences: {
      // preload.js can be used to expose Node.js APIs to the renderer process safely.
      // For this basic setup, it's not strictly necessary unless you need Node.js features in your React app.
      preload: path.join(__dirname, 'preload.js'),
      // nodeIntegration: true, // WARNING: Enabling nodeIntegration can be a security risk.
                               // Only enable if you fully understand the implications.
      // contextIsolation: false, // WARNING: Disabling contextIsolation can be a security risk.
                                // Only disable if you fully understand the implications.
    },
  });

  // Determine the URL to load in the Electron window.
  // During development, it loads from the React development server (http://localhost:3000).
  // In production (after 'npm run build-react'), it loads the built React files.
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, 'frontend/build/index.html'), // Path to your built React app's index.html
    protocol: 'file:', // Use file protocol for local files
    slashes: true // Required for file protocol
  });

  // Load the URL into the Electron window.
  mainWindow.loadURL(startUrl);

  // Open the DevTools (Chromium's developer tools) for debugging.
  // Uncomment the line below to enable DevTools when the app starts.
  // mainWindow.webContents.openDevTools();
}

// This event is fired when Electron has finished initialization
// and is ready to create browser windows.
app.whenReady().then(createWindow);

// Quit the application when all windows are closed,
// unless on macOS (Cmd + Q behavior).
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// On macOS, re-create a window when the dock icon is clicked
// and there are no other windows open.
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// You can add more main process specific code here,
// such as IPC (Inter-Process Communication) handlers,
// menu bar definitions, etc.
