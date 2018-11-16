#!/bin/bash

# This file build the project into `dist` folder, and push it into the `build` branch
# Environment is automatically detected in the project config
# To run: ./deploy.sh

START_TIME=`date +%s`

# get the current git branch to return there later
CURRENT_BRANCH=$(git branch | grep \* | cut -d ' ' -f2)

# set the target branch for deployment
DEPLOY_BRANCH=gh-pages
echo "deploying to branch "$DEPLOY_BRANCH

TIMESTAMP=`date '+%Y%m%d%H%M%S'`
MESSAGE="build_"$CURRENT_BRANCH"_"$TIMESTAMP

# build the project
yarn run build

# revert the changes made to configuration files
git reset --hard HEAD

# switch to corresponding build branch
git checkout $DEPLOY_BRANCH

# replace index.html and static folder in the root path with the ones in /dist
rm index.html
rm -r static
cp -R dist/. ./

#temporarily disable emoji commit hook
mv .git/hooks/prepare-commit-msg .git/hooks/prepare-commit-msg.disabled

# commit and push
git add .
git commit -m "$MESSAGE"
git push origin $DEPLOY_BRANCH -f

# return to current working branch
git checkout $CURRENT_BRANCH

#enable emoji commit hook again
mv .git/hooks/prepare-commit-msg.disabled .git/hooks/prepare-commit-msg

END_TIME=`date +%s`
ELAPSED=`expr $END_TIME - $START_TIME`
echo "Build successfully in "$ELAPSED" s".
