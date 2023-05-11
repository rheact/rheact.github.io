# RHEACT
## The open source lab safety tool

RHEACT is a lab safety tool developed at Purdue University, CISTAR with guidance of Prof. Ray Mentzer and Corteva.

# Brief Development Doc
## Setup
- Make sure to have `conda`, `yarn` installed.
- Create a conda virtual environment using `environment.yaml`
- To start the backend service, run `./dev.sh`
- To start the frontend service, run `REACT_APP_BACKEND_URL=http://127.0.0.1:8000 yarn start` to connect to the local backend service or just `yarn start` to connect with the backend service deployed on Heroku.

## Deployment
- The app is currently hosted on Heroku.
- The app will automically be updated and deployed whenever you push the code to github.
- It's possible that sometimes the app is experiencing downtime, you could check application logs `heroku logs`, check the process information `heroku ps` and boot the app `heroku scale web=1` (More details on <a href="https://devcenter.heroku.com/articles/application-offline" target="_blank">https://devcenter.heroku.com/articles/application-offline</a>).

## Backend
Programming languages/frameworks used: `Python`, `FastAPI`
### app
This folder contains all the API handlers
### data
This folder contains all excel files needed for calculations and lookups. Rheact doesn't have a database for now, so this folder serves as a 'database'.
### helpers
This folder mainly contains some helper functions related to unit conversions
### models
Return types of some functions are defined here
### services
This folder contains the main calculation logic
- calculation_block: basis for heat of reaction, heat capacity of mixtures (cp) and final report calculations
- cameo: scrapes the CAMEO Chemicals website and consturcts the cameo matrix
> __Note__ In order to run the scraper locally, you may need to download the `chromedriver-binary` package locally (More details on <a href="https://anaconda.org/conda-forge/python-chromedriver-binary" target="_blank">https://anaconda.org/conda-forge/python-chromedriver-binary</a> and <a href="https://sites.google.com/chromium.org/driver/" target="_blank">https://sites.google.com/chromium.org/driver/</a>). Always make sure the version of the package matches with the version of your Chrome browser. Then in `crawler.py`, add `import chromedriver_binary` and change `driver = webdriver.Chrome(options=chrome_options)` to `driver = webdriver.Chrome(executable_path=PATH_TO_DRIVER, options=chrome_options)`. Do not include these two lines of code when you push the code to github.
- database: services for calculation block related functions as well as chem_table data
- heat_of_formation: calculates chemicals' heat of formation in THOR calculation tool.
- hmatrix: generates hazard matrix
- moc: generates the chemical hazard assessment in MOC guide
- pac: calculates Protective Action Criteria (PAC) toxicity rating
- sds: contains Safety Data Sheet (SDS) parsers

## Frontend
Programming languages/frameworks used: `TypeScript`, `React.js`, `Redux`, `Reactstrap` (<a href="https://reactstrap.github.io/" target="_blank">Reactstrap</a>)
### data
This folder contains json files for PPE and MOC questionaires
### layout
This folder contains some common components
### model
This folder contains definations of custom types
### pages
This folder contains all the fronend pages
### store
This folder contains Redux reducers
### units
This folder contains unit lists for drop-down menus


