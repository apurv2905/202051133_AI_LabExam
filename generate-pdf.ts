// import puppeteer from "puppeteer";
// import path from "path";
// import * as hbs from "handlebars";
// import * as fs from "fs-extra";
// import data from "../data.json"
//
// const defaultOptions = {
//     format: 'A4',
//     path: './output.pdf',
//     printBackground: true
// }
//
// const compile = async function(templateName: any, data: any) {
//     const filePath = path.join(process.cwd(), 'templates', `${templateName}.hbs`);
//
//     const html = fs.readFile(filePath, 'utf-8', (err, data) => {
//         if (err) {
//             console.error('Error reading file:', err);
//             return;
//         }
//         // Handle the file data here
//         return data;
//     });
//     return hbs.compile(html)(data);
// };
//
// export const generatePdf = async (html: any, options = defaultOptions) => {
//     const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();
//     const content = await compile('index', data);
//     await page.setContent(content, { waitUntil: 'domcontentloaded' });
//
//     // @ts-ignore
//     return await page.pdf(options);
// }


import puppeteer from "puppeteer";
import path from "path";
import * as hbs from "handlebars";
import * as fs from "fs-extra";
import data from "../data.json";

const defaultOptions = {
    format: 'A4',
    path: './output.pdf',
    printBackground: true
};

const compile = async function(templateName: any, data: any) {
    const filePath = path.join(process.cwd(), 'templates', `${templateName}.hbs`);

    try {
        const html = await fs.readFile(filePath, 'utf-8');
        return hbs.compile(html)(data);
    } catch (err) {
        console.error('Error reading file:', err);
        throw err; // Re-throwing the error for handling at a higher level
    }
};

export const generatePdf = async (html: any, options = defaultOptions) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const content = await compile('index', data);
    await page.setContent(content, { waitUntil: 'domcontentloaded' });

    try {
        // @ts-ignore
        return await page.pdf(options);
    } catch (err) {
        console.error('Error generating PDF:', err);
        throw err; // Re-throwing the error for handling at a higher level
    } finally {
        await browser.close(); // Ensure browser is closed after PDF generation
    }
};
