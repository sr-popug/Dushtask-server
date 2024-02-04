import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CommentsController } from './comment.controller'
import { CommentsService } from './comment.service'

@Module({
	controllers: [CommentsController],
	providers: [CommentsService, PrismaService],
})
export class CommentsModule {}
