//this controller will handle all the HTTP Request
import { Controller, Get, Res,HttpStatus,Param, NotFoundException } from '@nestjs/common';
import { ProductService } from '../../domain/product/product.service';
import { SupplierService } from '../../domain/supplier/supplier.service';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';
import { Response} from "express"

@Controller('api/product')
export class ProductController {
 constructor(private supplierService: SupplierService, private productService: ProductService) {}

 @Get(':supplierId')
 @ApiOkResponse({
  description: 'Fetch Product Data',
})
@ApiBadRequestResponse({ description: 'Bad Request Failed To Fetch Data' })
 async getProductList(@Param('supplierId') supplierId: number,@Res() res: Response): Promise<any> {
   // Fetch supplier product details from 3rd party api
   const supplierInfo = await this.supplierService.getSupplierInfo(supplierId);

   if (!supplierInfo) {
    return res.status(HttpStatus.NOT_FOUND).send('Supplier not found');
   }

   const productList = await this.productService.fetchProductList(supplierInfo.apiUrl, supplierInfo.format);

   // format product list to JSON format
   const formatProductListToJSON = {
     company_shop: supplierInfo.name,
     product: productList.map((product) => ({ name: product.name, price: product.price })),
   };
   return res.status(HttpStatus.OK).send(formatProductListToJSON);
 }
}
