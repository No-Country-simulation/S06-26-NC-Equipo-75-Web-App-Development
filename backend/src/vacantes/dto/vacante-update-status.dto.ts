import { ApiProperty } from '@nestjs/swagger';
import { VacancyStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class VacanteUpdateStatusDto {
  @ApiProperty({
    enum: VacancyStatus,
    example: VacancyStatus.CLOSED,
  })
  @IsEnum(VacancyStatus)
  status: VacancyStatus;
}
