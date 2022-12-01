const { app, BrowserWindow, ipcMain, Menu, MenuItem } = require('electron');
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
              product_name: 'Tokenization Engine',
              description: 'The Tokenization Engine is about lorem ipsum ...',
              copyright: 'Copyright (c) 2022 Chia Network 2022',
              app,
              BrowserWindow,
              ipcMain,
            });
          },
        },
      ],
    }),
  );

  Menu.setApplicationMenu(newMenu);
}

// app.applicationMenu = menu;

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

/*
openAboutWindow({
  icon_path: path.join(__dirname, '/../public/favicon.ico'),
  app,
  BrowserWindow,
  ipcMain,
});

Menu.buildFromTemplate([
  {
    label: 'About',
    submenu: [
      // {
      //   label: 'About This App',
      //   click: () =>
      //     openAboutWindow({
      //       icon_path: join(__dirname, 'icon.png'),
      //       copyright: 'Copyright (c) 2015 rhysd',
      //       package_json_dir: __dirname,
      //       open_devtools: process.env.NODE_ENV !== 'production',
      //     }),
      // },
      // {
      //   label: 'About This App (custom version entry)',
      //   click: () =>
      //     openAboutWindow({
      //       icon_path: join(__dirname, 'icon.png'),
      //       copyright: 'Copyright (c) 2015 rhysd',
      //       package_json_dir: __dirname,
      //       use_version_info: [
      //         ['my version entry 1', 'a.b.c'],
      //         ['my version entry 2', 'x.y.z'],
      //       ],
      //     }),
      // },
      {
        label: 'About This App (modal with close)',
        click: () =>
          openAboutWindow({
            icon_path: '../public/favicon.ico',
            app,
            BrowserWindow,
            ipcMain,
          }),
      },
      {
        role: 'quit',
      },
    ],
  },
]);
*/
