# steg-interactive
A collection of interactive playgrounds to learn about steganography and cryptography techniques throughout history.

This project is still under development. Many pages may not be implemented.

You can access the newest release at https://steg.zkrueger.com

## How to run yourself

### Run from docker

The web application is published as a docker image:

```
docker pull ghcr.io/zobin8/steg-interactive:latest
docker run \
  --publish 3000:3000 \
  --env PORT=3000 \
  ghcr.io/zobin8/steg-interactive:latest
```

### Run from Source

You can run the web application using `npm` or its variants:

```
# Download repository
git clone https://github.com/zobin8/steg-interactive.git
cd steg-interactive

# Create build
npm install --production
npm build

# Host server
npm start
```

## Development

Some additional steps are required to develop the application.

### Install
```
pnpm install --production=false
./scripts/install-hooks.sh

pushd experiments
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
popd
```

### Run server
```
pnpm run dev
```

### Run notebooks
```
cd experiments
source .venv/bin/activate
python -m jupyterlab
```

### Build docker image
```
docker build .
```
