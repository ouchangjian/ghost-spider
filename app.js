var http = require('http'),
	cheerio = require('cheerio'),
	urlInit = "http://www.vget.net",
	pageTotal = 5;
	
//wget��������ץȡ��ҳhtml
//@url ��ҳ����
//@callback �ص�����������html�ַ���	
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

//��ȡ��������
function getTitle(htmlData){
	var $ = cheerio.load(htmlData);
	var title = $('.post-title');
	for(var i=0;i<title.length;i++){
		//console.log(title.eq(i).find('a').html() + ":" + title.eq(i).find('a').attr('href'))
		wget(urlInit+title.eq(i).find('a').attr('href'),getContent);
	}
}

//��ȡ��������
function getContent(htmlData){
	var $ = cheerio.load(htmlData);
	var title = $('.post-title');
	var content = $('.post-content');
	console.log(title.html()+":"+content.html())
	console.log("===============")
	console.log("http://vget.net")
	console.log("===============")
}

//������վ����ѭ��
for(var i=1;i <= pageTotal ;i++){
	wget(urlInit+'/page/'+i+'/',getTitle);
}
