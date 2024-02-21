#!/bin/bash

# Runs frontend and server

docker compose down frontend
docker compose down server
docker compose up frontend server
