const electron = require('electron');
const { Tray, app, Menu } = electron;

class TimerTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);
    this.mainWindow = mainWindow;

    this.setToolTip('Timer App');

    this.on('click', this.onClick.bind(this));
    this.on('right-click', this.onRightClick.bind(this));

  }

  onRightClick(event, bounds)  {
    const menuConfig = Menu.buildFromTemplate([
      {
        label: 'Quit',
        click: ( ) => app.quit()
      }
    ]);

    this.popUpContextMenu(menuConfig);

    // Click event bounds
    const { x, y } = bounds;



  }

  onClick(event, bounds)  {
    // Click event bounds
    const { x, y } = bounds;
  //  x = 1200;
  //  y = 300;
    // Window height and width

    var screenElectron = electron.screen;
    var mainScreen = screenElectron.getPrimaryDisplay();
  //  var allScreens = screenElectron.getAllDisplays();

  //  console.log(mainScreen, allScreens);
  //  console.log(mainScreen.size.height, mainScreen.size.width);

    var winmaxwidth = mainScreen.size.width;
    var winmaxheight = mainScreen.size.height;
  //  console.log('max height = ', winmaxheight, 'max width = ', winmaxwidth);



    const { height, width } = this.mainWindow.getBounds();
    var winwidth = width;
    var winheight = height;

    var xPosition = winmaxwidth-Math.round(winwidth*1.2);
    var yPosition = process.platform === 'darwin' ? y : winmaxheight-Math.round(winheight*1.2);

    //console.log(bounds.x, bounds.y);
    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide();
    } else {

//**************Don't do calculations inside .functions if possible
//**************Ensure integers remain integers with Math.round()

      this.mainWindow.setBounds({
        x: xPosition,
        y: yPosition,
        height: winheight,
        width: winwidth
      });

      this.mainWindow.show();

    }

  }


}


module.exports = TimerTray;
