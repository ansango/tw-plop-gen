# tw-plop-gen

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)

## About <a name = "about"></a>

Vite starter with theme-ui classes and tailwindcss plugin, and command line components generator

## Getting Started <a name = "getting_started"></a>

```bash
yarn install # npm install
```

## Usage <a name = "usage"></a>

### Prerequisites

- nodejs

### Start Environment

```bash
yarn dev # npm run dev
```

### Start CLI

```bash
yarn cli # npm run cli
```

### Build Theme UI classes

```bash
yarn build:ui # npm run build:ui
```

> Add the plugin into tailwindcss config file.

```js
// tailwind.config.js
module.exports = {
  plugins: [require("./.theme-ui/src/index.js")],
};
```
