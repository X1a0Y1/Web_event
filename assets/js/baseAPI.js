// 调用.ajax&post方法前先调用
$.ajaxPrefilter(function(options){
options.url='http://ajax.frontend.itheima.net'
+options.url
})

