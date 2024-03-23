#!/bin/bash

set -o allexport; source .env; set +o allexport

export PGPASSWORD=$DB_PASSWORD

psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f ./db/create-data.sql 
# to remove data from db use
# ./db/remove-data.sql
echo "Operation completed"

unset PGPASSWORD
