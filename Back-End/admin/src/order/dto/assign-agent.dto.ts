import { IsNotEmpty, IsNumber } from 'class-validator';

export class AssignAgentDto {
    @IsNotEmpty()
    @IsNumber()
    agentId: number;
}