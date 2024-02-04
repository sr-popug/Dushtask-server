import { Injectable } from '@nestjs/common'
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception'
import { PrismaService } from 'src/prisma.service'
@Injectable()
export class SubtasksService {
	constructor(private prisma: PrismaService) {}
	async getByID(id) {
		const subtask = await this.prisma.subtask.findUnique({
			where: { id: +id },
		})
		if (!subtask) {
			throw new NotFoundException('Subtask Not Found')
		}
		return subtask
	}
	async getAll() {
		return this.prisma.subtask.findMany()
	}
	async create(dto) {
		return this.prisma.subtask.create({
			data: dto,
		})
	}
	async getByTaskID(taskId) {
		const tasks = await this.prisma.subtask.findMany({
			where: { taskId: +taskId },
		})
		if (!tasks) throw new NotFoundException('Project Not Found')
		return tasks
	}
	async toggleComplete(id) {
		const subtask = await this.getByID(id)
		return this.prisma.subtask.update({
			where: { id: subtask.id },
			data: {
				isComplete: !subtask.isComplete,
			},
		})
	}
	async change(id, content) {
		const subtask = await this.getByID(id)
		return this.prisma.subtask.update({
			where: { id: subtask.id },
			data: {
				...content,
			},
		})
	}

	async delete(id) {
		const subtask = await this.getByID(id)
		return this.prisma.subtask.delete({
			where: { id: subtask.id },
		})
	}
}
