const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/Main.js', 'public/js')
    .react()
    .sass('resources/sass/app.scss', 'public/css');


mix.copy('resources/css/style.css','public/css');
mix.copy('resources/css/sideNav.css','public/css');
mix.copy('resources/css/responsive.css','public/css');
mix.copyDirectory('resources/images','public/images');
