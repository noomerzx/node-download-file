# Node Downloader
============
> A Node.js CLI to download file from any sources with any protocols
<br>
> You can extend any protocols by adding connector and register without modify any code.

----------------------------------------
## Dependencies
* axios
* basic-ftp

----------------------------------------
## Project Structure
* <b>config</b>: config file (eg. destination path for download)
* <b>download</b>: destination location
* <b>providers</b>: ftp and http provider to serve file for test
* <b>services</b>: "download service" that use connector to connect to any protocols
* <b>services/connectors</b>: connector to connect with any protocols (given http, ftp) ** extensible
* <b>utils</b>: utility file (eg. generate file)
* <b>index.js</b>: main program

----------------------------------------
## How to extend another protocols ?
> You can add more support protocols by adding you connector in "services/protocols/xxx.connector.js"
> Then register your connector in "services/protocols/index.js"
> Finished !! Run the program with extended protocols source.

----------------------------------------
## Usage

``` bash
# run http server to serve file
npm run serve:provider:http

# run ftp server to serve file
npm run serve:provider:ftp

# generate file to serve in server above
npm run generate:file {lineofstring}

# run unit test
npm run test:unit

# run integration test
npm run test:integration

# running the program
npm run start:download {uri_source} {uri_source} {uri_source}