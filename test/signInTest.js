const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async function singIn() {
  // Create a new instance of the Chrome driver
  let driver = await new Builder()
    .forBrowser('chrome')
    .build();

  try {
    // Navigate to the yoma fleet carshare page
    await driver.get('https://carshare.yomafleet.com/');
    await driver.manage().window().maximize();
    
    // Wait for the "Sign In" link to be located using the provided XPath
    let signInButton = await driver.wait(
      until.elementLocated(By.xpath('//*[@id="__next"]/nav/div/div/div[1]/div[3]/div[1]/a[1]')),
      10000
    );
    
    // Click the "Sign In" link
    await signInButton.click();

    // Wait for the "Sign In" page to fully load by waiting for key elements to be present
    // Wait for email input field
    await driver.wait(until.elementLocated(By.id('username')), 20000);
    // Wait for password input field
    await driver.wait(until.elementLocated(By.id('password')), 20000);
    // Wait for the login button
    await driver.wait(until.elementLocated(By.xpath('//*[@id="__next"]/div/div[1]/div[2]/div/form/button')), 20000);

    // verify if these elements are displayed
    let usernameField = await driver.findElement(By.id('username'));
    let passwordField = await driver.findElement(By.id('password'));
    let loginButton = await driver.findElement(By.xpath('//*[@id="__next"]/div/div[1]/div[2]/div/form/button'));

    //enter email
    await usernameField.sendKeys('joyce.thaw.27@gmail.com');
    //enter password
    await passwordField.sendKeys('12345678');
    //set delay to check the inputs
    await sleep(2000);
    //click login button
    await loginButton.click();

    //set delay to load home page
    await sleep(5000);

    let currentUrl = await driver.getCurrentUrl();
    if (currentUrl.includes('findacar')) {
      console.log('Successfully logged in!');
    } else {
      console.log('Failed to login!');
    }


  } finally {
    // Quit the browser
    await driver.quit();
  }
})();
