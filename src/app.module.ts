import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductModule } from './product/product.module';
import { VendorModule } from './vendor/vendor.module';
import { DistributerModule } from './distributer/distributer.module';
import { AnalyticCardsService } from './analytic-cards/analytic-cards.service';
import { AnalyticCardsModule } from './analytic-cards/analytic-cards.module';
import { AlertTypeModule } from './alert-type/alert-type.module';
import { InventoryByCategoryModule } from './inventory-by-category/inventory-by-category.module';
import { PaymentMethodsModule } from './payment-methods/payment-methods.module';
import { SalesModule } from './sales/sales.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, CategoriesModule, ProductModule, VendorModule, DistributerModule, AnalyticCardsModule, AlertTypeModule, InventoryByCategoryModule, PaymentMethodsModule, SalesModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, AnalyticCardsService],
})
export class AppModule {}
