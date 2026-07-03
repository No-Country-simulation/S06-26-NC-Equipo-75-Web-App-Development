import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthenticatedRequest } from '../auth/jwt-auth.guard';

import { SkillsService } from './skills.service';
import { SkillCreateDto } from './dto/skill-create.dto';

import {
  ApiCreateSkill,
  ApiFindAllSkills,
  ApiFindSkillById,
} from './skills.swagger';

@Controller('skills')
export class SkillsController {
  constructor(
    private readonly skillsService: SkillsService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiCreateSkill()
  create(
    @Req() req: AuthenticatedRequest,
    @Body() dto: SkillCreateDto,
  ) {
    if (req.user.role !== 'Recruiter') {
      throw new ForbiddenException(
        'Only recruiters can create skills',
      );
    }

    return this.skillsService.create(dto);
  }

  @Get()
  @ApiFindAllSkills()
  findAll() {
    return this.skillsService.findAll();
  }

  @Get(':id')
  @ApiFindSkillById()
  findById(@Param('id') id: string) {
    return this.skillsService.findById(id);
  }
}