import { UpdateProductDto } from './dto/update-product.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';

// Make logig part
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  private products = [];

  async getAll(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }

  async getById(id: string): Promise<Product> {
    return await this.productModel.findById(id);
  }

  async create(productDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(productDto);
    return await newProduct.save();
  }

  async remove(id: string): Promise<string> {
    await this.productModel.findByIdAndRemove(id);
    return 'removed';
  }

  async update(id: string, product: UpdateProductDto): Promise<Product> {
    await this.productModel.findByIdAndUpdate(id, product, { newParams: true });
    return await this.productModel.findById(id);
  }
}
