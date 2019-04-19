#!/bin/sh
echo creating new build
npm run build
echo deleting old build
rm -rf ../../../fullstack2019-osa3-backend/build
echo moving new build
cp -r build ../../../fullstack2019-osa3-backend/build
echo done