var http = require('http'),
	cheerio = require('cheerio'),
	urlInit = "http://www.vget.net",
	pageTotal = 5;
	
//wget函数负责抓取网页html
//@url 网页链接
//@callback 回调函数，返回html字符串	
function wget(url,callback){
	http.get(url,function(res){
        var size = 0;
        var chunks = [];
        res.on('data',function(chunk){
            size += chunk.length;
            chunks.push(chunk);
        })
        res.on('end',function(){
			//console.log(Buffer.concat(chunks,size).toString());
            callback( Buffer.concat(chunks,size).toString() );            
        })
	}).on('error',function(e){
			console.log('Got error:'+e.message);
	})	
}

//获取文章链接
function getTitle(htmlData){
	var $ = cheerio.load(htmlData);
	var title = $('.post-title');
	for(var i=0;i<title.length;i++){
		//console.log(title.eq(i).find('a').html() + ":" + title.eq(i).find('a').attr('href'))
		wget(urlInit+title.eq(i).find('a').attr('href'),getContent);
	}
}

//获取文章内容
function getContent(htmlData){
	var $ = cheerio.load(htmlData);
	var title = $('.post-title');
	var content = $('.post-content');
	console.log(title.html()+":"+content.html())
	console.log("===============")
	console.log("http://vget.net")
	console.log("===============")
}

//根据网站链接循环
for(var i=1;i <= pageTotal ;i++){
	wget(urlInit+'/page/'+i+'/',getTitle);
}
