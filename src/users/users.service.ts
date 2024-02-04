import { Injectable } from '@nestjs/common'
import {
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common/exceptions'
import { User } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}
	async getByID(id) {
		const user = await this.prisma.user.findUnique({
			where: { id: +id },
		})
		if (!user) throw new NotFoundException('User Not Found')
		return user
	}
	async getByEmail(email) {
		const user = await this.prisma.user.findUnique({
			where: { email: email },
		})
		if (!user) throw new NotFoundException('User Not Found')
		return user
	}

	async getAll() {
		return this.prisma.user.findMany()
	}

	async registration(user: Partial<User>, photo) {
		return this.prisma.user.create({
			data: {
				email: user.email,
				name: user.name,
				password: user.password,
				img: photo.path,
			},
		})
	}
	async login(user) {
		const loginUser = this.getByEmail(user.email)
		if (!loginUser || user.password != (await loginUser).password) {
			throw new UnauthorizedException('Неверный логин или пароль')
		}
		return loginUser
	}
	async change(id, content) {
		const user = await this.getByID(id)
		return this.prisma.user.update({
			where: { id: user.id },
			data: {
				...content,
			},
		})
	}
	async delete(id) {
		const user = await this.getByID(id)
		return this.prisma.user.delete({
			where: { id: user.id },
		})
	}

	async changePhoto(id, photo) {
		const user = await this.getByID(id)
		return this.prisma.user.update({
			where: { id: user.id },
			data: {
				img: photo.path,
			},
		})
	}
}
