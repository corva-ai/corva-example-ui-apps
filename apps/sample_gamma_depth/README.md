# Sample Gamma Depth

## Project Overview

In this project our goal is to display Depth vs Gamma Ray data for a specific asset. This version of the app fetches data from a static collection by asset id. Future versions of this app will be subscribed to a dataset for continuous live updates.

This data is then formatted into an accepted Highcharts data format which can be an array of cardinal points as either `[x, y]` or `{name, x, y}`. For our use case we're simply using the former x being our measured depth value and y being our gamma ray value.

To make changes to the chart, you would simple update the options object in the GammaChart component. Here you can edit the chart's type, appearance, and series data.

In the app's settings there are options to change the chart's default x and y min and max scale. Following this example, we can also update different chart options by extending our settings and passing them to the chart.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:8080](http://localhost:8080/) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Bundles the app into static files for production.

### `yarn zip`

Bundles the app into ZIP file in app root directory

### `yarn bump`

Updates the app version
