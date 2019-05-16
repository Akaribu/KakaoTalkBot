var D = require("DBManager.js")("D"); 
	
function ev(r){
		try {  
                r.replier.reply(String(eval(r.msg.substring(1))));
                return;
            	}
 	
    		catch (e) {
        	r.replier.reply(e + "\n" + e.stack);	
    		}
	}	
String.prototype.cut=function (line) {
    var str = this.toString();
    str = str.split("\n");
    str[line - 1] += String.fromCharCode(8237).repeat(500);
    str = str.join("\n");
    return str;
}
Flag=(function(){
      var list={};
      var Flag={};
      Flag.set=function(flag,room,value){
         if(list[flag]===undefined){ 
            list[flag]={};
            list[flag][room]=value;
         }else list[flag][room]=value;
      }
      Flag.get=function(flag,room){
         return (list[flag] && list[flag][room]) || 0;
      }
      return Flag;
   })();
	 Object.defineProperty(String.prototype,"XMLEncode",{
  	 value:function(){
     	 var res=""
         for(var i=0;i<this.toString().length;i++){
            res+="&#x"+java.lang.String.format("%04x",java.lang.Integer(this.toString().charCodeAt(i)))+";";
         }
         return res;
    	  }
	});
function lyric(r) {
    var replier = r.replier;
    var room = r.r;
    var sender = r.s;
    var msg = r.m;
    var str = r.msg.replace("/가사", "").trim();
    var title = str.includes("/") ? str.split("/")[0] : str;
    var artist = str.includes("-") ? str.split("-")[1] : "";
    var xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><SOAP-ENV:Envelope xmlns:SOAP-ENV=\"http://www.w3.org/2003/05/soap-envelope\"" + " xmlns:SOAP-ENC=\"http://www.w3.org/2003/05/soap-encoding\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" " + "xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:ns2=\"ALSongWebServer/Service1Soap\" xmlns:ns1=\"ALSongWebServer\" " + "xmlns:ns3=\"ALSongWebServer/Service1Soap12\"><SOAP-ENV:Body><ns1:GetResembleLyric2><ns1:stQuery><ns1:strTitle>" + title.XMLEncode() + "</ns1:strTitle><ns1:strArtistName>" + artist.XMLEncode() + "</ns1:strArtistName><ns1:nCurPage>0</ns1:nCurPage></ns1:stQuery>" + "</ns1:GetResembleLyric2></SOAP-ENV:Body></SOAP-ENV:Envelope>";
    var elems = org.jsoup.Jsoup.connect("http://lyrics.alsong.co.kr/alsongwebservice/service1.asmx").header("Content-Type", "text/xml;charset=utf-8").requestBody(xml).post().select("ST_GET_RESEMBLELYRIC2_RETURN");
    var strTitles = elems.select("strTitle").eachText().toArray();
    var strArtistNames = elems.select("strArtistName").eachText().toArray();
    var strLyrics = elems.select("strLyric").eachText().toArray();
    var length = strTitles.length;
    var res = "\"" + title + (artist ? ("/" + artist) : "") + "\" 검색결과" + "\n";
    for (var i = 0; i < 3 && i < str.length; i++) {
        res += "Lyric : " + (i + 1) + "\n" + strTitles[i] + "/" + strArtistNames[i] + "\n" + String(strLyrics[i]).replace(/\<br\>/g, "\n").replace(/\[\d\d:\d\d.\d\d\]/g, "") + "\n\n";
    }
    r.replier.reply(res.trim().cut(1));
}
function half(r){
	random = Math.floor(Math.random()*2);
	str=String(r.msg).substr(4);
	if(str!="홀" || str!="짝"){
		r.replier.reply("홀과 짝만 입력해주세요")
	}
	else{
	if(random==0){
		r.replier.reply(str+" 정답!")
	}
	else{
		r.replier.reply("땡!")
		}
	}
}
function intro(r){
	if(r.msg=="/기능 즉석복권"){
		r.replier.reply("10 네루를 사용해 복권을 뽑습니다.\n1등 : 200네루 1%\n2등 : 50네루 4%\n3등 : 30네루 6%\n4등 : 15네루 10%");
	   }
	if(r.msg=="/기능 부방장복권"){
		r.replier.reply("10 네루를 사용해 부방장 복권을 뽑습니다.\n부방장 당첨 확률 1% 당첨 시 하루 당 200 네루 지급 부방장은 2 명으로 2명인 상태에서 새로운 부방장이 뽑히면 첫번째로 부방장이 된 사람은 탄핵됩니다.");
	   }
	if(r.msg=="/기능 광란의밤"){
		r.replier.reply("말 그대로 광란의 밤입니다.\n매 주 금요일 오후 9시에서 토요일 오전 9시, 토요일 오후 9시에서 일요일 오전 9시, 매 공휴일 전날 오후 9시에서 오전 9시까지 진행 됩니다.\n이 시간 동안은 네루를 받을 확률이 30%가 되며 블랙잭, 홀짝 등의 게임에 참여 할 수 있습니다.");
	   }
}
function osirase(r){
	name=org.jsoup.Jsoup.connect("https://www.hinatazaka46.com/s/official/news/list?ima=0000&dy=201905").get().select("p.c-news__text").get(0).text();
	link = "www.hinatazaka46.com"+org.jsoup.Jsoup.connect("https://www.hinatazaka46.com/s/official/news/list?ima=0000&dy=201905").get().select("a").attr("href")
	r.replier.reply("최근 공지가 갱신되었습니다\n"+name+"\n"+link)
	
}
function pointgive(r){
		currentpoint=D.selectForArray("botpoint",null,"room=? and name=?",[r.room,r.sender])[0][2];
		random = Math.floor(Math.random()*101);
		give = Math.floor(Math.random()*31);
		currentpoint=D.selectForArray("botpoint",null,"room=? and name=?",[r.room,r.sender])[0][2];
			if(random > 98 && r.room=="46"){
				currentpoint+=give;
				D.update("botpoint",{"point":currentpoint},"name=?",r.sender);
				r.replier.reply(r.sender+"님 "+give+"네루 획득")
				}
		else{
   		return 1;
		}
	}

			function roomlottery(r){
        currentpoint = D.selectForArray("botpoint",null,"room=? and name=?",[r.room,r.sender])[0][2];
        random = Math.floor(Math.random()*101);
        num=Number(r.msg.substr(7));
        temp1=Number(0);
        temp2=Number(0);
        if(currentpoint-10>=0){
            if(r.msg=="/부방장복권"){
		currentpoint-=10;
          	D.update("botpoint",{"point":currentpoint},"name=?",r.sender);
                if(random>=99){
                r.replier.reply("부방장 당첨!");
                }
                else{
                r.replier.reply("꽝");
                }
            }
            else if(num>=1){
                if(currentpoint-10*num>=0){
                	for(var i=0; i<num; i++){
                		currentpoint-=10;
                		D.update("botpoint",{"point":currentpoint},"name=?",r.sender);
                		random1 = Math.floor(Math.random()*101);
                    	if(random1>=99){
                        	temp1+=1;
                        	}
                        	else{
                        	temp2+=1;
                        	}
                	}
                    r.replier.reply("당첨 횟수 : "+temp1+"회\n꽝 :"+temp2+"회");
                    if(temp1>=1){
                        r.replier.reply("축하합니다! "+r.sender+"님이 부방장에 당첨 되었습니다.");
                    }
                }
               else{
                	r.replier.reply("네루가 부족합니다")  
               }
               }
        }
        
        else{
            r.replier.reply("네루가 부족합니다");
        }
	      return;
}
function pointlottery(r){
		currentpoint = D.selectForArray("botpoint",null,"room=? and name=?",[r.room,r.sender])[0][2];
		        random = Math.floor(Math.random()*101);
		        num=Number(r.msg.substr(6));
		      	temp1=Number(0);
		      	temp2=Number(0)
		        temp3=Number(0)
		       	temp4=Number(0)
		       	temp5=Number(0)
		        if(currentpoint-10>=0){
		            if(r.msg=="/즉석복권"){
				currentpoint-=10;
           			D.update("botpoint",{"point":currentpoint},"name=?",r.sender);
		                if(random>=99){
		                r.replier.reply("1등 당첨!");
		                currentpoint+=200
		                D.update("botpoint",{"point":currentpoint},"name=?",r.sender);
		                }
		                else if(random>=96){
		                r.replier.reply("2등 당첨!");
		                currentpoint+=50
		                D.update("botpoint",{"point":currentpoint},"name=?",r.sender);
		                }
		                else if(random>=90){
		                r.replier.reply("3등 당첨!");
		                currentpoint+=30
		                D.update("botpoint",{"point":currentpoint},"name=?",r.sender);
		                }
		                else if(random>=80){
		                r.replier.reply("4등 당첨!");
		                currentpoint+=15
		                D.update("botpoint",{"point":currentpoint},"name=?",r.sender);
		                }
		                else
		                {
		                r.replier.reply("꽝");
		                }
		            }
		            else if(num>=1){
		            if(currentpoint-10*num>=0){
				    for(var i=0; i<num; i++){
		                    	currentpoint-=10;
		            	    	D.update("botpoint",{"point":currentpoint},"name=?",r.sender);
				    	random1 = Math.floor(Math.random()*101);
				    	if(random1>=99){
		                    	temp1+=1;
		                    	currentpoint+=200
		                    	D.update("botpoint",{"point":currentpoint},"name=?",r.sender);
		                    	}
		                    	else if(random1>=96){
		                    	temp2+=1;
		                    	currentpoint+=50
		                    	D.update("botpoint",{"point":currentpoint},"name=?",r.sender);
		                    	}
		                    	else if(random1>=90){
		                    	temp3+=1;
		                    	currentpoint+=30
		                    	D.update("botpoint",{"point":currentpoint},"name=?",r.sender);
		                    	}
		                    	else if(random1>=80){
		                    	temp4+=1;
		                    	currentpoint+=15
		                    	D.update("botpoint",{"point":currentpoint},"name=?",r.sender);
		                    	}
		                    	else{
		                    	temp5+=1;
		                    	}
		            	
			     	   }
		            	r.replier.reply("1등 당첨 횟수 : "+temp1+"회\n2등 당첨 횟수 : "+temp2+"회\n3등 당첨 횟수 : "+temp3+"회\n4등 당첨 횟수 : "+temp4+"회\n꽝: "+temp5+"회")
		             }
		            
		            else{
			    r.replier.reply("네루가 부족합니다");
			   }
		       }
		        }
		        else{
		            r.replier.reply("네루가 부족합니다");
		        }
		    return;
		}
