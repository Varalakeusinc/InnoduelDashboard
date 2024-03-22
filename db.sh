#!/bin/bash

# Runs only db

docker compose --env-file=./server/.env down db
docker compose --env-file=./server/.env up -d db
