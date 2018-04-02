const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');
const _ = require('lodash');

const execFile = require('child_process').execFile;

const { app, BrowserWindow, ipcMain, shell } = electron;


let mainWindow;


app.on('ready', () => {
  console.log('App is now ready');

  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: { backgroundThrottling: false }  // Keeps running when not focused on the app

  });

  // mainWindow.loadURL("http:\\www.google.com");
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);  //ES6 template string
  // mainWindow.on('closed', () => app.quit());  // add this to turn off all child windows


//    shell.openItem( 'C://Program Files (x86)//NCH Software//ExpressBurn.exe');

});

ipcMain.on('videos:added', (event, videos) => {

  const promises = _.map(videos, video => {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(video.path, (err, metadata) => {
        video.duration = metadata.format.duration;
        video.format = 'avi';
        console.log('video item = ',video);
        resolve(video);
      });
    });
  });

  Promise.all(promises)
  .then((results) => {
    console.log('results = ', results);

    mainWindow.webContents.send('metadata:complete', results);
  });
});

ipcMain.on('conversion:start', (event, videos) => {
  _.each(videos, video => {
    const outputDirectory = video.path.split(video.name)[0];
    const outputName = video.name.split('.')[0];
    const outputPath = `${outputDirectory}${outputName}.${video.format}`;
    console.log('Output Directory is : ', outputDirectory, '\nOutput Name is : ',  outputName, '\nOutput Path is:', outputPath);

    ffmpeg(video.path)
      .output(outputPath)
      .on('progress', ({ timemark }) =>
        mainWindow.webContents.send('conversion:progress', { video, timemark })
      )
      .on('end', () =>
        mainWindow.webContents.send('conversion:end', { video, outputPath })
      )

      .run();

      console.log('Video conversion complete.');
  });


});


ipcMain.on('folder:open', (event, outputPath) => {
  shell.showItemInFolder(outputPath);
});



ipcMain.on('execShell:open', (event, outputPath) => {

const child = execFile('node', ['--version'], (error, stdout, stderr) => {
    if (error) {
        console.error('stderr', stderr);
        throw error;
    }
    console.log('stdout', stdout);
});
//  shell.openExternal('https://github.com')
//  shell.openItem('C:\\Program Files (x86)\\NCH Software\\ExpressBurn.exe');
});
