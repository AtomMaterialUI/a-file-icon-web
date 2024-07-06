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
        * [Gulp Prepare](#gulp-prepare)
        * [Plasmo](#plasmo)
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

### Icon Generator

To build the extension, first clone the [iconGenerator](https://github.com/mallowigi/iconGenerator.git) repository containing all the icons.
Set it up by following these steps:

```shell
git clone https://github.com/mallowigi/iconGenerator.git
npm install && cd iconGenerator && npm install
npm run build
```

After running these commands, the `iconGenerator` folder will contain all the icons and the `icon_associations.json`
and `folder_associations.json` files, which describe the associations between file patterns and icons.

To rerun the generator:

```shell
npm run convert
```

### Gulp Prepare

Next, you need to generate the index file that loads all icons as React components. This is done thanks to the `Gulp` task runner.

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

To build the extension for production:

```shell
npm run build
```

This will create a zip file in the `dist` directory.

### Releasing

To release the extension:

```shell
npm run release # Build the chrome extension
# or
npm run webext # Build the firefox extension
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
