import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CommentsModule } from './comment/comment.module'
import { ProjectsModule } from './projects/projects.module'
import { SubtasksModule } from './subtasks/subtasks.module'
import { TasksModule } from './tasks/tasks.module'
import { UsersModule } from './users/users.module'
@Module({
	imports: [
		ProjectsModule,
		TasksModule,
		UsersModule,
		SubtasksModule,
		CommentsModule,
		ConfigModule.forRoot({ isGlobal: true }),
	],
})
export class AppModule {}
