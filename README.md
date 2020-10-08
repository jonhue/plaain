# Plaain

Stream your media from anywhere. No server. No fee. Plaain works by connecting your device directly to the cloud where your media is hosted. It then stores metadata to all your movies & TV shows on your device.

### Getting started

Plaain works by connecting media files you are hosting in a cloud, enriching them with metadata and making them available from everywhere.

To get started, you first have to connect your preferred cloud.

### Organize files

Plaain expects your files to be organized in a certain way. Irrespectively of the folder you keep your movies/shows in these folders have to be structured as follows:

#### Movies

The movies folder must only contain other folders that each house the files for a movie.

```
Movies
|--Argo
|--|--1080.mp4
|--|--720.mp4
|--|--English.vtt
```

#### Shows

The shows is structured similarly to the movies folder only that there is an additional folder for each show and season respectively.

```
Shows
|--Dark
|--|--1
|--|--|--1
|--|--|--|--1080.mp4
|--|--|--2
|--|--|--|--1080.mp4
```

#### Source files

Plaain uses all video files with one of the following extensions

* `mp4`
* `m4v`
* `kmv`
* `webm`

and captions with the `vtt` extension.

**Note:** Plaain uses your folder names to fetch metadata on your movies and TV shows from TMDb. In the case that one of your movies/shows isn't added to Plaain even though it is located in your cloud, ensure that you can find the title on https://www.themoviedb.org/ by the name of the directory.

### Connect with cloud provider

When your files are setup, [open Plaain](https://jonhue.github.io/plaain) and connect to your preferred cloud.

Currently this list of cloud providers is supported:

* OneDrive

To wrap up setting up your cloud provider, Plaain will ask you where you stored your movies and TV shows.
More specifically, Plaain will ask you for a path to your movies and a path to your TV shows. The paths should be relative to the root directory of your linked cloud.

You don't have to setup everything at this stage. You will be able to go back and change these settings.

When you finish setting up your provider, Plaain will index your files and enrich them with metadata. Then you're ready to enjoy your favorite movies & TV shows.

### Features

#### Stream anywhere

Stream your media library from wherever you are, with any device. Plaain is a Progressive Web App that runs in your browser and still feels like a native app.

#### No server

You don't need to setup your own media server to run 24/7 with Plaain. Plaain just needs access to your personal cloud provider.

#### Privacy first

Plaain runs in your browser. All the data it stores is kept locally on your device.

#### Built using modern tools

Plaain is built as a Progressive Web App with [React](https://reactjs.org/) & [Redux](https://redux.js.org/). It uses [TMDb](https://www.themoviedb.org/) to fetch metadata on your movies & tv shows.

### Development

This project uses [Yarn](https://github.com/yarnpkg/yarn) as package manager.

1. Clone this repository

    `$ git clone ssh://git@github.com/jonhue/plaain.git`

2. Install [Node.js](https://nodejs.org) and then fetch dependencies

    ```
    $ yarn install
    ```

3. Start the development server

    `$ yarn start`

### Testing

```
yarn prettierlint
yarn eslint
yarn stylelint
```

### Deployment

Plaain is hosted on GitHub Pages.

To deploy, run:

```
$ yarn build
$ yarn deploy
```
