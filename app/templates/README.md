# <%= project %>

## Developing

<%= project %> is a static web application. It uses Gulp as a build tool to compile Sass. Gulp also does all the nice things you expect from production-ready code, concatenating and minifying files, prefixing CSS, and optimizing images.

Development dependencies are NPM, Bower, and Gulp.

Clone the project and `npm install && bower install` to resolve dependencies.

#### BrowserSync

Gulp compiles Sass to the `dist` directory and BrowserSync makes a local server available for testing.

```bash
gulp serve
```

## Building

The default Gulp task lints the code and builds the source files to the `/dist` directory.

```bash
gulp
```

From there, you can publish to GitHub pages or a webserver.

```bash
git subtree push --prefix dist origin gh-pages
```