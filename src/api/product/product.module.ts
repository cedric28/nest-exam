import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from '../../domain/product/product.service';
import { SupplierService } from '../../domain/supplier/supplier.service';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [ProductService,SupplierService],
})
export class ProductModule {}
