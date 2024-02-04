import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class ProjectsService {
	constructor(private prisma: PrismaService) {}
	async getByID(id) {
		const project = await this.prisma.project.findUnique({
			where: { id: +id },
		})
		if (!project) throw new NotFoundException('Project Not Found')
		return project
	}
	async getByUserID(userId) {
		const projects = await this.prisma.project.findMany({
			where: { userId: +userId },
		})
		if (!projects) throw new NotFoundException('Project Not Found')
		return projects
	}

	async getAll() {
		return this.prisma.project.findMany()
	}
	async create(dto) {
		return this.prisma.project.create({
			data: dto,
		})
	}

	async addTime(id, { seconds }) {
		const project = await this.getByID(id)
		const oldTime = project.time
		console.log(oldTime)
		console.log(seconds)
		const newTime = new Date(Number(seconds) * 1000)
			.toISOString()
			.substring(11, 19)
		console.log(newTime)

		const timeOldN: any = oldTime.split(':').map((num: string) => Number(num))
		const timeNewN = newTime.split(':').map((num: string) => Number(num))
		const time = `${
			(timeNewN[1] / timeOldN[1] ? 1 : 0) + timeNewN[0] + timeOldN[0]
		}:${(
			'0' +
			((timeNewN[2] / timeOldN[2] ? 1 : 0) + timeNewN[1] + timeOldN[1])
		).slice(-2)}:${('0' + (timeNewN[2] + timeOldN[2])).slice(-2)}`
		return this.prisma.project.update({
			where: { id: +project.id },
			data: {
				time,
			},
		})
	}

	async patchProject(id, notes) {
		const project = await this.getByID(id)
		return this.prisma.project.update({
			where: { id: +project.id },
			data: {
				...notes,
			},
		})
	}
	async delete(id) {
		const project = await this.getByID(id)
		return this.prisma.project.delete({
			where: { id: +project.id },
		})
	}
}
