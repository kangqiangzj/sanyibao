var gulp =require("gulp");
var connect =require("gulp-connect");
var sass = require("gulp-sass")
gulp.task("server",function(){
	connect.server({
		root:["./"],
		port:8026,
		livereload:true
	})
})
gulp.task("copyHtml",function(){
	gulp.src("html/**/*").pipe(connect.reload())
})
gulp.task("indexhtml",function(){
	gulp.src("indexhtml").pipe(connect.reload())
})
gulp.task("copyCss",function(){
	gulp.src("css/*.css").pipe(connect.reload())
})
gulp.task("copyScss",function(){
	gulp.src("sass/page.scss").pipe(sass()).pipe(gulp.dest("css")).pipe(connect.reload())
})
gulp.task("watch",function(){
	gulp.watch("html/**/*",["copyHtml"])
	gulp.watch("css/**/*",["copyCss"])
	gulp.watch("index.html",["indexhtml"])
	gulp.watch("sass/page.scss",["copyScss"])
})

gulp.task("default",["server","watch"],function(){
	console.log("success")
})
