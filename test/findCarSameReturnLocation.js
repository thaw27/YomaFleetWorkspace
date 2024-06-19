const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function findCarSameReturn() {
  let driver = await new Builder()
    .forBrowser('chrome')
    .build();

  try {
    // Navigate to the Yoma Fleet Carshare website
    await driver.get('https://carshare.yomafleet.com/');
    await driver.manage().window().maximize();

    //locate pick up location
    let pickupLocationField = await driver.findElement(By.id('react-select-pickup_location-input'));

    //open pick up location dropdown
    pickupLocationField.click();

    // Wait for the dropdown options to be visible
    await driver.sleep(1000)

    //select Hilton Mandalay
    let optionHilton = await driver.findElement(By.xpath('//div[@id="react-select-pickup_location-option-1-0"]'));
    await optionHilton.click();

    //locate pickup date
    let pickupDate = await driver.findElement(By.css('input[name="pickup_date"]'));

    //click to open date picker
    await pickupDate.click();

    await driver.sleep(1000);
    
    //locate June 22
    let selectedPickUpDate = await driver.findElement(By.xpath('/html/body/div[2]/div[2]/div/div[2]/div/span[28]'));

    //select June 22
    await selectedPickUpDate.click();

    //locate pickup time
    let pickupTime = await driver.findElement(By.css('input[name="pickup_time"]'));

    //click to edit pickup time
    await pickupTime.click();

    //locate hour 
    let pickupHour = await driver.findElement(By.xpath('/html/body/div[3]/div/div[1]/input'));

    //edit pickup hour
    await pickupHour.sendKeys("08");

    //locate minute 
    let pickupMin = await driver.findElement(By.xpath('/html/body/div[3]/div/div[1]/input'));

    //edit pickup minute
    await pickupMin.click();
    await pickupMin.sendKeys("30");

    //click to edit AM/PM
    let pickupAmPm = await driver.findElement(By.xpath('/html/body/div[3]/div/span[2]'));
    await pickupAmPm.click();

    //press enter
    await pickupAmPm.sendKeys(Key.ENTER);

    //locate return date
    let returnDate = await driver.findElement(By.css('input[name="return_date"]'));

    //click to open return date
    await returnDate.click();
    
    //locate June 24
    let selectedReturnDate = await driver.findElement(By.xpath('/html/body/div[4]/div[2]/div/div[2]/div/span[30]'));

    //select June 224
    await selectedReturnDate.click();

    //locate return time
    let returnTime = await driver.findElement(By.css('input[name="return_time"]'));

    //click to edit return time
    await returnTime.click();

    //locate return hour 
    let returnHour = await driver.findElement(By.xpath('/html/body/div[5]/div/div[1]/input'));

    //edit return hour
    await returnHour.sendKeys("09");

    //locate return minute 
    let returnMin = await driver.findElement(By.xpath('/html/body/div[5]/div/div[2]/input'));

    //edit return minute
    await returnMin.click();
    await returnMin.sendKeys("00");

    //click to edit AM/PM
    await driver.findElement(By.xpath('/html/body/div[5]/div/span[2]'));
    let returnAmPm = await driver.findElement(By.xpath('/html/body/div[5]/div/span[2]'));
    await returnAmPm.click();

    //press enter
    await returnAmPm.sendKeys(Key.ENTER);

    // Click on the "Find A Car" button
    let findCarButton = await driver.findElement(By.id('SimulateButton'));
    await findCarButton.click();

    // wait to load the result
    await driver.sleep(10000); 

    let carElement = await driver.findElement(By.xpath('//*[@id="__next"]/main/div/div[2]/div/div/div/a/div/div/div'));
    
    // Check if the image element is displayed
    let isDisplayed = await carElement.isDisplayed();
    
    if (isDisplayed) {
      
      await carElement.click();
      await driver.sleep(10000);
      // Fetch information 
      let pickupLocationElement = await driver.findElement(By.xpath('//div[@class="grid gap-3 grid-rows-2 grid-cols-2 p-5"]/dt[text()="Pick-up Location"]/following-sibling::dd'));
      let startDateElement = await driver.findElement(By.xpath('//div[@class="grid gap-3 grid-rows-2 grid-cols-2 p-5"]/dt[text()="Start Date and Time"]/following-sibling::dd'));
      let endDateElement = await driver.findElement(By.xpath('//div[@class="grid gap-3 grid-rows-2 grid-cols-2 p-5"]/dt[text()="End Date and Time"]/following-sibling::dd'));


      // Extract text
      let pickupLocation = await pickupLocationElement.getText();
      let startDate = await startDateElement.getText();
      let endDate = await endDateElement.getText();

      // Display the extracted information
      console.log('Pick-up Location:', pickupLocation);
      console.log('Start Date and Time:', startDate);
      console.log('End Date and Time:', endDate);
    } 
    else {
      console.log('Car not found!');

    }

  } 
  catch (error){
    console.error('Error:', error.message)
  }
  finally {
    await driver.quit();
  }
})();
