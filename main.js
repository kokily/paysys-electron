const { app, BrowserWindow, globalShortcut } = require("electron");
const path = require("path");

app.whenReady().then(() => {
  let win;

  const createWindow = () => {
    win = new BrowserWindow({
      width: 1024,
      height: 768,
      minWidth: 500,
      minHeight: 580,
      icon: path.join(__dirname, "assets/icons/favicon.png"),
      webPreferences: {
        webviewTag: true,
      },
    });

    win.loadURL("https://paysys.kr");
    win.setMenu(null);
  };

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  globalShortcut.register("Ctrl+P", () => {
    win.webContents.print(
      {
        printBackground: true,
      },
      (success, failureReason) => {
        if (!success) console.log(failureReason);
        console.log("Print Success");
      }
    );
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
