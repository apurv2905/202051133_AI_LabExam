import express, { Request, Response } from "express";
import { generatePdf } from "../utils/generate-pdf";

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const pdf = await generatePdf('<!DOCTYPE html>\n' +
        '<html lang="en">\n' +
        '<head>\n' +
        '    <meta charset="UTF-8">\n' +
        '    <title>Title</title>\n' +
        '    <link rel="preconnect" href="https://fonts.googleapis.com">\n' +
        '    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
        '    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">\n' +
        '</head>\n' +
        '<body>\n' +
        '    <div style="text-align: center">\n' +
        '        <span style="font-weight: bold; font-size: 32px; border-bottom: 2px dashed black">Invoice</span>\n' +
        '    </div>\n' +
        '    <h1 style="color: blue; font-family: \'Inter\', sans-serif;">Hello World</h1>\n' +
        '</body>\n' +
        '</html>');
    res.contentType('application/pdf');
    res.send(pdf);
});
export default router;
