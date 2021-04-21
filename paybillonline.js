const puppeteer = require("puppeteer");
const readline  = require("readline");
const fs = require("fs");
const { page } = require("pdfkit");
let pName = process.argv[2];
let cTab;
(async function fn() {
    try {
        let browserOpenPromise = puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        });
    
        let browser = await browserOpenPromise;
        let allTabsArr = await browser.pages();
        cTab = allTabsArr[0];
        await cTab.goto("https://www.tatapower-ddl.com/billpay/paybillonline.aspx");
        await cTab.type("input[name='txtcano']", "60017574397", { delay: 200 });
        await cTab.type("input[name='txtmobile']", "9312274008", { delay: 200 });
        await cTab.type("input[name='txtemail']", "yewawa7211@astarmax.com", { delay: 200 });

        const rl = readline.createInterface({
            input : process.stdin,
            output : process.stdout
        });
        let fullfill ;
        const answerPromise  = new Promise(x => fullfill = x);
        rl.question('Enter the capcha : ' , (answer) => {
            fullfill(answer);
            rl.close();
        } );
        const answer = await answerPromise;
        console.log(answer);
        await cTab.type('#TxtImgVer' , answer);
        function delay(time) {
            return new Promise(function(resolve) { 
                setTimeout(resolve, time)
            });
         }
        await delay(2000);
        const page=await cTab.click("#btnpay");
        await delay(2000);
        await cTab.waitForSelector("#lblsuccpayu", { visible: true }); 

        await cTab.screenshot({
            path: 'bill.png',
            fullPage: true
        })
        await delay(2000);
        
        await cTab.click("#rbnb_2");
        await delay(2000);
        await cTab.click("#btncont");
        const type_id= await cTab.waitForSelector("#inp",{visible: true });
        await type_id.type("8000098778@paytm");

        const WHATSAPP_WEB_URL = "https://web.whatsapp.com/"
        await cTab.goto(WHATSAPP_WEB_URL);
          
        await cTab.waitForSelector("span [title='Daddy']", { visible: true }); 
        
        const message_send_target= await cTab.$("span [title='Daddy']");
        await message_send_target.click();
        const message_type = await cTab.$(
            "#main > footer > div.vR1LG._3wXwX.copyable-area > div._2A8P4 > div > div._2_1wd.copyable-text.selectable-text"
        );
        await message_type.type("ThankYou!!! ,Dear Rajesh Kumar Jain your outstanding amount for Electricity Bill is Rs0...Regrads:- Tata Power DDL ");
        
        await cTab.keyboard.press("Enter");
        } catch (err) {
            console.log(err);
        }
    })();
    

