#!/bin/bash

echo -e "copying env.db"
cp env.db.example env.db

echo -e "copying school-portal-web/env.json"
cp school-portal-web/env.example.json school-portal-web/env.json

echo -e "copying school-portal-backend/env.json"
cp school-portal-backend/env.example.json school-portal-backend/env.json

echo -e "copying school-portal-backend/ddl/env.sh"
cp school-portal-backend/ddl/env.example.sh school-portal-backend/ddl/env.sh

echo -e "setting up modules"
source install-deps.sh
