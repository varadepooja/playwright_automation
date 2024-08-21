import { test, expect } from "@playwright/test";
import exp from "constants";
import { TIMEOUT } from "dns";
import { request } from "https";

const { loginpage } = require("../swaglab_pom/pageobject_login");
const testdata1 = require("../Testdata/test1.json");
const testdata2 = require("../Testdata/testdata2.json");
//API
testdata1.forEach((data) => {
  test("API test" + data.username, async ({ page, request }) => {
    // const product = await request.get(
    //   "http://34.45.142.80:8180/api/catalogue-rest/product/15"
    // );
    // console.log(product);

    // console.log(await product.json());
    // //register api
    // let email = Math.random().toString(36).substring(2, 12) + "@nomail.com";

    // const registeruser = await request.post(
    //   "http://34.45.142.80:8180/api/customer-rest/customer/register",
    //   {
    //     data: {
    //       err: "",
    //       firstName: "pooja varade",
    //       lastName: "P",
    //       email: email,
    //       password: "qwerty",
    //       confirmpassword: "qwerty",
    //     },
    //   }
    // );
    // expect(registeruser.status()).toEqual(200);
    // expect(registeruser.statusText()).toEqual("OK");
    // console.log(registeruser);
    // console.log(await registeruser.json());

    // expect(await registeruser.json()).toMatchObject(
    //   {
    //     id: expect.any(Number),
    //     firstName: "pooja varade",
    //     lastName: "P",
    //     email: email,
    //     password: "qwerty"
    // }
    // );

    //login api
    const login = await request.post(
      "http://34.45.142.80:8180/api/customer-rest/customer/login",
      {
        data: {
          err: "",
          email: "poojavarade05@gmail.com",
          password: "Pooja@123",
        },
      }
    );
    expect(login.status()).toEqual(200);
    console.log(await login.json());

    //payment api
    // const payment_details = await request.post(
    //   "http://34.45.142.80:8180/api/payment-rest/payment/pay",
    //   {
    //     data: {
    //       amount: 2,
    //       credit_card: {
    //         cardNumber: "1111111111111112",
    //         cvv: "123",
    //         expiration_month: "12",
    //         expiration_year: "2025",
    //       },
    //       billing_address: {
    //         name: "pooja varade",
    //         street_address: "8320 E. West St.",
    //         city: "Spokane",
    //         state: "WA",
    //         zip: "85284",
    //       },
    //     },
    //   }
    // );
    // expect(payment_details.status()).toEqual(200);
    // expect(payment_details.statusText()).toEqual("OK");
    // console.log(payment_details);

    // console.log(await payment_details.json());
  });
});

//});
// here i have used different json data (testdata2)for same login api
testdata2.forEach((data1) => {
  test("API test for login" + data1.username, async ({ page, request }) => {
    const login = await request.post(
      "http://34.45.142.80:8180/api/customer-rest/customer/login",
      {
        data: {
          err: "",
          email: data1.username,
          password: data1.password,
        },
      }
    );
    expect(login.status()).toEqual(200);
    console.log(await login.json());
    await page.getByRole("link", { name: "Apple iPhone 6s Plus" }).click();
  });
});
testdata2.forEach((data) => {
  test("loginpage_end to end scenario", async ({ page }) => {
    await page.goto("http://34.45.142.80:3000/cts-shop/login");
    await page.getByLabel("Email *").click();
    await page.getByLabel("Email *").fill("poojavarade05@gmail.com");
    await page.getByLabel("Password *").click();
    await page.getByLabel("Password *").fill("Pooja@123");
    //await page.getByRole('button', { name: 'Log In' }).click();
    await page.locator("span").filter({ hasText: "Log In" }).click();
    await page.getByRole("link", { name: "Apple iPhone 6s Plus" }).click();
    await expect(
      page.locator(
        '[class="MuiBadge-badge MuiBadge-anchorOriginTopRightRectangle MuiBadge-colorSecondary"]'
      )
    ).toBeVisible();
    await expect(
      page.locator(
        '[class="MuiBadge-badge MuiBadge-anchorOriginTopRightRectangle MuiBadge-colorSecondary"]'
      )
    ).toHaveCount(1);
    await page
      .locator("span")
      .filter({ hasText: "Add to your basket" })
      .click();
    await page
      .locator(
        '[class="MuiButtonBase-root MuiIconButton-root MuiIconButton-colorSecondary MuiIconButton-edgeEnd"]'
      )
      .click();
    await page
      .locator("span")
      .filter({ hasText: "Proceed to checkout" })
      .click();
    // await page.locator('[id="datitle-label"]').click();
    await page.getByLabel("Title *").click();
    await page.getByLabel("Title *").fill("phone");
  });
});