function botpoint(r){
	if(D.selectForArray("botpoint","name","name=?",r.sender) == r.sender)
	{return 0;}
	else {D.insert("botpoint",{room : r.room, name:r.sender, point:0})}}
function pointcheck(r){
	currentpoint=D.selectForArray("botpoint",null,"room=? and name=?",[r.room,r.sender])[0][2];
	check=D.selectForArray("botpoint",null,"room=? and name=?",[r.room,r.sender])[0][2];
	list=D.selectForString("botpoint",null,"room=?",[r.room]);
	if(r.msg=="/조회"){r.replier.reply(r.sender+"님은 "+check+"네루를 가지고 있습니다!");}
	else if(r.msg=="/목록"){
		if(currentpoint-5>=0){
        	currentpoint-=5;
        	D.update("botpoint",{"point":currentpoint},"name=?",r.sender);
        	r.replier.reply(list);
        	}
        	else if(currentpoint-5<0){r.replier.reply("네루가 부족합니다")}
	}
}
		

function blankFunc(r){}
function time() {
    var today = new Date();
    var dayNames = ["(일요일)", "(월요일)", "(화요일)", "(수요일)", "(목요일)", "(금요일)", "(토요일)"];
    var day = dayNames[today.getDay()];
    var year = today.getFullYear(), month = today.getMonth() + 1, date = today.getDate(), hour = today.getHours(), minute = today.getMinutes(), second = today.getSeconds();
    ampm = hour >= 12 ? "PM" : "AM";
    hour1 = hour % 12;
    hour1 = hour1 < 10 ? "0" + hour1 : hour1;
    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;
    var now = year + "년 " + month + "월 " + date + "일 " + day + " " + hour1 + ":" + minute + ":" + second + " " + ampm;
    return {now: now, year: year, month: month, date: date, day: day, hour: hour, minute: minute, second: second, ampm: ampm, hour1: hour1};
}
function reload(r) {
    try {
        if (r.sender == "니부아카리" || r.room == "건의방") {
            reloadcheck = 1;
            reloadtime = new Date().getTime();
            var Timer = new Date();
            file = "storage/emulated/0/kbot/response.js";
           checksum = org.jsoup.Jsoup.connect("https://github.com/Akaribu/KakaoTalkBot/commits/master").get().select("div.repository-content>a").attr("href").split('commit/')[1];
conn = new java.net.URL("https://raw.githubusercontent.com/Akaribu/KakaoTalkBot/" + checksum + "/response.js").openConnection();
            br = new java.io.BufferedReader(new java.io.InputStreamReader(conn.getInputStream()));
            str = "";
            tmp = null;
            while ((tmp = br.readLine()) != null) {
                str += tmp + "\n";
            }
            var filedir = new java.io.File(file);
            var bw = new java.io.BufferedWriter(new java.io.FileWriter(filedir));
            bw.write(str.toString());
            bw.close();
            var time = (new Date() - Timer) / 1000;
            r.replier.reply("파일저장 완료 / " + time + "s\n" + new Date());
            Api.reload();
            reloadcheck = 0;
            var time = (new Date() - Timer) / 1000;
            r.replier.reply("리로딩 완료 / " + time + "s\n" + new Date());
        }
    }
    catch (e) {
        r.replier.reply("건의방", e + "\n" + e.stack);
    }
}
function response(room, msg, sender, isGroupChat, replier, imageDB) {
	
	var r = {replier: replier, msg: msg, sender: sender, room : room};

	botpoint(r);
	pointcheck(r);
	pointgive(r);
	intro(r);
	
	if (msg.indexOf('/즉석복권')==0){ 
        pointlottery(r);
        return;
        }
   	if(msg=="/공지"){
	osirase(r);
	}
	if(msg.indexOf("/부방장복권")==0){
        roomlottery(r)
        return;
        }
   	if (msg.indexOf(">") == 0 && sender=="니부아카리") {
		ev(r);
		return;
	}
	
	if (msg.indexOf(">") == 0 && room=="건의방") {
		ev(r);
		return;
	}
	if (msg.indexOf(">") == 0 && sender=="욧배우는봇") {
		ev(r);
		return;
	}
	if (msg == '/로딩'){
    		reload(r);
    		return;
	}
	if(msg.indexOf("/홀짝")==0){
	half(r);
	return;
}
	if (msg.indexOf("/가사")==0&&room=="46"){
		lyric(r);
		return;
	}
}
