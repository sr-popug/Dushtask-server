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
import { SubtasksService } from './subtasks.service'

@Controller('subtasks')
export class SubtasksController {
	constructor(private readonly subtasksService: SubtasksService) {}
	@Get()
	async getSubtasks() {
		return this.subtasksService.getAll()
	}
	@Get('one/:id')
	async getSubtask(@Param('id') id: string) {
		return this.subtasksService.getByID(id)
	}
	@Get('bytaskId/:id')
	async getProject(@Param('id') id: string) {
		return this.subtasksService.getByTaskID(id)
	}

	@Post()
	@UsePipes(new ValidationPipe())
	async create(@Body() dto) {
		return this.subtasksService.create(dto)
	}

	@Patch('complete/:id')
	async toggleComplete(@Param('id') id: string) {
		return this.subtasksService.toggleComplete(id)
	}
	@Patch('change/:id')
	async change(@Param('id') id: string, @Body() content) {
		return this.subtasksService.change(id, content)
	}

	@Delete('delete/:id')
	async delete(@Param('id') id: string) {
		return this.subtasksService.delete(id)
	}
}
