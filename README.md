Mobile First Dashboard
===========================

Installs a default revstack.io dashboard app

# Installation


##prerequisites

``` bash

node
gulp
bower

```


#clone repo

``` bash

git clone https://github.com/RevStack/Dashboard.git
mv ./revstack-dashboard  my-project
cd my-project

```


#npm

``` bash

npm install
gulp init
bower install

```

## Configure Rest Endpoint
open app.js under ./public/app/app.js and edit the rest endpoint

```js


```

## Google API Keys
in the same app.js file, provide a google api keys

```js



```


#tasks

``` bash

gulp start-live-app

```

# Browser

``` bash

localhost:9040

```

## Additional Tasks

``` bash

gulp sass-compile
gulp app-build-imports
gulp vulcanize

```


