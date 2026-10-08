export const TEST_USERS = {
  STANDARD: {
    username: 'standard_user',
    password: process.env.SAUCE_PASSWORD || 'secret_sauce'
  },
  LOCKED_OUT: {
    username: 'locked_out_user',
    password: process.env.SAUCE_PASSWORD || 'secret_sauce'
  },
  PROBLEM: {
    username: 'problem_user',
    password: process.env.SAUCE_PASSWORD || 'secret_sauce'
  },
  PERFORMANCE_GLITCH: {
    username: 'performance_glitch_user',
    password: process.env.SAUCE_PASSWORD || 'secret_sauce'
  },
  INVALID: {
    username: 'invalid_qa_user',
    password: 'wrong_password_123'
  }
};

export const ERROR_MESSAGES = {
  LOCKED_OUT: 'Epic sadface: Sorry, this user has been locked out.',
  INVALID_CREDENTIALS: 'Epic sadface: Username and password do not match any user in this service',
  USERNAME_REQUIRED: 'Epic sadface: Username is required',
  PASSWORD_REQUIRED: 'Epic sadface: Password is required',
  FIRST_NAME_REQUIRED: 'Error: First Name is required',
  LAST_NAME_REQUIRED: 'Error: Last Name is required',
  POSTAL_CODE_REQUIRED: 'Error: Postal Code is required'
};

export const CHECKOUT_DATA = {
  DEFAULT_CUSTOMER: {
    firstName: 'Victor',
    lastName: 'QA SDET',
    postalCode: '01001-000'
  }
};

export const PRODUCTS = {
  BACKPACK: 'Sauce Labs Backpack',
  BIKE_LIGHT: 'Sauce Labs Bike Light',
  BOLT_TSHIRT: 'Sauce Labs Bolt T-Shirt',
  FLEECE_JACKET: 'Sauce Labs Fleece Jacket',
  ONESIE: 'Sauce Labs Onesie',
  RED_TSHIRT: 'Test.allTheThings() T-Shirt (Red)'
};
