#!/bin/bash
source env.sh
SCHEMA=schoolportal

rm ./init.sql

cat ./schema.sql >> ./init.sql
echo "USE $SCHEMA;" >> ./init.sql
cat ./tables.sql >> ./init.sql
cat ./keys.sql >> ./init.sql

echo -e "initializing db ..."
docker cp init.sql mysql-8:/
docker exec -it mysql-8 /bin/sh -c "mysql -u root -p$MYSQL_ROOT_PASSWORD < init.sql"
echo -e "\ninit done!"

echo -e "cleaning up ..."
docker exec -it mysql-8 rm init.sql
echo -e "\nclean up done!"
