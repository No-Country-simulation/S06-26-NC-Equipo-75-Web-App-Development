import { Body, Get, Controller, ForbiddenException, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ReclutadoresService } from './reclutadores.service';
import { ReclutadorCreateDto } from './dto/reclutador-create.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthenticatedRequest } from '../auth/jwt-auth.guard';

import { ApiCreateRecruiter, ApiFindAllRecruiters, ApiFindRecruiterById } from './reclutadores.swagger';

@Controller('reclutadores')
export class ReclutadoresController {
    constructor(private readonly reclutadoresService: ReclutadoresService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiCreateRecruiter()
    create(
        @Req() req: AuthenticatedRequest,
        @Body() dto: ReclutadorCreateDto,
    ){
        if(req.user.role !== 'ADMIN'){
            throw new ForbiddenException(
                'Only admins can create recruiters'
            );
        }

        return this.reclutadoresService.create(req.user.sub,dto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiFindAllRecruiters()
    findAll(
        @Req() req: AuthenticatedRequest
    ){
        if (req.user.role !== 'ADMIN') {
            throw new ForbiddenException(
                'Only admins can view recruiters'
            );
        }
        return this.reclutadoresService.findAll(
            req.user.sub
        );
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiFindRecruiterById()
    findById(
        @Req() req: AuthenticatedRequest,
        @Param('id') id: string
    ){
        if (req.user.role !== 'ADMIN') {
            throw new ForbiddenException(
                'Only admins can view recruiters'
            );
        }
        return this.reclutadoresService.findById(req.user.sub, id);
    }
}