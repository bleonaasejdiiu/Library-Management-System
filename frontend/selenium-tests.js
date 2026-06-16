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

    // TEST 4 - Faqja e Regjistrimit ngarkohet
    try {
        await driver.get('http://localhost:3000/register');
        await driver.wait(until.elementLocated(By.css('body')), 8000);
        console.log('✅ TC-S04: Faqja e Regjistrimit u ngarkua me sukses');
        passed++;
    } catch (e) {
        console.log('❌ TC-S04: Faqja e Regjistrimit dështoi');
        failed++;
    }

    // TEST 5 - Fusha email ekziston në faqen e Login
    try {
        await driver.get('http://localhost:3000/login');
        await driver.wait(until.elementLocated(By.name('email')), 8000);
        let emailField = await driver.findElement(By.name('email'));
        let passField = await driver.findElement(By.name('password'));
        if (emailField && passField) {
            console.log('✅ TC-S05: Fushat email dhe password ekzistojnë në Login');
            passed++;
        }
    } catch (e) {
        console.log('❌ TC-S05: Fushat e Login nuk u gjetën');
        failed++;
    }

    // TEST 6 - Faqja About Us ngarkohet
    try {
        await driver.get('http://localhost:3000/about');
        await driver.wait(until.elementLocated(By.css('body')), 8000);
        console.log('✅ TC-S06: Faqja About Us u ngarkua me sukses');
        passed++;
    } catch (e) {
        console.log('❌ TC-S06: Faqja About Us dështoi');
        failed++;
    }

    // TEST 7 - Faqja Home ngarkohet
    try {
        await driver.get('http://localhost:3000');
        await driver.wait(until.elementLocated(By.css('body')), 8000);
        console.log('✅ TC-S07: Faqja kryesore (Home) u ngarkua me sukses');
        passed++;
    } catch (e) {
        console.log('❌ TC-S07: Faqja kryesore dështoi');
        failed++;
    }

    // TEST 8 - Titulli i faqes nuk është bosh
    try {
        await driver.get('http://localhost:3000/login');
        await driver.wait(until.elementLocated(By.css('body')), 8000);
        let title = await driver.getTitle();
        if (title && title.length > 0) {
            console.log('✅ TC-S08: Titulli i faqes ekziston: ' + title);
            passed++;
        } else {
            console.log('❌ TC-S08: Titulli i faqes është bosh');
            failed++;
        }
    } catch (e) {
        console.log('❌ TC-S08: Dështoi');
        failed++;
    }

    // TEST 9 - Butoni Submit ekziston në Login
    try {
        await driver.get('http://localhost:3000/login');
        await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 8000);
        let btn = await driver.findElement(By.css('button[type="submit"]'));
        if (btn) {
            console.log('✅ TC-S09: Butoni Submit ekziston në faqen Login');
            passed++;
        }
    } catch (e) {
        console.log('❌ TC-S09: Butoni Submit nuk u gjet');
        failed++;
    }

    // TEST 10 - Faqja Authors ngarkohet
    try {
        await driver.get('http://localhost:3000/authors');
        await driver.wait(until.elementLocated(By.css('body')), 8000);
        console.log('✅ TC-S10: Faqja Authors u ngarkua me sukses');
        passed++;
    } catch (e) {
        console.log('❌ TC-S10: Faqja Authors dështoi');
        failed++;
    }

    console.log('\n=== REZULTATET ===');
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`📊 Total: ${passed + failed}`);

    await driver.quit();
}

runTests().catch(console.error);
