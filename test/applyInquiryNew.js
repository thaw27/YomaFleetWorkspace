const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async function applyInquiryNew() {
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

  
    // Wait for radio button to display 
    await driver.wait(until.elementLocated(By.xpath('//*[@id="__next"]/div/div[1]/div[2]/div/div[2]/label[1]/input')), 20000);
  

    // verify if button displayed
    let createNew = await driver.findElement(By.xpath('//*[@id="__next"]/div/div[1]/div[2]/div/div[2]/label[1]/input'));

    //click I want to create new account option
    await createNew.click();


    // Wait for Join Now button to display 
    await driver.wait(until.elementLocated(By.xpath('//*[@id="__next"]/div/div[1]/div[2]/div/button[2]')), 10000);
  

    // verify if button displayed
    let joinButton = await driver.findElement(By.xpath('//*[@id="__next"]/div/div[1]/div[2]/div/button[2]'));

    //click join now button
    await joinButton.click();

    //wait 10sec to load the page fully
    await sleep(10000);

     // Scroll down the page
     await driver.executeScript('window.scrollBy(0, 800);'); // Scrolls down 800 pixels

     // Optional: Wait for some time to see the scroll effect
     //await new Promise(resolve => setTimeout(resolve, 2000));
    

    let inquiryField = await driver.findElement(By.id('react-select-type-input'));
    let companyField = await driver.findElement(By.id('company_name'));
    let industryField = await driver.findElement(By.id('react-select-industry-input'));
    let contactField = await driver.findElement(By.id('contact_person'));
    let jobField = await driver.findElement(By.id('job_title'));
    let codeField = await driver.findElement(By.id('react-select-country_code-input'));
    let phoneField = await driver.findElement(By.id('national_number'));
    let emailField = await driver.findElement(By.id('email'));
    let submitBtn = await driver.findElement(By.xpath('//*[@id="__next"]/main/div[3]/section[2]/form/div[6]/button'));

    //open the inquiry type dropdown
    inquiryField.click();

    // Wait for the dropdown options to be visible
    await driver.sleep(1000); 

    //select open a new corporate account
    let optionToOpenNew = await driver.findElement(By.xpath('//div[@id="react-select-type-option-0"]'));
    await optionToOpenNew.click();

    //select open to add new member
    // let optionToAddMember = await driver.findElement(By.xpath('//div[@id="react-select-type-option-1"]'));
    // await optionToAddMember.click();

    //select update corporate
    // let optionToUpdate = await driver.findElement(By.xpath('//div[@id="react-select-type-option-2"]'));
    // await optionToUpdate.click();

    //select others
    // let optionOther = await driver.findElement(By.xpath('//div[@id="react-select-type-option-3"]'));
    // await optionToUpdate.click();

    //enter company name
    await companyField.sendKeys("Test Company");

    //open industry dropdown
    industryField.click();

    // Wait for the dropdown options to be visible
    await driver.sleep(1000)

    //select banking
    let optionBanking = await driver.findElement(By.xpath('//div[@id="react-select-industry-option-1"]'));
    await optionBanking.click();

    //enter contact person
    await contactField.sendKeys("Test Contact");

    //enter job title
    await jobField.sendKeys("QA");

    //open country code dropdown
    await codeField.click();

    // Wait for the dropdown options to be visible
    await driver.sleep(1000); 

    //select first option
    let optionCC = await driver.findElement(By.xpath('//div[@id="react-select-country_code-option-0"]'));
    await optionCC.click();

    //enter phone number
    await phoneField.sendKeys("123456");

    //enter email
    await emailField.sendKeys("joyce.thaw.27@gmail.com")

    //enter submit
    await submitBtn.click();

    //wait to display dialog box
    await driver.sleep(1000);

    let okBtn = await driver.findElement(By.xpath('html/body/div[2]/div/div[4]/div/button'));
    //click OK from dialog box
    okBtn.click();

    await sleep(2000);

    let currentUrl = await driver.getCurrentUrl();
    if (currentUrl.includes('successful')) {
      console.log('Inqiry success!');
    } else {
      console.log('Inquiry failed!');
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
