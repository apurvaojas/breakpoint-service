const path = require('path');

const callback = jest.fn();

const waitForEvent = () => {
  return new Promise((resolve, reject) => {
    page.on('console', (msg) => {
      console.log(msg.text());
      resolve(msg);
    });
  });
};

describe('Breakpoint Service E2E Test suit', () => {

  it('should emit the event on page load', async () => {
    
    page.goto(`file://${path.join(__dirname, 'index.html')}`);
    await waitForEvent();

    const screen = await page.evaluate(() =>  document.getElementById('screen').innerText);
    const isTouchDevice = await page.evaluate(() => document.getElementById('isTouch').innerText);

    expect(screen).toBe('medium');
    expect(isTouchDevice).toBe('false');
    
  });

  it('should emit the event on extra-small device', async () => {
    await page.setViewport({
      width: 300,
      height: 480,
      isMobile: true,
      hasTouch: true
    });
    await waitForEvent();

    const screen = await page.evaluate(() =>  document.getElementById('screen').innerText);
    const isTouchDevice = await page.evaluate(() => document.getElementById('isTouch').innerText);

    expect(screen).toBe('extra-small');
    expect(isTouchDevice).toBe('true');
    
  });
});
