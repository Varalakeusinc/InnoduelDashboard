#!/bin/bash

# Runs frontend, server and db

docker compose --env-file=./server/.env down
docker compose --env-file=./server/.env up
