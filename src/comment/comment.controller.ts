import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { CommentsService } from './comment.service'

@Controller('comment')
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) {}
	@Get()
	async getTasks() {
		return this.commentsService.getAll()
	}
	@Get('one/:id')
	async getProject(@Param('id') id: string) {
		return this.commentsService.getByID(id)
	}
	@Post()
	@UsePipes(new ValidationPipe())
	async create(@Body() dto) {
		return this.commentsService.create(dto)
	}
	@Patch('change/:id')
	async change(@Param('id') id: string, @Body() content) {
		return this.commentsService.change(id, content)
	}
	@Delete('delete/:id')
	async delete(@Param('id') id: string) {
		return this.commentsService.delete(id)
	}
}
