const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


(async function validateReviewPage() {
  // Create a new instance of the Chrome driver
  let driver = await new Builder()
    .forBrowser('chrome')
    .build();

  try {
    // Navigate to the yoma fleet carshare page
    await driver.get('https://carshare.yomafleet.com/');
    await driver.manage().window().maximize();
    
    // Wait for the More link to be located using the provided XPath
    let moreLink = await driver.wait(
      until.elementLocated(By.xpath('//button[.//span[text()="More"]]')),
      10000
    );
    
    // Click the More link
    await moreLink.click();

    await driver.sleep(2000);

    //locate rental review link
    let reviewLink = await driver.findElement(By.xpath('//a[text()="Rental Reviews"]'));
    await reviewLink.click();

    await driver.sleep(2000);

    let currentUrl = await driver.getCurrentUrl();
    if (currentUrl.includes('rental-reviews')) {
      console.log('Landed on Rental Review page!');
    } else {
      console.log('Failed to reach Rental Review page!');
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
