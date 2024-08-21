const { expect } = require('@playwright/test');

exports.loginpage= class loginpage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.txt_username=page.locator('[data-test="username"]');
    this.txt_password=page.getByPlaceholder('Password');
    this.btn_login=page.getByRole('button', { name: 'LOGIN' });
   
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/v1/');
  }

  async user_enter_username(strusername) {

    await this.txt_username.fill(strusername);
  }

  async user_enter_password(struserpassword) {

    await this.txt_password.fill(struserpassword);
  }

  async user_click_login() {

    await this.btn_login.click();
  }
  
};