#!/bin/bash

export TZ="Asia/Tokyo"
export NODE_ENV=development

npm run migrate:run
# start dev server
npm run dev
