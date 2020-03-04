#!/usr/bin/env bash

TRUE_ENV=development node --max-old-space-size=2048 -r dotenv/config ./dist/index.js