const axios = require('axios');
const webdriver = require("selenium-webdriver");
const By = webdriver.By;
function sleep() {
  return new Promise(resolve => setTimeout(resolve, 1000));
}

//to run this -> npx jest --runInBand protocol.test.js

describe('executing test scenario', () => {
    let browser;
 
    beforeEach(async () => {
        browser = await new webdriver.Builder().forBrowser("firefox").build();
        await axios.get("http://localhost:5000/test/clear_db")
        await browser.get('http://localhost:3000',);
    }, 10000);
    
    afterEach(async () => {
        await browser.quit();
    }, 15000);
    
    test('Sign protocol - main thread', async () => {
        await browser.findElement(By.id("ProtocolsMenuItem")).click();
        await browser.findElement(By.id("2234protokol")).click();

        expect(await browser.findElements(By.id("issueButton"))).toHaveLength(1);
        expect(await browser.findElements(By.id("signButton1"))).toHaveLength(1);
        expect(await browser.findElements(By.id("returnButton1"))).toHaveLength(1);
        
        await browser.findElement(By.id("signButton1")).click();
        await browser.findElement(By.id("signButton2")).click();
        await browser.findElement(By.id("signPopupCloseButton")).click();
        
        expect(await browser.findElements(By.id("issueButton"))).toHaveLength(0);
        expect(await browser.findElements(By.id("signButton1"))).toHaveLength(0);
        expect(await browser.findElements(By.id("returnButton1"))).toHaveLength(1);

        expect(await browser.findElement(By.id("protocolStatusValue")).getText()).toBe("Podpisany");
    }, 10000)

    test('Sign protocol - alternative thread', async () => {
        await browser.findElement(By.id("ProtocolsMenuItem")).click();
        await browser.findElement(By.id("2234protokol")).click();

        expect(await browser.findElements(By.id("issueButton"))).toHaveLength(1);
        expect(await browser.findElements(By.id("signButton1"))).toHaveLength(1);
        expect(await browser.findElements(By.id("returnButton1"))).toHaveLength(1);
        
        await browser.findElement(By.id("signButton1")).click();
        await browser.findElement(By.id("returnButton2")).click();
        
        expect(await browser.findElements(By.id("issueButton"))).toHaveLength(1);
        expect(await browser.findElements(By.id("signButton1"))).toHaveLength(1);
        expect(await browser.findElements(By.id("returnButton1"))).toHaveLength(1);

        expect(await browser.findElement(By.id("protocolStatusValue")).getText()).toBe("Wystawiony");
    }, 10000)
})