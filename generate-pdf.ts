import puppeteer from "puppeteer";

const defaultOptions = {
    format: 'A4',
    path: './output.pdf',
    printBackground: true
}

export const generatePdf = async (html: any, options = defaultOptions) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'domcontentloaded' });

    // @ts-ignore
    return await page.pdf(options);
}
