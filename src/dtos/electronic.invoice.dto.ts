import { ApiProperty } from '@nestjs/swagger';

export class ElectronicInvoiceDTO {
    @ApiProperty()
    invoiceNumber: string;

    @ApiProperty()
    amount: number;

    @ApiProperty()
    customerName: string;

}
