import { Injectable } from '@nestjs/common'
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception'
import { PrismaService } from 'src/prisma.service'
@Injectable()
export class TasksService {
	constructor(private prisma: PrismaService) {}
	async getByID(id) {
		const task = await this.prisma.task.findUnique({
			where: { id: +id },
		})
		if (!task) {
			throw new NotFoundException('Task Not Found')
		}
		return task
	}
	async getByProjectID(projectId) {
		const tasks = await this.prisma.task.findMany({
			where: { projectId: +projectId },
		})
		if (!tasks) {
			throw new NotFoundException('Task Not Found')
		}
		return tasks
	}
	async getAll() {
		return this.prisma.task.findMany()
	}
	async create(dto) {
		return this.prisma.task.create({
			data: dto,
		})
	}
	async change(id, content) {
		const task = await this.getByID(id)
		return this.prisma.task.update({
			where: { id: task.id },
			data: {
				...content,
			},
		})
	}

	async toggleComplete(id) {
		const task = await this.getByID(id)
		return this.prisma.task.update({
			where: { id: task.id },
			data: {
				isComplete: !task.isComplete,
			},
		})
	}
	async delete(id) {
		const task = await this.getByID(id)
		return this.prisma.task.delete({
			where: { id: task.id },
		})
	}
}
