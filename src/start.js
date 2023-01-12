const { app, BrowserWindow, Menu, MenuItem, shell } = require('electron');
const openAboutWindow = require('about-window').default;

const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 575,
    webPreferences: {
      nodeIntegration: true,
    },
    icon: path.join(__dirname, '/../public/favicon.ico'),
    title: 'Carbon Tokenization Engine',
  });

  mainWindow.loadURL(
    process.env.ELECTRON_START_URL ||
      url.format({
        pathname: path.join(__dirname, '/../public/index.html'),
        protocol: 'file:',
        slashes: true,
      }),
  );

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.webContents.on('new-window', (e, url) => {
    e.preventDefault();
    require('electron').shell.openExternal(url);
  });

  let defaultMenu = Menu.getApplicationMenu();
  let newMenu = new Menu();
  defaultMenu.items.forEach(mainMenuItem => {
    newMenu.append(mainMenuItem);
  });

  newMenu.append(
    new MenuItem({
      label: 'About',
      submenu: [
        {
          label: 'About',
          click() {
            openAboutWindow({
              icon_path: path.join(
                __dirname,
                '/../public/android-chrome-512x512.png',
              ),
              copyright: '© Chia Network 2022',
            });
          },
        },
      ],
    }),
  );

  Menu.setApplicationMenu(newMenu);

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
