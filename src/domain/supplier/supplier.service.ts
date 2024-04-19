//this service will call all the functionalities related to the product
import { Injectable, Logger  } from '@nestjs/common';
@Injectable()
export class SupplierService {
 
  private logger = new Logger('Supplier Service');
 
  private readonly suppliers = [
   { id: 1, name: 'Toy Universe', apiUrl: 'https://toyuniverse.com/api/products', format: 'JSON' },
   { id: 2, name: 'Toy Shop', apiUrl: 'https://toyshop.co.nz/api/products', format: 'CSV' },
   { id: 3, name: 'Kids World', apiUrl: 'https://kidsworld.com/api/products', format: 'SOAP XML' },
  ];

  async getSupplierInfo(supplierId: number): Promise<any> {
    return this.suppliers.find((supplier) => supplier.id === supplierId);
  }
}