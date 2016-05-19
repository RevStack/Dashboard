RevStack Dashboard
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

$Rest.protocol = 'http';
$Rest.host = '';
$Rest.path = '';
$Rest.port = 80;

```

## Google API Keys
in the same app.js file, provide a google api keys

```js

app.SERVER_KEY='';
app.MAP_KEY='';

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


