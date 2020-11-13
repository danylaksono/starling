# Starling v.2

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.0.

## NOTES ON DEVELOPMENT

Due to generally unavailable support between Angular 8, Openlayers 5 and Leaflet Sidebar V2 used in this webGIS (see [this issue](https://github.com/Turbo87/sidebar-v2/issues/143)), you need to manually insert this line to ol/control.js (as per stackoverflow):

`export {default as Sidebar} from 'sidebar-v2/js/ol5-sidebar.js';`

also add this line to the component's header:

`import { Sidebar } from 'ol/control.js';`

This way, the sidebar could be used as such:
    `var sidebar = new Sidebar({ element: 'sidebar', position: 'right' });`
    `var scale = new Control.ScaleLine;`
    `this.map.addControl(sidebar);`




## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
