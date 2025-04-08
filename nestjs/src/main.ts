// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createServer } from 'http';

async function bootstrap() {
  const express = require('express')(); // create raw express app
  const server = createServer(express); // create your own HTTP server

  // Configure your server before bootstrapping Nest
  server.keepAliveTimeout = 5000; // 5 seconds
  server.headersTimeout = 6000;   // needs to be longer than keepAliveTimeout

  const app = await NestFactory.create(AppModule, new (require('@nestjs/platform-express').ExpressAdapter)(express));
  await app.init(); // don't listen via Nest; you already have server

  server.listen(3000, () => {
    console.log('Custom HTTP server running on http://localhost:3000');
  });
}
bootstrap();
