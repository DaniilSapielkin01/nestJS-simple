import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  //   Req,
  //   Res,
} from '@nestjs/common';
// import { Request, Response } from 'express';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';
// import { UpdateProductDto } from './dto/update-product.dto';

// express - example
// app.use((request, response, next) => {
//     response.status(201).end('Buy')
// })

@Controller('products')
export class ProductsController {
  //   @Get()
  //   //   @Redirect('https://google.com', 301)
  //   getAll(@Req() req: Request, @Res() res: Response): string {
  //     // res.status(201).end('Buy');
  //     return 'get all';
  //   }

  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAll(): Promise<Product[]> {
    return this.productsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') paramId): Promise<Product> {
    return this.productsService.getById(paramId);
  }

  @Post()
  // HttpStatus.CREATED === 201
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  createOne(@Body() CreateProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(CreateProductDto);
  }

  @Delete()
  removeOne(@Param(':id') id: string): Promise<string> {
    return this.productsService.remove(id);
  }

  @Put()
  update(
    @Param(':id') updateId: string,
    @Body() updateProduct: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(updateId, updateProduct);
  }

  @Patch()
  saveOne() {
    return 'patch';
  }
}
