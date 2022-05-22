const {createProxyMiddleware}=require('http-proxy-middleware')
module.exports=function(app){
    // app.use(
    //     proxy('/api',{
    //         target:'http://8.134.217.84:7777',
    //         changeOrigin:true,
    //         pathRewrite:{'^/api':''}
    //     }),
    //     proxy('/api1',{
    //         target:'http://8.134.217.84:10000',
    //         changeOrigin:true,
    //         pathRewrite:{'^/api1':''}
    //     })

    // )
    app.use(createProxyMiddleware("/api1", {
        target: "http://8.134.217.84:7777",//配置你要请求的服务器地址，代理后的请求网址
        pathRewrite: {'^/api1': ''},//路径重写
        changeOrigin: true,//是否改变请求头
    })),

    app.use(createProxyMiddleware("/api2", {
        target: "http://8.134.217.84:10000", //配置你要请求的服务器地址，代理后的请求网址
        pathRewrite: {'^/api2': ''}, //路径重写
        changeOrigin: true, // 是否改变请求头
    }))

}




