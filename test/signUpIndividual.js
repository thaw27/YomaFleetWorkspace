const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async function singUpIndividual() {
  // Create a new instance of the Chrome driver
  let driver = await new Builder()
    .forBrowser('chrome')
    .build();

  try {
    // Navigate to the yoma fleet carshare page
    await driver.get('https://carshare.yomafleet.com/');
    await driver.manage().window().maximize();
    
    // Wait for the "Sign Up" link to be located using the provided XPath
    let signUpButton = await driver.wait(
      until.elementLocated(By.xpath('//*[@id="__next"]/nav/div/div/div[1]/div[3]/div[1]/a[2]')),
      10000
    );
    
    // Click the "Sign Up" link
    await signUpButton.click();

  
    // Wait for Join Now button to display 
    await driver.wait(until.elementLocated(By.xpath('//*[@id="__next"]/div/div[1]/div[2]/div/button[1]')), 20000);
  

    // verify if button displayed
    let joinButton = await driver.findElement(By.xpath('//*[@id="__next"]/div/div[1]/div[2]/div/button[1]'));

    //click join now button
    await joinButton.click();

    // Wait for the register page to fully load by waiting for key elements to be present
    // Wait for full name input field
    await driver.wait(until.elementLocated(By.id('fullName')), 20000);
    // Wait for email input field
    await driver.wait(until.elementLocated(By.id('username')), 20000);
    // Wait for password input field
    await driver.wait(until.elementLocated(By.id('password')), 20000);
    // Wait for confirm password input field
    await driver.wait(until.elementLocated(By.id('confirmPassword')), 20000);
    // Wait for the submit button
    await driver.wait(until.elementLocated(By.xpath('//*[@id="__next"]/div/div[1]/div[2]/div/form/button'),20000));

    let nameField = await driver.findElement(By.id('fullName'));
    let emailField = await driver.findElement(By.id('username'));
    let pwdField = await driver.findElement(By.id('password'));
    let cfmPwdField = await driver.findElement(By.id('confirmPassword'));
    let submitBtn = await driver.findElement(By.xpath('//*[@id="__next"]/div/div[1]/div[2]/div/form/button'));

    //enter full name
    await nameField.sendKeys("Tester One");
    //enter email
    await emailField.sendKeys("tester_eleven@mail.test");
    //enter password
    await pwdField.sendKeys("00112233");
    //enter confirm password
    await cfmPwdField.sendKeys("00112233");

    //set delay to check the inputs
    await sleep(2000);

    await submitBtn.click();

    await sleep(2000);

    let currentUrl = await driver.getCurrentUrl();
    if (currentUrl.includes('verify')) {
      console.log('Registratrion success!');
    } else {
      console.log('Registration failed!');
    }
  } 

  catch (error){
    console.error('Error:', error.message)
  }
  
  finally {
    // Quit the browser
    await driver.quit();
  }
})();
