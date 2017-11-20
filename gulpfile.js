'use strict';

var gulp = require('gulp'),
		pug = require('gulp-pug'),
		sass = require('gulp-sass'),
		browsersync = require('browser-sync'),
		concat = require('gulp-concat'),
		uglify = require('gulp-uglifyjs'),
		cssnano = require('gulp-cssnano'),
		rename = require('gulp-rename'),
		del = require('del'),
		imagemin = require('gulp-imagemin'),
		pngquant = require('imagemin-pngquant'),
		cache = require('gulp-cache'),
		spritesmith = require("gulp.spritesmith"),
		plumber = require("gulp-plumber"),
		notify = require("gulp-notify"),
		newer = require("gulp-newer"),
		autoprefixer = require('gulp-autoprefixer');

// Работа с Sass
gulp.task('sass', function () {
	return gulp.src('dev/static/sass/*.sass')
			.pipe(sass({outputStyle: 'compressed'}))
			.on("error", notify.onError(function(error) {
				return "Message to the notifier: " + error.message;
			}))
			.pipe(autoprefixer({
				browsers: ['last 2 versions'],
				cascade: false
			}))
			.pipe(gulp.dest('dev/static/css'))
			.pipe(browsersync.reload({
				stream: true
			}));
});

// Работа с Pug
gulp.task('pug', function() {
	return gulp.src('dev/pug/pages/*.pug')
			.pipe(plumber())
			.pipe(pug({
				pretty: true
			}))
			.on("error", notify.onError(function(error) {
				return "Message to the notifier: " + error.message;
			}))
			.pipe(gulp.dest('dev'));
});

// Browsersync
gulp.task('browsersync', function() {
	browsersync({
		server: {
			baseDir: 'dev'
		},
		notify: false
	});
});

// Работа с JS
gulp.task('scripts', function() {
	return gulp.src(['dev/static/js/*.js'])
			.on("error", notify.onError(function(error) {
				return "Message to the notifier: " + error.message;
			}))
			.pipe(browsersync.reload({
				stream: true
			}));
});

// Сборка спрайтов PNG
// gulp.task('cleansprite', function() {
// 	return del.sync('dev/static/img/sprite/sprite.png');
// });
// gulp.task('spritemade', function() {
// 	var spriteData =
// 		gulp.src('dev/static/img/sprite/*.*')
// 			.pipe(spritesmith({
// 				imgName: 'sprite.png',
// 				cssName: '_sprite.styl',
// 				padding: 15,
// 				cssFormat: 'stylus',
// 				algorithm: 'binary-tree',
// 				cssTemplate: 'stylus.template.mustache',
// 				cssVarMap: function(sprite) {
// 					sprite.name = 's-' + sprite.name;
// 				}
// 			}));
// 	spriteData.img.pipe(gulp.dest('dev/static/img/sprite/')); // путь, куда сохраняем картинку
// 	spriteData.css.pipe(gulp.dest('dev/static/stylus/')); // путь, куда сохраняем стили
// });
// gulp.task('sprite', ['cleansprite', 'spritemade']);

// Слежение
gulp.task('watch', ['browsersync', 'sass', 'scripts'], function() {
	gulp.watch('dev/static/sass/**/*.sass', ['sass']);
	gulp.watch('dev/pug/**/*.pug', ['pug']);
	gulp.watch('dev/*.html', browsersync.reload);
	gulp.watch('dev/static/js/*.js', ['scripts']);
});

// Очистка папки сборки
gulp.task('clean', function() {
	return del.sync('production');
});

// Оптимизация изображений
gulp.task('img', function() {
	return gulp.src(['dev/static/img/**/*', '!dev/static/img/sprite/*'])
			.pipe(cache(imagemin({
				progressive: true,
				use: [pngquant()]
			})))
			.pipe(gulp.dest('production/static/img'));
});

// Сборка проекта
gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function() {
	var buildCss = gulp.src('dev/static/css/*.css')
			.pipe(gulp.dest('production/static/css'));

	// var buildFonts = gulp.src('dev/static/fonts/**/*')
	// 		.pipe(gulp.dest('production/static/fonts'));

	var buildJs = gulp.src('dev/static/js/**.js')
			.pipe(gulp.dest('production/static/js'));

	var buildHtml = gulp.src('dev/*.html')
			.pipe(gulp.dest('production/'));

	var buildImg = gulp.src('dev/static/img/**/*')
			.pipe(imagemin({
				progressive: true,
				use: [pngquant()]
			}))
			.pipe(gulp.dest('production/static/img/'));
});

// Очистка кеша
gulp.task('clear', function() {
	return cache.clearAll();
});

// Дефолтный таск
gulp.task('default', ['watch']);