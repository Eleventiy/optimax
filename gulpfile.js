'use strict';

var gulp = require('gulp'),
		sass = require('gulp-sass'),
		browserSync = require('browser-sync'),
		imagemin = require('gulp-imagemin'),
		cache = require('gulp-cache'),
		del = require('del'),
		runSequence = require('run-sequence'),
		autoprefixer = require('gulp-autoprefixer');

// Development Tasks
// -----------------

// Sass task
gulp.task('sass', function() {
	return gulp.src('app/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer(['last 5 versions'], { cascade: true}))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({ stream: true }))
});

// // Scripts
// gulp.task('scripts', function() {
// 	return gulp.src('app/js/**/*.js')
// 		.pipe(concat('scripts.min.js'))
// 		.pipe(uglify())
// 		.pipe('app/js')
// });

// Browser sync
gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'app'
		},
		notify: false
	})
});

// Images optimization
gulp.task('img', function() {
	return gulp.src('app/img/**/*.+(png|jpg|gif|svg)')
		.pipe(cache(imagemin({
			interlaced: true
		})))
		.pipe(gulp.dest('dist/img'))
});

// Copying fonts
gulp.task('fonts', function() {
	return gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'))
});

// Cleaning
gulp.task('clean', function() {
	return del.sync('dist').then(function(callback) {
		return cache.clearAll(callback);
	});
});

// Clean "dist" folder
gulp.task('clean:dist', function() {
	return del.sync(['dist', '!dist/images', '!dist/images/**/*']);
});

// Watchers
gulp.task('watch', function() {
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/*.js', browserSync.reload);
});

// Build Sequences
// ---------------

gulp.task('default', function(callback) {
	runSequence(['sass', 'browserSync'], 'watch',
		callback
	)
});

gulp.task('build', function(callback) {
	runSequence(
		'clean:dist',
		'sass',
		['img', 'fonts'],
		callback
	)
});
