import { Controller, Get } from '@nestjs/common';
import { AnalyticCardsService } from './analytic-cards.service';



@Controller('analytic-cards')
export class AnalyticCardsController {
    constructor(
        private readonly analyticCardsService: AnalyticCardsService
    ) { }


    @Get('vendor')
    async getVendorAnalyticCards() {
        return await this.analyticCardsService.getVendorAnalyticCards()
    }

    @Get('product')
    async getProductAnalyticCards() {
        return await this.analyticCardsService.getProductAnalyticCards()
    }

    @Get('insights')
    async getInsightsAnalyticCards(){
        return await this.analyticCardsService.getInsightsAnalyticCards()
    }
}   