const path = require( 'path' );
const gulp = require( 'gulp' );
const pump = require( 'pump' );
const print = require( 'gulp-print' ).default;
const rimraf = require( 'rimraf' );
const uglify = require( 'gulp-uglify-es' ).default;

const css = require('gulp-postcss');
const prefix = require('autoprefixer');
// const babel = require( 'gulp-babel' );

// const less = require('gulp-less');
// const rename = require("gulp-rename");
// const sourcemaps = require('gulp-sourcemaps');

const tsc = require( 'gulp-typescript' );



//===================================================
//                    Frontend
//===================================================

gulp.task( 'clean-frontend', function ( cb ) {
  rimraf( './frontend/dist/*', cb );
});

// const babelconf = { 
//   presets:['es2015'],
//   sourceMaps: false, 
//   comments: false, 
//   code: true  
//   };

gulp.task('publish-js', [ 'clean-frontend' ], function ( cb ) {
  const tsProj = tsc.createProject( 'tsconfig.frontend.json' );
  const srcFiles = ['./frontend/src/scripts/*.ts'];
  pump([ 
    gulp.src( srcFiles ),
    tsProj(),
    // babel( babelconf ),
    uglify(),
    gulp.dest('./frontend/dist/scripts'),
  ], cb);
});

gulp.task( 'publish-html', [ 'clean-frontend' ], function ( cb ) {
  const srcFiles = ['./frontend/src/**/*.html'];
  pump([
    gulp.src( srcFiles ),
    gulp.dest('./frontend/dist'),
  ], cb);
});

gulp.task( 'publish-images', [ 'clean-frontend' ], function ( cb ) {
  const srcFiles = [ './frontend/src/assets/*' ];
  pump([
    gulp.src( srcFiles ),
    gulp.dest( './frontend/dist/assets' ),
  ], cb);
});

gulp.task('publish-css', [ 'clean-frontend' ], function (cb) {
  const srcFiles = ['./frontend/src/**/*.css'];
  pump([
    gulp.src( srcFiles ),
    css([ prefix() ]),
    gulp.dest('./frontend/dist'),
  ], cb);
});
/*
gulp.task('publish', [ 'publish-js', 'publish-html', 'publish-images', 'publish-css' ]);
gulp.task('code', [ 'publish-js' ]);
gulp.task('default', [ 'publish']);
*/

//===================================================
//                    Backend
//===================================================

gulp.task( 'clean-backend', function ( cb ) {
  rimraf( './backend/dist/*', cb );
});


gulp.task( 'build-js', [ 'clean-backend' ], function ( cb ) {
  const tsProj = tsc.createProject( 'tsconfig.backend.json' );
  const srcFiles = ['./backend/src/**/*.ts'];
  pump([ 
    gulp.src( srcFiles ),
    tsProj(),
    uglify(),
    gulp.dest('./backend/dist'),
  ], cb);
});

gulp.task( 'build-frontend', [ 'publish-html', 'publish-images', 'publish-css', 'publish-js' ] );
gulp.task( 'build-backend', [ 'build-js' ] );

gulp.task( 'default', [ 'build-backend', 'build-frontend' ] );