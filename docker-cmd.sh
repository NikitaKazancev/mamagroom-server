#!/bin/bash

prisma db push
prisma generate
npm run build
prisma db seed
npm run prod