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
mv ./dashboard  my-project
cd my-project

```


#npm

``` bash

npm install
gulp init
gulp app-build
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
in the same app.js file, provide google api keys

```js

app.SERVER_KEY='';
app.MAP_KEY='';

```


#tasks

``` bash

gulp start-app

```

# Browser

``` bash

localhost:9040

```

## Additional Tasks

``` bash

gulp sass-compile
gulp sass-watch
gulp app-build
gulp app-imports
gulp app-clean
gulp app-watch
gulp watch
gulp vulcanize
gulp vulcanize-min

```


## Scaffold tasks

```bash

# crud controller
gulp db-crud-controller --class <className> --icon <icon>

# empty controller
gulp db-empty-controller --name <controllerName>

# content controller
gulp db-empty-controller --name <controllerName>

# empty view
gulp db-empty-view --name <view> --folder <viewFolder>

# content view
gulp db-content-view --name <view> --folder <viewFolder>

# list view
gulp db-list-view --name <view> --folder <viewFolder> --class <className> --icon <icon>

# grid view
gulp db-grid-view --name <view> --folder <viewFolder> --class <className> --icon <icon>

# service
gulp db-service --class <className>

# provider
gulp db-provider --class <className>

# binding
gulp db-binding --name <name>


```