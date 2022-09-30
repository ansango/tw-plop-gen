# THEME UI

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)

## About <a name = "about"></a>

Theme-ui classes and tailwindcss plugin.

## Getting Started <a name = "getting_started"></a>

```bash
yarn install # npm install
```

## Usage <a name = "usage"></a>

### Prerequisites

- nodejs

### Build UI

```bash
yarn build
```

### Using in your project

1. Install tailwindcss, [read the official docs](https://tailwindcss.com/docs/installation)
2. Build Theme UI.
3. Add the plugin into tailwindcss config file.

```js
// tailwind.config.js
module.exports = {
  plugins: [require("./.theme-ui/src/index.js")],
};
```
