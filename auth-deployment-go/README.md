<p align="center">
  <a href="https://snek.at/" target="_blank" rel="noopener noreferrer">
    <img src="https://avatars2.githubusercontent.com/u/55870326?s=400&u=c6c7f06305ddc94747d474850fde7b2044f53838&v=4" alt="SNEK Logo" height="150">
  </a>
</p>

<h3 align="center">Snek Logging Prototype</h3>

<p align="center">
  This is the official logging service by snek-at.
  Featuring the fully functional prototype and the set-up guide.
  <br>
  <a href="https://github.com/snek-at/jaen/issues/new?template=bug_report.md">Report bug</a>
  ·
  <a href="https://github.com/snek-at/jaen/issues/new?template=feature_request.md">Request feature</a>
  ·
  <a href="https://www.github.com/snek-at/jaen/wiki">Documentation</a>
  <br>
  <br>
  <a href="https://www.codacy.com/gh/snek-at/jaen/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=snek-at/jaen&amp;utm_campaign=Badge_Grade">
    <img src="https://app.codacy.com/project/badge/Grade/bb3d984d38704860ba7ad800d319b8c4" />
  </a>
</p>

## [](#table-of-contents)What’s In This Document
- [🚀 Get Up and Running in 5 Minutes](#-get-up-and-running-in-5-minutes)
    - [Get the prototype](#get-the-prototype)
    - [Install requirements](#install-requirements)
    - [Configure settings](#configure-settings)
    - [Start Services](#start-services)
- [🖨️ Generating Logs](#-generating-logs)
    - [Using Graphql](#using-graphql)
    - [Implement the function](#implement-the-function)
- [🐞 How to Report a Bug or Request a Feature](#-how-to-report-a-bug-or-request-a-feature)
- [🤝 How to Contribute](#-how-to-contribute)
- [💚 Thanks](#-thanks)
- [💼 Creators](#-creators)
- [🤔 FAQs](#-faqs)
- [📝 Copyright and License](#-copyright-and-license)

## [](#-get-up-and-running-in-5-minutes)🚀 Get Up and Running in 5 Minutes

This chapter desribes how to set up your personal logging prototype, which can also be modified 
to use as a personal logging service.

### [](#get-the-prototype)Get the prototype
The first step is to clone the code, to do this just us the following command.
```
git clone https://github.com/schett-net/snek-log-prototype.git
```

### [](#install-requirements)Install requirements
After successfully cloning the repository, the next step is to install the required packages.
<p>
The first requirements that have to be installed are the ones of the function. To do this move into the functions directory and run the following command.

```
cd functions;
yarn
```

The functions directory needs another installation inside the src folder, because the python packages cannot be installed in compination with the node packages. To install the python dependencies move into the correct directory and run the following command.

```
cd src/log_prototype/;
python setup.py install
```

The last step is to move into the directory of the demo website and install the requirements using following command.

```
cd ../../../website;
yarn
```
  
### [](#configure-settings)Configure settings
  
The next step is to move into the `factory.ts` file and set your personal url that the Graphql service is going to run on. You also have to make sure that this url is publically accessable otherwise the service will not work.

```javascript
export const fn = makeFn({
  url: "https://your-url/graphql",
});
```

### [](#start-services)Start services
  
Now that all services are ready they can be started one by one, each service needs a seperate terminal to be started in. 
<br>
Start of by starting the proxy handler, the proxy handler is started first because the functions and the website service require the functionallity of storing logs into parquet files. The proxy handler is started with the following command.

```
cd functions/src/log_prototype/;
python3 -m log_prototype.proxy_handler
```  
  
The proxy handler is now running, open a new terminal and keep it running in background. In the new terminal the function service will be started, to do this enter the following command inside the functions directory.
  
```
cd functions;
yarn start
```    

The Grahpql server should now be up and running make sure it has the same url as configured in the settings and that is publically accessible. If thats the case the last step is to open another terminal and start the website using the following command.

```
cd website;
yarn start
```   

🎉 Congrats you have successfully set up the logging service.

## [](#-generating-logs)🖨 Generating Logs

This chapter describes the possibillities to generate logs using the prototype.

### [](#using-graphql)Using Graphql

Graphql is the fastet way to generate hand written logs, just open the Graphql web-service that has been previously started and send a log like this example.

```graphql
mutation log {
  log (fnArgs: {
    agent: "Mozilla/5.0 (X11; Linux x86_64; rv:6.0a1) Gecko/20110421 Firefox/6.0a1",
    bytes: 732,
    clientip: "21.238.71.24",
    geo: {
        coordinates: {
            lat: 36.29441667,
            lon: -95.47966667
        },
        dest: "JP",
        src: "ID",
        srcdest: "ID:JP"
    },
    host: "www.elastic.co",
    ip: "31.238.71.24",
    machine: {
        os: "ios",
        ram: 9663676416
    },
    message: "31.238.71.24 - - [2018-07-25T07:41:11.237Z] \"GET / HTTP/1.1\" 200 732 \"-\" \"Mozilla/5.0 (X11; Linux x86_64; rv:6.0a1) Gecko/20110421 Firefox/6.0a1\"",
    referer: "http://twitter.com/success/sergey-volkov",
    request: "/",
    response: 200,
    timestamp: "2022-07-13T07:41:11.237Z",
    url: "https://www.elastic.co/products",
    tags: {
      list: ["success", "info"]
    }
    fingerprint: "ce1e9723c10e498b37a328a92c58f71b",
  })
}
```

### [](#implement-the-function)Implement the function

The second and more common way to generate logs is to implement the function into an running web service. This can be done by importing the log functionallity into the wanted page like this.

```javascript
import log from "../../../functions/src/log";
```

After importing it, the function can be used like the Graphql mutation, just pass some parameters that should be logged and the function is going to store it into the parquet file. In our example we also tried to attach some dynamic data like a fingerprint to store more than just static data all the time.

```javascript
const fpPromise = FingerprintJS.load({
	monitoring: false
});

const fp = await fpPromise;
const result = await fp.get();
var str = new Date().setSeconds(0,0);
var dt = new Date(str).toISOString();

// The static data should be replaced with real data server sided
await log({
	"fingerprint": result.visitorId,
	"agent": "Mozilla/5.0 (X11; Linux x86_64; rv:6.0a1) Gecko/20110421 Firefox/6.0a1",
	"bytes": 732,
	"clientip": "21.238.71.24",
	"geo": {
	"coordinates": {
  		"lat": 36.29441667,
  		"lon": -95.47966667
	},
		"dest": "JP",
		"src": "ID",
		"srcdest": "ID:JP"
	},
	"host": location.host,
	"ip": "31.238.71.24",
	"machine": {
	"os": result.components.osCpu.value,
	"ram": 9663676416
	},
	"message": errorInfo.componentStack,
	"referer": "http://twitter.com/success/sergey-volkov",
	"request": "/",
	"response": 200,
	"tags": {
	"list": [ error ]
	},
	"timestamp": dt,
	"url": location.toString()
});
```

The full example of the implementation can be found [here](https://github.com/schett-net/snek-log-prototype/blob/main/website/src/pages/index.tsx).

## [](#-how-to-report-a-bug-or-request-a-feature)🐞 How to Report a Bug or Request a Feature

Have a bug or a feature request? Please first search for existing and closed issues. If your problem or idea is not
addressed yet, [please open a new issue](https://github.com/snek-at/jaen/issues/new/choose).

## [](#-how-to-contribute)🤝 How to Contribute
![GitHub last commit](https://img.shields.io/github/last-commit/snek-at/jaen)
![GitHub issues](https://img.shields.io/github/issues-raw/snek-at/jaen)
![GitHub closed issues](https://img.shields.io/github/issues-closed-raw/snek-at/jaen?color=green)

Please read through our
[contributing guidelines](https://github.com/snek-at/jaen/blob/master/CONTRIBUTING.md). Included are
directions for opening issues, coding standards, and notes on development.

All code should conform to the [Code Guide](https://github.com/snek-at/tonic/blob/master/STYLE_GUIDE.md), maintained by
[snek-at](https://github.com/snek-at).

## [](#-thanks)💚 Thanks

We do not have any external contributors yet, but if you want your name to be here, feel free
to [contribute to our project](#contributing).

## [](#-creators)💼 Creators

<table border="0">
  <tr>
	  <td>
      <a href="https://github.com/schettn">
        <img src="https://avatars.githubusercontent.com/schettn?s=100" alt="Avatar schettn">
      </a>
    </td>
    <td>
      <a href="https://github.com/kleberbaum">
        <img src="https://avatars.githubusercontent.com/kleberbaum?s=100" alt="Avatar kleberbaum">
      </a>
    </td>
    <td>
      <a href="https://github.com/pinterid">
        <img src="https://avatars.githubusercontent.com/pinterid?s=100" alt="Avatar pinterid">
      </a>
    </td>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/schettn">Nico Schett</a>
    </td>
    <td>
      <a href="https://github.com/kleberbaum">Florian Kleber</a>
    </td>
    <td>
      <a href="https://github.com/pinterid">David Pinterics</a>
    </td>
  </tr>
</table>

## [](#-faqs)🤔 FAQs

## [](#-copyright-and-license)📝 Copyright and License

![GitHub repository license](https://img.shields.io/badge/license-EUPL--1.2-blue)

Use of this source code is governed by an EUPL-1.2 license that can be found
in the LICENSE file at https://snek.at/license

<!--
  SPDX-FileCopyrightText: Copyright © 2021 snek.at
  SPDX-License-Identifier: EUPL-1.2
  Use of this source code is governed by an EUPL-1.2 license that can be found
  in the LICENSE file at https://snek.at/license
-->
