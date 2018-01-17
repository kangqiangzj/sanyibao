var gulp=require("gulp")
var connect=require("gulp-connect")
var sass=require("gulp-sass")
gulp.task("server",function(){
	connect.server({
		root:["./"],
		port:8010,
		livereload:true
	})
})
gulp.task("copyhtml",function(){
	gulp.src("html/**/*").pipe(connect.reload())
})
gulp.task("indexhtml",function(){
	gulp.src("index.html").pipe(connect.reload())
})
gulp.task("copycss",function(){
	gulp.src("css/*.css").pipe(connect.reload())
})
gulp.task("watch",function(){
	gulp.watch("html/**/*",["copyhtml"])
	gulp.watch("css/**/*",["copycss"])
	gulp.watch("index.html",["indexhtml"])
	gulp.watch("scss/page.scss",["copyScss"])
})
gulp.task("copyScss",function(){
	gulp.src("scss/page.scss").pipe(sass()).pipe(gulp.dest("css")).pipe(connect.reload())
})
gulp.task("default",["server","watch"],function(){
	console.log("success")
})