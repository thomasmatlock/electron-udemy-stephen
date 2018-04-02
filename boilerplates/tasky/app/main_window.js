const electron = require('electron');
//const TimerTray = require('./app/timer_tray');

const { app, BrowserWindow, Tray } = electron;


class MainWindow extends BrowserWindow {
  constructor(url) {
    super({
      height: 440,
      width: 260,
      title: 'Tasky App',
      frame: false,
      resizable: false,
      show: false,
      webPreferences: { backgroundThrottling: false }  // Keeps running when not focused on the app
    });

    // mainWindow.loadURL("http:\\www.google.com");
    this.loadURL(url);  //ES6 template string
    // mainWindow.on('closed', () => app.quit());  // add this to turn off all child windows



    this.on('blur', this.onBlur.bind(this));
    var wheight = this.height;
    var wwidth = this.width;


  }

  onBlur() {
    this.hide();
  }


}


module.exports = MainWindow;
