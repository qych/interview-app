#!/bin/bash

HIGHLIGHT='\033[0;36m'
INFO='\033[0;33m'
RESET='\033[0m'
WORK_DIR=`pwd`

echo "base directory: $WORK_DIR"

declare -a MODULES=(
    "$WORK_DIR/school-portal-common"
    "$WORK_DIR/school-portal-backend"
    # "$WORK_DIR/school-portal-backend-test"
    "$WORK_DIR/school-portal-web"
)

for mod in "${MODULES[@]}";
do
    echo -e "${HIGHLIGHT}Processing [$mod]${RESET}"
    cd $mod

    echo -e "${HIGHLIGHT}[$mod] Deleting node_modules ...${RESET}"
    rm -rf node_modules

    if [ "$mod" == "$WORK_DIR/school-portal-common" ]; then
      echo -e "${HIGHLIGHT}[$mod] Deleting previous build ...${RESET}"
      rm -rf dist
    fi

    echo -e "${HIGHLIGHT}[$mod] Install npm packages ...${RESET}"
    npm ci
    echo -e "${HIGHLIGHT}[$mod] node_modules installed!${RESET}"

    if [ "$mod" == "$WORK_DIR/school-portal-common" ]; then
        echo -e "${HIGHLIGHT}[$mod] Building ...${RESET}"
        npm run build
        echo -e "${HIGHLIGHT}[$mod] Build complete!${RESET}"
    fi

    echo -e "${HIGHLIGHT}[$mod] setup complete!${RESET}\n\n"
done

# workaround `npm ci` issues with workspace
cd $WORK_DIR/school-portal-common
npm ci
