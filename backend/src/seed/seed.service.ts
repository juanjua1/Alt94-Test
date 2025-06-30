import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../products/schemas/product.schema';
import { sampleProperties } from '../data/sample-properties';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async seedProducts() {
    try {
      const existingProducts = await this.productModel.countDocuments();
      
      if (existingProducts > 0) {
        this.logger.log('Ya existen productos en la base de datos. Omitiendo seeding.');
        return;
      }

      await this.productModel.insertMany(sampleProperties);
      this.logger.log(`Se insertaron ${sampleProperties.length} productos de ejemplo`);
    } catch (error) {
      this.logger.error('Error al poblar la base de datos con productos:', error);
    }
  }

  async clearProducts() {
    try {
      await this.productModel.deleteMany({});
      this.logger.log('Se eliminaron todos los productos de la base de datos');
    } catch (error) {
      this.logger.error('Error al limpiar productos:', error);
    }
  }
}
