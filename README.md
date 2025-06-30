# steg-interactive
A collection of interactive playgrounds to learn about steganography and cryptography techniques throughout history.

This project is still under development. Many pages may not be implemented.

## How to run

You can run the main web application using `npm` or its variants:

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
npm install --production=false
./install-hooks.sh

pushd experiments
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
popd
```

### Run server
```
npm run dev
```

### Run notebooks
```
cd experiments
source .venv/bin/activate
python -m jupyterlab
```
