import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BillService } from './bill.service';
import { ElectronicInvoiceDTO } from '../dtos/electronic.invoice.dto';


@ApiTags('Bills Service')
@Controller('bill')
export class BillController {

    constructor(private billService: BillService) { }

    @Post()
    @ApiOperation({ summary: 'Creates a electronic bill by the invoce' })
    async createElectronicInvoice(@Body() invoiceDto: ElectronicInvoiceDTO): Promise<any> {

        // Call the service to process the electronic invoice
        const result = await this.billService.createElectronicInvoice(invoiceDto);

        // Return any necessary response or data
        return result;
    }
}
