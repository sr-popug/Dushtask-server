import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { SubtasksController } from './subtasks.controller'
import { SubtasksService } from './subtasks.service'

@Module({
	controllers: [SubtasksController],
	providers: [SubtasksService, PrismaService],
})
export class SubtasksModule {}
