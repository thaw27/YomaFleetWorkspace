const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


(async function validateHowItWorkPage() {
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
    
    // Click the "More" link
    await moreLink.click();

    await driver.sleep(2000);

    //locate how it works link
    let howitworkLink = await driver.findElement(By.xpath('//a[text()="How Yoma Car Share works"]'));
    await howitworkLink.click();

    await driver.sleep(2000);

    //locate become a member
    let becomeMember = await driver.findElement(By.xpath('//*[@id="__next"]/main/div[3]/div/article[1]/a/span/img'));
    becomeMember.click();

    await driver.sleep(5000);


    let becomeMemberUrl = await driver.getCurrentUrl();
    if (becomeMemberUrl.includes('become-a-member')) {
      console.log('Become Memeber validation passed!');
    } else {
      console.log('Become Memeber validation failed!');
    }

    //locate how to reserve
    let reserveCar = await driver.findElement(By.xpath('//*[@id="__next"]/main/div[2]/div/article[2]/a/span/img'));
    reserveCar.click();

    await driver.sleep(5000);


    let reserveUrl = await driver.getCurrentUrl();
    if (reserveUrl.includes('how-to-reserve')) {
      console.log('How to reserve validation passed!');
    } else {
      console.log('How to reserve validation failed!');
    }

    //locate self drive
    let selfDrive = await driver.findElement(By.xpath('//*[@id="__next"]/main/div[2]/div/article[3]/a/span/img'));
    selfDrive.click();

    await driver.sleep(5000);

    let selfDriveUrl = await driver.getCurrentUrl();
    if (selfDriveUrl.includes('self-driving')) {
      console.log('Self Drive validation passed!');
    } else {
      console.log('Self Drive validation failed!');
    }

    //locate return car
    let returnCar = await driver.findElement(By.xpath('//*[@id="__next"]/main/div[2]/div/article[4]/a/span/img'));
    returnCar.click();

    await driver.sleep(5000);

    let returnUrl = await driver.getCurrentUrl();
    if (returnUrl.includes('self-driving')) {
      console.log('Return Car validation passed!');
    } else {
      console.log('Return Car validation failed!');
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
