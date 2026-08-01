# Atom Material File Icons Extension

![logo](https://raw.githubusercontent.com/mallowigi/a-file-icon-idea/master/src/main/resources/META-INF/pluginIcon.svg?sanitize=true)

This extension is a port of Atom File Icons for use in Google Chrome and Mozilla Firefox.

It replaces the standard file and folder icons with more suitable options related to file types, frameworks, or programming languages.

<!-- TOC -->

* [Atom Material File Icons Extension](#atom-material-file-icons-extension)
    * [Chrome Extension](#chrome-extension)
    * [Firefox Extension](#firefox-extension)
    * [Edge Extension](#edge-extension)
    * [Supported Sites](#supported-sites)
    * [Features](#features)
        * [Icon Packs](#icon-packs)
        * [File Icons](#file-icons)
        * [Folder Icons](#folder-icons)
    * [Development](#development)
        * [Icon Generator](#icon-generator)
      * [Prepare Icons](#prepare-icons)
        * [Plasmo](#plasmo)
        * [Scripts](#scripts)
        * [Testing](#testing)
        * [Releasing](#releasing)
    * [Credits](#credits)

<!-- TOC -->

## Chrome Extension

<https://chrome.google.com/webstore/detail/atom-file-icons-web/pljfkbaipkidhmaljaaakibigbcmmpnc>

## Firefox Extension

<https://addons.mozilla.org/en-US/firefox/addon/atom-file-icons-web/>

## Edge Extension

<https://microsoftedge.microsoft.com/addons/detail/atom-material-icons/ajfcnjlggplaibcmaannbijmblhiiiee>

## Supported Sites

This extension works on the following websites:

- [GitHub](https://github.com)
- [GitLab](https://gitlab.com)
- [Bitbucket](https://bitbucket.org)
- [Gitee](https://gitee.com)
- [Azure](https://dev.azure.com)

## Features

- Replaces **file icons** with their relevant logo icons
    - According to their extension (Java, PHP, Ruby...)
    - According to the framework (Android, NPM, RSpec...)
    - According to the program used with (Babel, Docker, CircleCI...)
- Replaces **directories**:
    - With a common pattern: src, main, app, img, docs...
    - With a specific pattern: node_modules, .vscode, .git...
- Settings:
    - Icon size: Change the icon size on the fly
    - Monochrome: Use monochrome icons
    - Folder Color: Change the color of regular folders
    - Icon Packs: Enable specific icon packs

### Icon Packs

Icon Packs allow customization of icons based on common file patterns in selected frameworks like "controller", "service", "model", "view",
etc.

Available icon packs:

- **Angular**
- **NestJS**
- **NextJS**
- **NgRx**
- **Rails**
- **Redux**
- **Recoil**
- **Tests**

### File Icons

![File Icons](https://raw.githubusercontent.com/mallowigi/iconGenerator/master/assets/files.png)

### Folder Icons

![Folder Icons](https://raw.githubusercontent.com/mallowigi/iconGenerator/master/assets/folders.png)

## Development

The project is managed with [Bun](https://bun.sh/) (see `.bun-version`). After cloning, install the dependencies:

```shell
bun install
```

### Icon Generator

The icons live in the [iconGenerator](https://github.com/mallowigi/iconGenerator.git) repository, which is included here
as a **git submodule** at `iconGenerator/`. Initialize and build it with:

```shell
git submodule update --init --recursive
cd iconGenerator && npm install && npm run build
```

After running these commands, the `iconGenerator` folder will contain all the icons and the `icon_associations.json`
and `folder_associations.json` files, which describe the associations between file patterns and icons.

To rerun the generator:

```shell
npm run convert
```

### Prepare Icons

Next, you need to generate the index file that loads all icons as React components. This is done by a
small [Bun](https://bun.sh/) script (`scripts/prepare.ts`).

```shell
npm run prepare
```

This process creates the `index.ts` file and places it in the `public/icons/files` and `public/icons/folders` directories.

### Plasmo

The project uses [Plasmo](https://www.plasmo.com/) for building and running web extensions. Plasmo simplifies web extension development by
supporting the latest web technologies like Webpack, TypeScript, React, Vite, etc.

To start the development server in watch mode and generate an extension stub:

```shell
npm run dev
```

Load the dev extension in your browser from `chrome://extensions` (or similar) using the `build/chrome-mv3-dev` directory. The extension
will
support hot reload and other features.

### Scripts

| Command                                             | Description                                                               |
|-----------------------------------------------------|---------------------------------------------------------------------------|
| `bun run dev`                                       | Start Plasmo in watch mode (`bun run dev:firefox` for Firefox MV2).       |
| `bun run build`                                     | Build the production extension (`bun run build:firefox` for Firefox MV2). |
| `bun run prepare`                                   | Regenerate the icon `index.ts` barrels and copy assets into `public/`.    |
| `bun run test`                                      | Run the unit tests with `bun test`.                                       |
| `bun run lint` / `bun run format` / `bun run check` | Lint, format, and check with [Biome](https://biomejs.dev/).               |

### Testing

Unit tests use the built-in [Bun test runner](https://bun.sh/docs/cli/test) and live alongside the code (e.g.
`src/associations/*.test.ts`). They cover the pure icon-association logic (pattern matching, caching, and icon-pack
filtering).

```shell
bun test
```

## Credits

Special thanks to:

- The [Material Theme UI plugin](https://www.material-theme.com)
- [Atom File Icons](https://github.com/file-icons/atom) and [Sublime Text A File Icon](https://github.com/SublimeText/AFileIcon)
- [Scientifics Study Vectors](https://www.svgrepo.com/svg/121720/atom) for the plugin icon
- [File-Icons](https://github.com/file-icons/source/blob/master/charmap.md)
- [FontAwesome 4.7.0](https://fontawesome.com/v4.7.0/cheatsheet/)
- [MFixx](https://github.com/file-icons/MFixx/blob/master/charmap.md)
- [Devicons](https://github.com/file-icons/DevOpicons/blob/master/charmap.md)
- [Octicons](https://octicons.github.com/)
- [Material Design Icons](https://materialdesignicons.com/)
