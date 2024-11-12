# Carbon UI Template

This repo contains the base architecture for a robust client rendered single page application built on React JS and typescript.
Applications built on this template can be packaged into electron applications. Other base technologies used are
Vite JS, Redux Tool Kit, RTKquery and Flowbite-React. The application has a left navigation bar listing pages to be
navigated to.

### General
The app resides almost entirely in src/renderer. main.ts exists only to start the electron process and open a window
requesting the site from the vite server. Exports within the renderer directory are exported from the directory in
which they reside via index.ts files up to the respective top level folder in the renderer directory. Imports are handled
by importing from @/top-level-dir. for instance to import foo which resides in directory components/fuz/baz, merely import 
from @/components. When exporting via the established pattern, there is no need for relative imports. 

The left navigation bar's buttons are hooked up to the react-router which handles page navigation. the router resides
in routes/AppNavigator.tsx and the page paths exist in route-constants.ts

### API Calls
API calls are handled via RTKquery, whose base configuration resides in /api/cadt/v1/index.js. It is recommended to
retain this directory structure and configuration as it allows for dynamic host configuration which is already baked
into this template. The 'cadt' directory can be renamed to whatever is appropriate.
endpoints are defined in the /v1 directory alongside index.ts. 

The endpoints define hooks which mutate or query their resources. There are 2 illustrative examples of how to 
define RTKQuery endpoints in the /v1 directory. Note that when exporting a hook from an endpoint, the name to export 
is prepended with use, and appended with either query or mutation. To export resource query hook foo, the export name 
will need to be useFooQuery. For mutation hook foo it will need to be useFooMutation. 

projects.api.ts can be deleted as it is only use in other sample code that will be deleted, but it is highly
recommended that system.api.ts be kept and the resource url's changed to the /health equivalent for the backend the
app will be connected to. the application uses these system hooks to determine if the backend is available or not.
removing it will require refactoring, and it will likely end-up being reimplemented over the course of development.

### Components
Please see the next section on theming details and implementation

This UI is built on Flowbite-React tailwind CSS components. Flowbite component theming is handled by importing the 
flowbite components into /components/proxy, then re-exporting the components with a flowbite theme applied. 
If a component needs to be themed, the theme should be declared and set in the proxy component. Page and
component layouts are achieved via tailwind CSS (with few exceptions). It is recommended to keep it that way. The style
prop is only set in circumstances when tailwind classes would not suffice. Flowbite components should only be imported
via @/components. Importing directly from flowbite will introduce inconsistent theming since the theming is set in the
/components/proxy components. Note that there is a theme selector component which toggles between the tailwind defined 
light mode and dark mode provided by flowbite.

Forms are handled with formik. the forms themselves can be found in components/blocks/forms and prebuild form components
can be found in components/form.

### Theme
Preface - Flowbite-React Documentation: https://flowbite-react.com/docs/components/accordion (See component list in left nav)

The Flowbite component library is built on tailwind css classes, but in most cases the components will not react to a
class or classname being set. To customize the appearance of a flowbite component, a theme will need to be set on the
component (see the next section on where to do this in the codebase). In the flowbite documentation at the bottom of each component page the theme
that defines the component is provided. The theme is an object with each prop representing a sub-component of the component to
style and the value being a string of the tailwind classes that define the component. When styling a component the entire tailwind string
should be copied, and generally only colors should be changed. At the time of writing any color prefaced with dark: should
NOT be changed. Additionally, colors should only be changed if they're set from the global custom colors. More in the next 
paragraph. An example theme can be found in components/proxy/sidebar.tsx

Global theme colors are provided via an optional colors.json file that the app attempts to fetch. if it exists, the colors
are set via global css properties defined in App.css. To define new colors, the new color must be defined in:
- App.css
- tailwind.config.js
- colors.json

From there the color CSS property should be declared in the components that need to apply it.

### Patterns
The sample patterns in this application are what allow it to be so robust. There are 2 general patterns employed, one
pattern for displaying data and another pattern for initiating backend operations (or anything else). 
The pattern for displaying data has 3 general steps:
- the data is fetched with RTKquery hooks at the page level, and all display and organization options are set
- the data and options are passed to a data organization component which defines the structure and configuration
of how to display the data
- the structure, data, and options are passed to a common base component responsible for rendering the data

This pattern is exemplified by pages/TokensPage.tsx, components/blocks/tables/ProjectsListTable.tsx, and 
components/layout/Datatable.tsx. TokensPage.tsx fetches the data via the RTKQuery hooks, then passes the data,
filters, and sorts to ProjectsListTable.tsx, which defines the structure (columns) of the table and passes the structure and data
down to the generalized DataTable.tsx. The project table and data table are directly controlled at the page level and
make no assumptions about the data or how to display it. The data table can be used in any capacity for any table and
any data set.

For all other operations that don't involve fetching and sorting data, a pattern of self-contained components which
pull date directly from the api hooks and are parent component-agnostic is used. Prop drilling is explicitly avoided.

For deep-linking components and state, the hooks/ directory contains hooks for manipulating query params and url hashes.
these hooks operate much like the useState hook with additional arguments. pages/TokensPage.tsx has examples for
how to use these hooks.