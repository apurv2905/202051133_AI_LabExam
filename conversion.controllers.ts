import express, { Request, Response } from "express";
import { generatePdf } from "../utils/generate-pdf";

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const pdf = await generatePdf('<!DOCTYPE html>\n' +
        '<html lang="en">\n' +
        '<head>\n' +
        '    <meta charset="UTF-8">\n' +
        '    <title>Title</title>\n' +
        '    <script src="https://cdn.tailwindcss.com"></script>\n' +
        '    <link rel="preconnect" href="https://fonts.googleapis.com">\n' +
        '    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
        '    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">\n' +
        '</head>\n' +
        '<body style="font-family: \'Inter\', sans-serif" class="bg-[#f7f7f7] p-10">\n' +
        '    <div class="flex justify-between items-center border-b-4 border-b-[#16579d] pb-2">\n' +
        '        <div class="flex items-center gap-2">\n' +
        '            <div class="w-[130px]">\n' +
        '                <img src="data:image/jpeg;base64,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" alt="fluxbyte-logo">\n' +
        '            </div>\n' +
        '            <div>\n' +
        '                <span class="block font-bold">FluxByte Technology</span>\n' +
        '                <span class="block text-sm">The Capital, A 1110 - 1111</span>\n' +
        '                <span class="block text-sm">Science City Rd, Sola, Ahmedabad, Gujarat</span>\n' +
        '                <span class="block text-sm">380060</span>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="text-right">\n' +
        '            <span class="block font-bold">Invoice #A0001</span>\n' +
        '            <span class="block font-bold -mb-1">Issue Date</span>\n' +
        '            <span class="block">dd/mm/yyyy</span>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="mt-12 mb-20">\n' +
        '        <h1 class="text-2xl font-semibold">Fluxbyte Technologies Private Limited</h1>\n' +
        '        <p>Add a message here for your customer.</p>\n' +
        '    </div>\n' +
        '    <div class="flex gap-3 mb-12">\n' +
        '        <div class="w-1/2 border-t border-t-gray-600">\n' +
        '            <p class="font-semibold text-[13.5px] mt-6 mb-2 tracking-wider text-gray-600">BILL TO</p>\n' +
        '            <p class="text-[14px]">Client name</p>\n' +
        '            <p class="text-[14px]">Email address</p>\n' +
        '            <p class="text-[14px]">Phone number</p>\n' +
        '        </div>\n' +
        '        <div class="w-1/2 border-t border-t-gray-600">\n' +
        '            <p class="font-semibold text-[13.5px] mt-6 mb-2 tracking-wider text-gray-600">PAYMENT</p>\n' +
        '            <p class="text-[14px]">Due Date: dd/mm/yyyy</p>\n' +
        '            <p class="text-[14px]">$0.00</p>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '\n' +
        '    <div class="relative overflow-x-auto">\n' +
        '        <table class="w-full text-sm text-left rtl:text-right text-gray-500">\n' +
        '            <thead class="text-xs text-gray-700 uppercase bg-[#16579d]">\n' +
        '            <tr>\n' +
        '                <th scope="col" class="p-6 text-[#f7f7f7] tracking-wider">\n' +
        '                    Product name\n' +
        '                </th>\n' +
        '                <th scope="col" class="p-6 text-[#f7f7f7] tracking-wider">\n' +
        '                    Color\n' +
        '                </th>\n' +
        '                <th scope="col" class="p-6 text-[#f7f7f7] tracking-wider">\n' +
        '                    Category\n' +
        '                </th>\n' +
        '                <th scope="col" class="p-6 text-[#f7f7f7] tracking-wider">\n' +
        '                    Price\n' +
        '                </th>\n' +
        '            </tr>\n' +
        '            </thead>\n' +
        '            <tbody>\n' +
        '            <tr class="bg-white border-b">\n' +
        '                <th scope="row" class="p-6 font-medium text-gray-900 whitespace-nowrap bg-[#f7f7f7]">\n' +
        '                    Apple MacBook Pro 17"\n' +
        '                </th>\n' +
        '                <td class="p-6 bg-[#f7f7f7]">\n' +
        '                    Silver\n' +
        '                </td>\n' +
        '                <td class="p-6 bg-[#f7f7f7]">\n' +
        '                    Laptop\n' +
        '                </td>\n' +
        '                <td class="p-6 bg-[#f7f7f7]">\n' +
        '                    $2999\n' +
        '                </td>\n' +
        '            </tr>\n' +
        '            <tr class="bg-white border-b">\n' +
        '                <th scope="row" class="p-6 font-medium text-gray-900 whitespace-nowrap bg-[#f7f7f7]">\n' +
        '                    Microsoft Surface Pro\n' +
        '                </th>\n' +
        '                <td class="p-6 bg-[#f7f7f7]">\n' +
        '                    White\n' +
        '                </td>\n' +
        '                <td class="p-6 bg-[#f7f7f7]">\n' +
        '                    Laptop PC\n' +
        '                </td>\n' +
        '                <td class="p-6 bg-[#f7f7f7]">\n' +
        '                    $1999\n' +
        '                </td>\n' +
        '            </tr>\n' +
        '            <tr class="bg-white">\n' +
        '                <th scope="row" class="px-6 py-6 font-medium text-gray-900 whitespace-nowrap  bg-[#f7f7f7]">\n' +
        '                    Magic Mouse 2\n' +
        '                </th>\n' +
        '                <td class="px-6 py-6 bg-[#f7f7f7]">\n' +
        '                    Black\n' +
        '                </td>\n' +
        '                <td class="px-6 py-6 bg-[#f7f7f7]">\n' +
        '                    Accessories\n' +
        '                </td>\n' +
        '                <td class="px-6 py-6 bg-[#f7f7f7]">\n' +
        '                    $99\n' +
        '                </td>\n' +
        '            </tr>\n' +
        '            </tbody>\n' +
        '        </table>\n' +
        '    </div>\n' +
        '</body>\n' +
        '</html>\n');
    res.contentType('application/pdf');
    res.send(pdf);
});
export default router;
