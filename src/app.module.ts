import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/producs.module';

const URI_TEST_MONGO_DB =
  'mongodb+srv://test:test123@cluster0.y8kp6wa.mongodb.net/?retryWrites=true&w=majority';

@Module({
  imports: [ProductsModule, MongooseModule.forRoot(URI_TEST_MONGO_DB)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