testdata2.forEach((data) => {
  test("mocking", async ({ page, request }) => {
    await page.route("*/**/api/v1/fruits", async (route) => {
      const json = [
        { name: "Strawberry", id: 21 },
        { name: "orange", id: 22 },
        { name: "kiwi", id: 23 },
      ];
      await route.fulfill({ json });
    });
    await page.goto("https://demo.playwright.dev/api-mocking");
    await page.pause();
    await expect(page.getByText('Strawberry')).toBeVisible();
  });
});
//taking screen shoot and compare original one
test("screenshot",async({page,request})=>{
await page.goto("http://34.45.142.80:3000/");
await expect(page.locator(".footer")).toHaveScreenshot();




});

// testdata1.forEach((data) => {

//     test('parametrisation '+data.username,{
//         tag: '@smoke',
//         }, async ({ page }) => {
//         const loginpageobj=new loginpage(page);
//         await loginpageobj.goto();
//         await loginpageobj.user_enter_username(data.username);
//         await loginpageobj.user_enter_password(data.password);
//         await loginpageobj.user_click_login();

//         });

//  });

//  test('tesxtbox validation', {

//  },async({ page }) => {
// await page.goto('https://demoqa.com/');
// await expect (page.getByText('Elements')).toBeVisible();
// await page.getByText('Elements').click()
// //await expect(page.getByRole('btn btn-light ')).toHaveCount(8);
// // await expect(page.locator('ul').filter({ hasText:'Check Box', }))
// // locator('li').filter({ hasText: 'Check Box' })
// // await expect(page
// //   .getByRole('menu-list')
// //   .filter({ has: page.getByRole('btn btn-light ') }))
// //   .toHaveCount(8);
// //await expect(page.locator('.menu-item').filter({has: page.locator('li')})).toBeVisible();
// await  page.locator('li').filter({ hasText: 'Text Box' }).click();
// await page.getByPlaceholder('Full name').isEnabled({timeout: 3000});
// const textvalue=await page.getByPlaceholder('Full name').getAttribute('placeholder');
// expect(textvalue).toBe('Full Name');

// await page.getByPlaceholder('name@example.com').isEnabled();
// const passplaceholder=await page.getByPlaceholder('name@example.com').getAttribute('placeholder');
// expect(passplaceholder).toBe('name@example.com');

//  }

//  );

// test('pageobjectmodel',{
// tag: '@smoke',
// }, async ({ page }) => {
// const loginpageobj=new loginpage(page);
// await loginpageobj.goto();
// await loginpageobj.user_enter_username('standard_user');
// await loginpageobj.user_enter_password('secret_sauce');
// await loginpageobj.user_click_login();

// });

// test('locked user', async ({ page }) => {
//    const loginpageobj=new loginpage(page);
//     await loginpageobj.goto();
//     await loginpageobj.user_enter_username('locked_out_user');
//     await loginpageobj.user_enter_password('secret_sauce');
//     await loginpageobj.user_click_login();
//     //await page.locator('[data-test="username"]').click();
//    // await page.locator('[data-test="username"]').fill('standard_user');
//     //await page.locator('[data-test="password"]').click();
//     //await page.locator('[data-test="password"]').fill('secret_sauce');
//    // await page.getByRole('button', { name: 'LOGIN' }).click();
//     //await page.getByText('Products').click();
//     ////await page.getByPlaceholder('Username').fill('locked_out_user');
//     // await page.getByPlaceholder('Password').click();
//     // await page.getByPlaceholder('Password').fill('secret_sauce');
//     // await page.getByRole('button', { name: 'LOGIN' }).click();
//     // await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.', { exact: true })).toBeVisible();

//   });

// test('locked user', async ({ page }) => {
//   await page.goto('https://www.saucedemo.com/v1/');
//   await page.locator('[data-test="username"]').click();
//  // await page.locator('[data-test="username"]').fill('standard_user');
//   //await page.locator('[data-test="password"]').click();
//   //await page.locator('[data-test="password"]').fill('secret_sauce');
//  // await page.getByRole('button', { name: 'LOGIN' }).click();
//   //await page.getByText('Products').click();
//   await page.getByPlaceholder('Username').fill('locked_out_user');
//   await page.getByPlaceholder('Password').click();
//   await page.getByPlaceholder('Password').fill('secret_sauce');
//   await page.getByRole('button', { name: 'LOGIN' }).click();
//   await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.', { exact: true })).toBeVisible();

