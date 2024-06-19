const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


(async function validateWhyCarSharePage() {
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

    //locate why care share link headlessui-menu-item-226
    let whyCareShareLink = await driver.findElement(By.xpath('//a[text()="Why Yoma Car Share?"]'));
    await whyCareShareLink.click();

    await driver.sleep(2000);

    let currentUrl = await driver.getCurrentUrl();
    if (currentUrl.includes('why-car-share')) {
      console.log('Landed on Why Car Share page!');
    } else {
      console.log('Failed to reach Why Car Share page!');
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
