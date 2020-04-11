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

module.exports = conf;
