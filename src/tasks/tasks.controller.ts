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
import { TasksService } from './tasks.service'

@Controller('tasks')
export class TasksController {
	constructor(private readonly tasksService: TasksService) {}
	@Get()
	async getTasks() {
		return this.tasksService.getAll()
	}
	@Get('byprId/:id')
	async getByProjectId(@Param('id') projectId: string) {
		return this.tasksService.getByProjectID(projectId)
	}
	@Get('one/:id')
	async getProject(@Param('id') id: string) {
		return this.tasksService.getByID(id)
	}
	@Post()
	@UsePipes(new ValidationPipe())
	async create(@Body() dto) {
		return this.tasksService.create(dto)
	}
	@Patch('change/:id')
	async change(@Param('id') id: string, @Body() content) {
		return this.tasksService.change(id, content)
	}
	@Patch('toggleComplete/:id')
	async toggleComplete(@Param('id') id: string) {
		return this.tasksService.toggleComplete(id)
	}

	@Delete('delete/:id')
	async delete(@Param('id') id: string) {
		return this.tasksService.delete(id)
	}
}
