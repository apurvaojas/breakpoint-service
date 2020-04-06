module.exports = {
  launch: {
    dumpio: true,
    headless: true,
    args: ['--disable-infobars'],
    defaultViewport: {
      width: 800,
      height: 800,
      isMobile: false,
      hasTouch: false
    }
  },
  browserContext: 'default',
};
