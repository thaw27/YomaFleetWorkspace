const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


(async function validateBenefitsPage() {
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

    //locate benefits link
    let benefitsLink = await driver.findElement(By.xpath('//a[text()="Benefits"]'));
    await benefitsLink.click();

    await driver.sleep(2000);

    let currentUrl = await driver.getCurrentUrl();
    if (currentUrl.includes('member-benefits')) {
      console.log('Landed on Benefits page!');
    } else {
      console.log('Failed to reach Benefits page!');
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
