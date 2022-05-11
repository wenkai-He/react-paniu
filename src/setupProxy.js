const {createProxyMiddleware}=require('http-proxy-middleware')
module.exports=function(app){
    app.use(
        '/api',
        createProxyMiddleware({
            target:'http://8.134.217.84:7777',
            changeOrigin:true,
            pathRewrite: {
                "^/api": ""
              }
        })
    )
}