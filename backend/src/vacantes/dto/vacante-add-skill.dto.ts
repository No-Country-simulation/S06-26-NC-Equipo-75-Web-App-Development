import { IsUUID } from 'class-validator';



export class VacanteAddSkillDto {

    @IsUUID()
    skillId: string;

}