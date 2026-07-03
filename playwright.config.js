// @ts-check
import { defineConfig, devices } from '@playwright/test';

const config=defineConfig({

  //where test cases are located in our framework
  testDir:"./tests",

  //test timeout value - by default 30 seconds
  timeout:30*1000,


  //assertions timout value
  expect:{
    timeout:40*1000,
  },

  fullyParallel: true,

  workers:1,

  reporter:'html',

  projects:[
    {
      name:"My personal broswer",
      use:{
        ...devices['Desktop Chrome'],
        headless:false,
      },
    },
  ],


})

export default config;