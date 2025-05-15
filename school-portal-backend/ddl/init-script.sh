#!/bin/bash
source env.sh
SCHEMA=schoolportal

rm ./init.sql

cat ./schema.sql >> ./init.sql
echo "USE $SCHEMA;" >> ./init.sql
cat ./tables.sql >> ./init.sql
cat ./keys.sql >> ./init.sql

echo -e "initializing db ..."
mysql -h 127.0.0.1 -P 3306 -u root -p$MYSQL_ROOT_PASSWORD < init.sql || exit
echo "DDL done, db initialized"
