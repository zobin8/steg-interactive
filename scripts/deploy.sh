#!/usr/bin/env bash

IMAGE="steg-interactive"
REMOTE="ghcr.io/zobin8"
USER="zobin8"

# Get version number and check if latest

VERSION="$(cat package.json | grep '"version":' | grep -Eo '[[:digit:]]+\.[[:digit:]]+\.[[:digit:]]+')"
ALL_VERSIONS="$(docker image ls $IMAGE --format '{{.Tag}}' | grep -v latest)"
LATEST_VERSION="$(echo -e "${ALL_VERSIONS}\n$VERSION" | sort -V | tail -n1)"

if [[ $LATEST_VERSION == $VERSION ]]
then
  echo "Deploying $VERSION as latest"
else
  echo "Redeploying $VERSION"
fi

sleep 1

# Build

docker login -u $USER $REMOTE || exit 2
docker build . -t $IMAGE:$VERSION || exit 2

# Set tags

git tag $VERSION
docker tag $IMAGE:$VERSION $REMOTE/$IMAGE:$VERSION

# Push to remote

git push origin $VERSION || exit 2
docker push $REMOTE/$IMAGE:$VERSION || exit 2

# Push to latest
if [[ $LATEST_VERSION == $VERSION ]]
then
  docker tag $IMAGE:$VERSION $IMAGE:latest
  docker tag $REMOTE/$IMAGE:$VERSION $REMOTE/$IMAGE:latest
  docker push $REMOTE/$IMAGE:latest
fi
