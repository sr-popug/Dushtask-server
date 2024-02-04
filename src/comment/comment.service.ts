import { Injectable } from '@nestjs/common'
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception'
import { PrismaService } from 'src/prisma.service'
@Injectable()
export class CommentsService {
	constructor(private prisma: PrismaService) {}
	async getByID(id) {
		const comment = await this.prisma.comment.findUnique({
			where: { id: +id },
		})
		if (!comment) {
			throw new NotFoundException('Comment Not Found')
		}
		return comment
	}
	async getAll() {
		return this.prisma.comment.findMany()
	}
	async create(dto) {
		return this.prisma.comment.create({
			data: dto,
		})
	}
	async change(id, content) {
		const comment = await this.getByID(id)
		return this.prisma.comment.update({
			where: { id: comment.id },
			data: {
				...content,
			},
		})
	}
	async changeText(id, text) {
		const comment = await this.getByID(id)
		return this.prisma.comment.update({
			where: { id: comment.id },
			data: {
				text: text,
			},
		})
	}
	async delete(id) {
		const comment = await this.getByID(id)
		return this.prisma.comment.delete({
			where: { id: comment.id },
		})
	}
}
