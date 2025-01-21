#!/bin/bash

npx prisma migrate deploy
bun ./dist/src/main.js