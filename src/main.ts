import { NestFactory } from '@nestjs/core'
import * as express from 'express'
import { json, urlencoded } from 'express'

import { join } from 'path'
import { AppModule } from './app.module'
const cors = require('cors')
async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.setGlobalPrefix('api')
	app.use(json({ limit: '50mb' }))
	app.use(urlencoded({ extended: true, limit: '50mb' }))
	app.use('/public', express.static(join(__dirname, '..', 'public')))
	app.use(cors())
	await app.listen(3001)
}
bootstrap()
