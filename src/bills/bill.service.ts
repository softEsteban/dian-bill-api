import { Injectable } from '@nestjs/common';
import { ElectronicInvoiceDTO } from '../dtos/electronic.invoice.dto';
import { parseStringPromise, Builder } from 'xml2js';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class BillService {
    constructor() { }

    async createElectronicInvoice(invoiceDto: ElectronicInvoiceDTO) {
        const xmlFilePath = path.join(__dirname, '../../src/files-xml/ElectronicInvoice.xml');

        fs.readFile(xmlFilePath, 'utf-8', async (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            try {
                const result = await parseStringPromise(data);

                // Update the value of <ds:DigestValue> with your JavaScript variable
                // result.Reference.DigestValue[0] = invoiceDto.customerName;
                result.Invoice.$['xmlns:ds'] = invoiceDto.customerName;

                console.log(result.Invoice);
                console.log(result.Invoice.$);
                console.log(result.Invoice.$['xmlns:ds']);

                const xmlBuilder = new Builder();
                const updatedXml = xmlBuilder.buildObject(result);

                fs.writeFile(xmlFilePath, updatedXml, (writeErr) => {
                    if (writeErr) {
                        console.error(writeErr);
                        return;
                    }

                    console.log('XML file updated successfully.');
                });
            } catch (parseErr) {
                console.error(parseErr);
            }
        });
    }

}
