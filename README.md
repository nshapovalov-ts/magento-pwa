# Tradesquare PWA

Based on the Venia concept storefront created with PWA Studio

Basic documentation for Magento PWA Studio packages is located at [https://pwastudio.io](https://pwastudio.io).

---

## Table of contents

-   [Install](#install)
-   [Base commands](#base-commands)
-   [Project structure](#project-structure)
-   [Other](#other-things)

---

## Install

<br>

-   **Prerequisites:**

    **Node.js** 14.0 or later

    ```
    node -v
    ```

    **Yarn** 1.12.0 or later

    ```
    npm install --global yarn

    yarn --version
    ```

-   Add ssh key for your github profile
-   Clone repository

    ```
    git clone git@github.com:retailplace/frontend-pwa.git
    ```

-   Go to the project folder and install dependencies using yarn

    ```
    yarn
    ```

-   manually create file .env in the root directory with needed parameters or use buildpack command for generate sample env file

    ```
    yarn buildpack create-env-file . --use-examples
    ```

    About env setup https://developer.adobe.com/commerce/pwa-studio/api/buildpack/cli/create-environment-file/

    All parameters can be found here https://github.com/magento/pwa-studio/blob/v12.3.0/packages/pwa-buildpack/envVarDefinitions.json (or choose the correct pwa-studio version first)

    For sample backend used MAGENTO_BACKEND_URL=https://master-7rqtwti-mfwmkrjfqvbjk.us-4.magentosite.cloud

    If local magento backend used, make sure you have the correct version of the magento >=2.4.3, and also [metapackage](https://developer.adobe.com/commerce/pwa-studio/metapackages/open-source/) is installed.

-   run command to create unique local hostname and trusted SSL certificate

    _This command should be used only in a development environment_

    ```
    yarn buildpack create-custom-origin .
    ```

---

## Base commands

<br>

In project directory you can run commands:

### `yarn watch`

This command build application in development mode and runs local dev server

### `yarn storybook`

Runs storybook for basic venia-ui components

### `yarn build`

Builds application using webpack into dist folder

### `yarn start`

Start server for previously builded application

---

## Project structure

### `/i18n`

Files for translations. All basic texts are here. You can add new text or change existing. Used [react-intl](https://formatjs.io/docs/react-intl/) library

_TODO: It might be a good idea to create a webpack config to find all the files in separate i18n folders and chain them together. Then it will not be necessary to store all translations in one place or create separate packages_

### `/public`

Folder for static files, files from this folder remain untouched during build

### `src/components`

Here are reusable components, as well as files for overwriting default ui components. For example, the folder may contain only a css file, which, when assembled, will overwrite the styles of the default component with the same name, or interceptor file for update some logic in original ui component file.

Rewriting is done with a package [@larsroettig/component-targetables](https://github.com/larsroettig/component-targetables).

_TODO: need to create stories for all reusable components_

### `src/helpers`

Here will be all reusable functions, such as different utils, formatters, date functions etc.

### `src/modules`

Separate custom react components consisting of other components, forming some kind of unified functionality. Everything that is not related to reusable components is located here.

### `src/RootComponents`

Main default components such as home page (cms), products page, search results page. Automatically mapped based on server responses.

### `src/targets`

Interceptors for default logic, such as custom hooks, routing data and all other functionality that can be updated without importing default files.

### `tailwind-pwa-theme`

Some custom values for tailwind configuration and creating global css variables. Will be updated as needed, the old default values ​​of css variables need to be updated with new ones from the theme.

### `local-intercept.js`

File for importing interceptors. Don't need to create separate packages on every target interceptor.

---

## Other things

It would be nice to:

-   Add typescript support
-   Add stories for custom reusable components
-   Add tests for custom components (when the components enter the stable phase with only minor updates)