// });

// test('Remove product',async ({page}) => {
//   await page.goto('https://www.saucedemo.com/v1/');
//   await page.locator('[data-test="username"]').click();
//   await page.getByPlaceholder('Username').fill('standard_user');
//   await page.getByPlaceholder('Password').click();
//   await page.getByPlaceholder('Password').fill('secret_sauce');
//   await page.getByRole('button', { name: 'LOGIN' }).click();
//  // await page.locator('//div[@class='inventory_item']//*[text()='Sauce Labs Backpack']/ancestor::div[@class='inventory_item']//button[text()='ADD TO CART']').click();
//   await page.locator('div').filter({ hasText: /^\$29\.99ADD TO CART$/ }).getByRole('button').click();
//   await page.locator('[data-icon="shopping-cart"]').click();
//   await page.getByRole('button', { name: 'REMOVE' }).click();
//   await expect(page.locator('[class="fa-layers-counter shopping_cart_badge"]')).toBeVisible({timeout:100,visible:false});

// });

// test('validate order the product',async ({page})=> {
//   await page.goto('https://www.saucedemo.com/v1/');
//   await page.locator('[data-test="username"]').click();
//   await page.getByPlaceholder('Username').fill('standard_user');
//   await page.getByPlaceholder('Password').click();
//   await page.getByPlaceholder('Password').fill('secret_sauce');
//   await page.getByRole('button', { name: 'LOGIN' }).click();
//   await page.locator('div').filter({ hasText: /^\$29\.99ADD TO CART$/ }).getByRole('button').click();
//   await page.locator('[data-icon="shopping-cart"]').click();
//   //page.waitForTimeout(3000);
//   await page.getByRole('link',{ name: 'CHECKOUT'}).click();
//   await page.locator('[data-test="firstName"]').click();
//   await page.locator('[data-test="firstName"]').fill('pooja');
//   await page.locator('[data-test="lastName"]').click();
//   await page.locator('[data-test="lastName"]').fill('varade');
//   await page.locator('[data-test="postalCode"]').click();
//   await page.locator('[data-test="postalCode"]').fill('412101');
//   await page.getByRole('button', { name: 'CONTINUE' }).click();
//   await page.getByRole('link', { name: 'FINISH' }).click();
//   await expect(page.getByText('THANK YOU FOR YOUR ORDER',{exact:true})).toBeVisible();
//   //await expect(page.getByText('Your order has been dispatched, and will arrive just as fast as the pony can get there',{exact:true})).toBeVisible({timeout:200});
// await expect(page.getByText('Your order has been')).toBeVisible();

// });
// test('scenario 4',async ({page})=> {
// await page.goto('https://www.saucedemo.com/v1/');
// await page.getByPlaceholder('Username').fill('standard_user');
// await page.getByPlaceholder('Password').click();
// await page.getByPlaceholder('Password').fill('secret_sauce');
// await page.getByRole('button', { name: 'LOGIN' }).click();
// await page.locator(("//*[text()='Sauce Labs Backpack']/ancestor::div[@class='inventory_item']//button[text()='ADD TO CART']")).click();
// await page.locator(("//*[text()='Sauce Labs Bolt T-Shirt']/ancestor::div[@class='inventory_item']//button[text()='ADD TO CART']")).click();
// await page.locator(("//*[text()='Sauce Labs Bike Light']/ancestor::div[@class='inventory_item']//button[text()='ADD TO CART']")).click();
// await expect(page.locator('[class="fa-layers-counter shopping_cart_badge"]')).toHaveText('3');
// await page.locator('[data-icon="shopping-cart"]').click();
// await page.locator('.cart_item').filter({ has: page.getByText('Sauce Labs Backpack')}).getByText('REMOVE').click();
// await expect(page.locator('[class="fa-layers-counter shopping_cart_badge"]')).toHaveText('2');
// await page.locator('.cart_item').filter({ has: page.getByText('Sauce Labs Bolt T-Shirt')}).getByText('REMOVE').click();
// //await expect(page.locator('[class="fa-layers-counter shopping_cart_badge"]')).toHaveValue('False');
// await page.locator('.cart_item').filter({ has: page.getByText('Sauce Labs Bike Light')}).getByText('REMOVE').click();
// await expect (page.locator('[data-icon="shopping-cart"]')).toBeVisible();
// });
