const path = require('path');
const electron = require('electron');
const TimerTray = require('./app/timer_tray');

const { app, ipcMain} = electron;

const MainWindow = require('./app/main_window');

let mainWindow;
let addWindow;
let mainMenu;
let menuAdd;
let menuTemplate;
let menuTemplateAdd;
let tray;

app.on('ready', () => {
  console.log('App is now ready');
  if (process.platform === 'darwin') app.dock.hide();

  mainWindow = new MainWindow(`file://${__dirname}/src/index.html`);

  // mainWindow.loadURL("http:\\www.google.com");
//  mainWindow.loadURL(`file://${__dirname}/src/index.html`);  //ES6 template string
  // mainWindow.on('closed', () => app.quit());  // add this to turn off all child windows


  const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);


  tray = new TimerTray(iconPath, mainWindow);
// must assign new ClassFunction to a variable to avoid garbage collection of tray icon

//  tray.on('click', (event, bounds) =>
//  });     // replace with TimerTray class



});



ipcMain.on('update-timer', (event, timeLeft) => {
  if (process.platform === 'darwin') tray.setTitle(timeLeft);
});
