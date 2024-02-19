#!/bin/bash

docker compose --env-file=./server/.env down
docker-compose --env-file=./server/.env up --build
