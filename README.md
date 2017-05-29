# Overlapr-server
NodeJS server for the [Overlapr Android app]. Offers API routes for uploading PAF files & result files containing highlight coordinates and sorting option for each chart. Also offers an API route for downloading files created on the server by parsing the uploaded PAF files.

The server is backed by a MongoDB NoSQL database on a remote server, hosted by [mLab]. 

## Routes

| URI          | Method | Description                                                                                   |
|--------------|--------|-----------------------------------------------------------------------------------------------|
| /api/charts  | GET    | Returns the first chart file which has not been downloaded yet, 404 response otherwise        |
| /api/pafs    | POST   | Receives a PAF file, stores it's URI in the appropriate table and starts the Java parser      |
| /api/results | POST   | Receives the results file from an Android device and stores it's URI in the appropriate table |

[Overlapr Android app]: https://github.com/ffloreani/Overlapr
[mLab]: https://mlab.com
