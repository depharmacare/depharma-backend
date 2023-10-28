import { Controller, Get, UseGuards } from '@nestjs/common';
import { AnalyticCardsService } from './analytic-cards.service';
import { JwtAuthGaurd } from 'src/auth/jwt-auth.gaurd';



@Controller('analytic-cards')
export class AnalyticCardsController {
    constructor(
        private readonly analyticCardsService: AnalyticCardsService
    ) { }

    @UseGuards(JwtAuthGaurd)
    @Get('vendor')
    async getVendorAnalyticCards() {
        return await this.analyticCardsService.getVendorAnalyticCards()
    }

    @UseGuards(JwtAuthGaurd)
    @Get('product')
    async getProductAnalyticCards() {
        return await this.analyticCardsService.getProductAnalyticCards()
    }

    @UseGuards(JwtAuthGaurd)
    @Get('insights')
    async getInsightsAnalyticCards() {
        return await this.analyticCardsService.getInsightsAnalyticCards()
    }
}   