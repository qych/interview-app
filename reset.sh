#!/bin/bash

echo -e "deleting env.db"
rm env.db

echo -e "deleting school-portal-web/env.json"
rm school-portal-web/env.json

echo -e "deleting school-portal-backend/env.json"
rm school-portal-backend/env.json

echo -e "deleting school-portal-backend/ddl/env.sh"
rm school-portal-backend/ddl/env.sh

echo -e "deleting dist ..."
rm -rf school-portal-common/dist

echo -e "deleting node_modules ..."
rm -rf school-portal-backend/node_modules
rm -rf school-portal-common/node_modules
rm -rf school-portal-web/node_modules
echo -e "done!"
