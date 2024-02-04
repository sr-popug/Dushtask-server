import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UploadedFile,
	UseInterceptors,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { v4 } from 'uuid'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}
	@Get()
	async getUsers() {
		return this.usersService.getAll()
	}
	@Get('one/:id')
	async getProject(@Param('id') id: string) {
		return this.usersService.getByID(id)
	}
	@Post('register')
	@UsePipes(new ValidationPipe())
	@UseInterceptors(
		FileInterceptor('img', {
			storage: diskStorage({
				destination: './public',
				filename: (req, img, cb) => {
					cb(null, v4() + '.png')
				},
			}),
		})
	)
	async create(@Body() dto, @UploadedFile() img) {
		return this.usersService.registration(dto, img)
	}
	@Post('login')
	@UsePipes(new ValidationPipe())
	async login(@Body() dto) {
		return this.usersService.login(dto)
	}
	@Patch('changePhoto/:id')
	@UseInterceptors(
		FileInterceptor('img', {
			storage: diskStorage({
				destination: './public',
				filename: (req, img, cb) => {
					cb(null, v4() + '.png')
				},
			}),
		})
	)
	async changePhoto(
		@Param('id') id: string,
		@UploadedFile() img: Express.Multer.File
	) {
		return this.usersService.changePhoto(id, img)
	}
	@Patch(':id')
	async change(@Param('id') id: string, @Body() content) {
		return this.usersService.change(id, content)
	}
	@Delete('delete/:id')
	async delete(@Param('id') id: string) {
		return this.usersService.delete(id)
	}
}
