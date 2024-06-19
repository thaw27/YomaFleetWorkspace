const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


(async function validateLocationPage() {
  // Create a new instance of the Chrome driver
  let driver = await new Builder()
    .forBrowser('chrome')
    .build();

  try {
    // Navigate to the yoma fleet carshare page
    await driver.get('https://carshare.yomafleet.com/');
    await driver.manage().window().maximize();
    
    // Wait for the Location link to be located using the provided XPath
    let locationLink = await driver.wait(
      until.elementLocated(By.xpath('//*[@id="__next"]/nav/div/div/div[1]/div[2]/div/a[4]')),
      10000
    );
    
    // Click the "Location" link
    await locationLink.click();

    //wait to load the page fully
    await driver.sleep(5000);

    //locate search box
    let searchBox = await driver.findElement(By.id('react-select-2-placeholder'));
    
    //open search dropdown
    await searchBox.click();

    // Wait for the dropdown options to be visible
    await driver.sleep(1000); 

    //locate Yangon
    let locationYgn = await driver.findElement(By.xpath('//div[@id="react-select-2-option-0"]'));

    //select Yangon
    locationYgn.click();

    //set delay to load and fetch the result
    await driver.sleep(10000);

    let aweiMetta;
        try {
            aweiMetta = await driver.findElement(By.xpath('//*[@id="__next"]/main/div/div/div/section/div[2]/article[1]/h4'));
            console.log("Location found:", await aweiMetta.getText());
        } catch (error) {
            if (error.name === 'NoSuchElementError') {
                console.log("Location not found.");
            } else {
                // Handle other potential errors
                console.error("An error occurred:", error);
            }

    
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
