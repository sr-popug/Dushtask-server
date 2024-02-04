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
import { ProjectsService } from './projects.service'

@Controller('projects')
export class ProjectsController {
	constructor(private readonly projectsService: ProjectsService) {}
	@Get()
	async getProjects() {
		return this.projectsService.getAll()
	}

	@Get('one/:id')
	async getProject(@Param('id') id: string) {
		return this.projectsService.getByID(id)
	}
	@Get('byUserId/:id')
	async getProjectByUserID(@Param('id') id: string) {
		return this.projectsService.getByUserID(id)
	}
	@Post()
	@UsePipes(new ValidationPipe())
	async create(@Body() dto) {
		return this.projectsService.create(dto)
	}
	@Patch('change/:id')
	async change(@Param('id') id: string, @Body() content) {
		return this.projectsService.patchProject(id, content)
	}
	@Patch('time/:id')
	async addTime(@Param('id') id: string, @Body() seconds) {
		return this.projectsService.addTime(id, seconds)
	}
	@Delete('delete/:id')
	async delete(@Param('id') id: string) {
		return this.projectsService.delete(id)
	}
}
