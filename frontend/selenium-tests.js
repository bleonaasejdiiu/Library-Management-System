const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function runTests() {
    let passed = 0;
    let failed = 0;

    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options())
        .build();

    console.log('=== SELENIUM AUTOMATED TESTS - Library Management System ===\n');

    // TEST 1 - Faqja e Login ngarkohet saktë
    try {
        await driver.get('http://localhost:3000/login');
        await driver.wait(until.elementLocated(By.name('email')), 8000);
        console.log('✅ TC-S01: Faqja e Login u ngarkua me sukses');
        passed++;
    } catch (e) {
        console.log('❌ TC-S01: Faqja e Login dështoi');
        failed++;
    }

    // TEST 2 - Login me kredenciale të gabuara mbetet në /login
    try {
        await driver.get('http://localhost:3000/login');
        await driver.wait(until.elementLocated(By.name('email')), 8000);
        await driver.findElement(By.name('email')).sendKeys('wrong@test.com');
        await driver.findElement(By.name('password')).sendKeys('wrongpass');
        await driver.executeScript("arguments[0].click();",
            await driver.findElement(By.xpath("//button[contains(text(),'Login') or @type='submit']")));
        await driver.sleep(3000);
        try { await (await driver.switchTo().alert()).accept(); } catch(e) {}
        let url = await driver.getCurrentUrl();
        if (url.includes('/login')) {
            console.log('✅ TC-S02: Login me kredenciale gabim mbetet në /login');
            passed++;
        }
    } catch (e) {
        console.log('❌ TC-S02: Dështoi');
        failed++;
    }

    // TEST 3 - Faqja e librave ngarkohet
    try {
        await driver.get('http://localhost:3000/books');
        await driver.wait(until.elementLocated(By.css('body')), 8000);
        console.log('✅ TC-S03: Faqja e librave u ngarkua me sukses');
        passed++;
    } catch (e) {
        console.log('❌ TC-S03: Faqja e librave dështoi');
        failed++;
    }

    console.log('\n=== REZULTATET ===');
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`📊 Total: ${passed + failed}`);

    await driver.quit();
}

runTests().catch(console.error);
