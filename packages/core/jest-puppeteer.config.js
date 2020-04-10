const conf = {
  launch: {
    dumpio: true,
    headless: false,
    args: ['--disable-infobars'],
    defaultViewport: {
      width: 800,
      height: 800,
      isMobile: false,
      hasTouch: false
    },
  },
  browserContext: 'default',
};

// if(process.platform === "win32" || process.platform === "darwin") {
  // console.log("*******************************\n*******************************************\n\n")
  // conf.launch.executablePath = '/usr/bin/google-chrome-stable';
// }

module.exports = conf;
