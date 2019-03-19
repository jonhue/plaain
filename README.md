# Plaain

Stream your media from anywhere. No server. No fee.

### Features

#### Stream anywhere

Stream your media library from wherever you are, with whatever device. Plaain is a Progressive Web App that runs in your browser and feels like a native app.

#### No server

You don't need to setup your own media server to run 24/7 with Plaain. Give Plaain access to your cloud provider and off you go.

#### Privacy first

Plaain runs in your browser. All the data it stores, it stores locally on your device.

#### Built using modern tools

Plaain is built as a Progressive Web App with [React](https://reactjs.org/) & [Redux](https://redux.js.org/). It uses [TMDb](https://www.themoviedb.org/) to fetch metadata on your movies & tv shows.

### Roadmap

* Add support for Dropbox, Google Drive
* Reviews from IMDb, Rotten Tomatoes
* Content ratings from Common Sense Media
* Media recommendations

### Development

This project uses [asdf](https://github.com/asdf-vm/asdf) as version manager and [Yarn](https://github.com/yarnpkg/yarn) as JavaScript package manager.

Dependencies are listed in the [.tool-versions](.tool-versions) file.

1. Clone this repository

    `$ git clone ssh://git@github.com/jonhue/plaain.git`

2. Install dependencies

    ```
    $ asdf install
    $ yarn install
    ```

3. Credentials setup

    Copy [.env.sample](.env.sample) to `.env` and customize

4. Start the development server

    `$ yarn start`

### Testing

This project uses a react-scripts for testing and ESLint and StyleLint for linting:

```
yarn eslint
yarn stylelint
yarn test
```

### Deployment

Plaain is hosted on GitHub Pages.

To deploy, run:

```
$ yarn build
$ yarn deploy
```
