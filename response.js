var D = require("DBManager.js")("D"); 
var T = require("ThreadManager.js");
var I = require("Interactive.js");
const es=String.fromCharCode(8237).repeat(500);	
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
String.prototype.extension=function(char,length){
	const addLength = (length-this.toString().length >= 0) ? length-this.toString().length : 0; 
	return char.repeat(addLength)+this.toString();
}
String.prototype.extensionRight=function(char,length){
	const addLength = (length-this.toString().length >= 0) ? length-this.toString().length : 0; 
	return this.toString()+char.repeat(addLength);
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
function CoronaVirus(r){
	Jsoup = org.jsoup.Jsoup
	Ll = "⎼".repeat(50)
	Lw = "\u200b".repeat(500
id = Jsoup.connect("http://www.xn--now-po7lf48dlsm0ya109f.kr/infect/occurrence_list.do?pageIndex=&disease_no2=&search_nm=코로나").get().select("tbody").select("tr").get(0).select("a").attr("href").split("'")[1]
url = "http://www.xn--now-po7lf48dlsm0ya109f.kr/infect/occurrence_info.do?infect_no="+id+"&pageIndex=&disease_no2=&search_nm="
return id.split("in_2020")[1].split("0001")[0].replace(/([0-9]){2}/, "$1월 ")+"일 기준\n"+Ll+"\n한국 : "+Jsoup.connect("http://www.cdc.go.kr/linkCheck.es?mid=a21111050500").get().select("li").get(12).text().split(") ")[1].split(",")[0]+("\n중국"+Jsoup.connect(url).get().select("tr").html().split("중국")[1].replace(/<([^>])+>|아시아|아메리카|유럽|오세아니아|\*|,/g, "").replace(/\n\n/g, "\n").replace(/\(([0-9]+)+\)/g, " ($1명 사망)")).replace(/\n([0-9]+)+/g, " : $1명")+Ll
}

function lyric(r) {
    const timestamp = "323B33146D42F44747881A808B81CA796996FDECFE3E1399FBB0DC89CC190743E16DBD43951A4031DC7BE2" + "D39907CAD5515DB0CEDA26508E111CFF458C86E917BDA1CB1F75506CEB27F92E72FCDA15B7FD6E061623" + "DFFB9C86262C82C00779EA8A7CDD0684E61DD4DD7D8C72F0AC3C42F21356BF0B3398E93E20AEF3555D2737";
    var str = r.msg.replace("/가사", "").trim();
    var title = str.includes("/") ? str.split("/")[0] : str;
    var artist = str.includes("/") ? str.split("/")[1] : "";
    try {
        var lyricList = JSON.parse(String(org.jsoup.Jsoup.connect("https://lyric.altools.com/v1/search").data("title", title).data("artist", artist).data("playtime", 100).data("page", 1).data("encData", timestamp).ignoreContentType(true).post().select("body").text()));
    }
    catch (e) {
        r.replier.reply("검색된 데이터가 없습니다.");
        return;
    }
    var res = "\"" + title + (artist ? ("/" + artist) : "") + "\" 검색결과" + "\n";
    for (var i = 0; i < 3 && i < lyricList.length; i++) {
        var lyricId = lyricList[i].lyric_id;
        try {
            var lyric = JSON.parse(String(org.jsoup.Jsoup.connect("https://lyric.altools.com/v1/info").data("info_id", lyricList[i].lyric_id).data("encData", timestamp).ignoreContentType(true).post().select("body").html()).replace(/\n/g, "")).lyric.replace(/\<br\>/g, "\n").replace(/\[\d\d:\d\d.\d\d\]/g, "") + "\n\n";
            res += "Lyric : " + (i + 1) + "\n" + lyricList[i].title + "/" + lyricList[i].artist + "\n" + lyric;
        }
        catch (e) {
        }
    }
    r.replier.reply(res.trim().cut(1));
}

function weather(r){
	I.register("weatherSelect"+r.sender,r.room,r.sender,function(input){
		try{
			var want = r.msg.substr(4);
           	 	var link1 = "";
          		  var link2 = "https://m.weather.naver.com/m/main.nhn?regionCode=09140171";
          		  var check = link2.indexOf("weather");
        		    var where = "서울 중구 중림동";
			if (want.length > 0) {
                link1 = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=" + want + "+날씨").get();
                link2 = link1.select("div.api_more_wrap").select("a").attr("abs:href");
                var check = link2.indexOf("weather");
                where = want;
                var temp = org.jsoup.Jsoup.connect("https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=날씨+" + want).get().select("div.sort_box._areaSelectLayer").select("div.select_lst._selectLayerLists").select("a").toArray();
                if (temp.length > 1 || (check == -1 && link2 != "http://m.weather.naver.com/m/nation.nhn")) {
                    if (temp.length > 1) {
                        var i = 0;
                        var navername = temp.map(v => (1 + i++) + ". " + v.text() + " ");
                    }
                    var temp = org.jsoup.Jsoup.connect("https://search.daum.net/search?nil_suggest=btn&w=tot&DA=SBC&q=" + want).get();
                    if (String(temp).indexOf("addressColl") > -1) {
                        if (String(temp).indexOf("지번주소") > -1) {
                            var name0 = temp.select("div.mg_cont.clear").select("dl.dl_comm").select("span.txt_address").select("span.f_l").text();
                            var name1 = temp.select("div.mg_cont.clear").select("div.wrap_tit").select("span.f_etit").text();
                            var i = 1;
                            var name2 = temp.select("div.mg_cont.clear").select("div.wrap_relspace").select("a").toArray().map(v => (1 + i++) + ". " + v.text().replace("..", ""));
                            if (name2.length > 0) {
                                var name = [];
                                name.push("1. " + name1);
                                name = name.concat(name2);
                                var msg;
                                r.replier.reply("장소를 선택하세요\n" + name.join("\n"));
                                msg = input.getMsg() * 1;
                                if (!isNaN(msg) && msg >= 1 && msg <= name.length) {
                                    var targetNum = msg - 1;
                                    var want = name[targetNum].split(". ")[1];
                                    var temp = org.jsoup.Jsoup.connect("https://search.daum.net/search?nil_suggest=btn&w=tot&DA=SBC&q=" + want).get();
                                    var name0 = temp.select("div.mg_cont.clear").select("dl.dl_comm").select("span.txt_address").select("span.f_l").text();
                                    var name1 = temp.select("div.mg_cont.clear").select("div.wrap_tit").select("span.f_etit").text();
                                }
                            }
                            var wantplace = "";
                            var temp = name0;
                            var loc = temp.substr(0, temp.lastIndexOf("면 ") + 1);
                            var loc1 = temp.substr(0, temp.lastIndexOf("읍 ") + 1);
                            var loc2 = temp.substr(0, temp.lastIndexOf("동 ") + 1);
                            var loc3 = temp.substr(0, temp.lastIndexOf("가 ") + 1);
                            if (loc.length > 0) {
                                wantplace = loc;
                            } else {
                                if (loc1.length > 0) {
                                    wantplace = loc1;
                                } else {
                                    if (loc2.length > 0) {
                                        wantplace = loc2;
                                    } else {
                                        if (loc3.length > 0) {
                                            wantplace = loc3;
                                        } else {
                                            var temp = name1;
                                            var loc = temp.substr(0, temp.lastIndexOf("면 ") + 1);
                                            var loc1 = temp.substr(0, temp.lastIndexOf("읍 ") + 1);
                                            var loc2 = temp.substr(0, temp.lastIndexOf("구 ") + 1);
                                            var loc3 = temp.substr(0, temp.lastIndexOf("시 ") + 1);
                                            if (loc.length > 0) {
                                                wantplace = loc;
                                            } else {
                                                if (loc1.length > 0) {
                                                    wantplace = loc1;
                                                } else {
                                                    if (loc2.length > 0) {
                                                        wantplace = loc2;
                                                    } else {
                                                        if (loc3.length > 0) {
                                                            wantplace = loc3;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            link1 = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=날씨+" + wantplace).get();
                            link2 = link1.select("div.api_more_wrap").select("a").attr("abs:href");
                            if (link2.indexOf("regionCode") == -1) {
                                link1 = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=+" + wantplace + "날씨").get();
                                link2 = link1.select("div.api_more_wrap").select("a").attr("abs:href");
                            }
                            check = link2.indexOf("weather");
                            where = want;
                            if (check == -1 || String(temp).length == 0) {
                                r.replier.reply("검색이 불가능합니다.");
                                return;
                            }
                        } else {
                            var name = [];
                            name.push("1. " + temp.select("div.mg_cont.clear.admin_area").select("div.wrap_tit").select("span").text() + " ");
                            var i = 1;
                            name = name.concat(temp.select("div.mg_cont.clear.admin_area").select("div.wrap_relspace").select("a").toArray().map(v => (1 + i++) + ". " + v.text().replace("..", "") + " "));
                            if (navername != undefined) {
                                if (navername.length >= name.length) {
                                    name = navername;
                                }
                            }
                            var msg;
                            r.replier.reply("장소를 선택하세요\n" + name.join("\n"));
                            msg = input.getMsg() * 1;
                            if (!isNaN(msg) && msg >= 1 && msg <= name.length) {
                                var targetNum = msg - 1;
                                var wantplace = "";
                                var temp = name[targetNum].substr(3);
                                var loc = temp.substr(0, temp.lastIndexOf("면 ") + 1);
                                var loc1 = temp.substr(0, temp.lastIndexOf("읍 ") + 1);
                                var loc2 = temp.substr(0, temp.lastIndexOf("동 ") + 1);
                                var loc3 = temp.substr(0, temp.lastIndexOf("가 ") + 1);
                                var loc4 = temp.substr(0, temp.lastIndexOf("군 ") + 1);
                                var loc5 = temp.substr(0, temp.lastIndexOf("구 ") + 1);
                                var loc6 = temp.substr(0, temp.lastIndexOf("시 ") + 1);
                                if (loc.length > 0) {
                                    wantplace = loc;
                                } else {
                                    if (loc1.length > 0) {
                                        wantplace = loc1;
                                    } else {
                                        if (loc2.length > 0) {
                                            wantplace = loc2;
                                        } else {
                                            if (loc3.length > 0) {
                                                wantplace = loc3;
                                            } else {
                                                if (loc4.length > 0) {
                                                    wantplace = loc4;
                                                } else {
                                                    if (loc5.length > 0) {
                                                        wantplace = loc5;
                                                    } else {
                                                        if (loc6.length > 0) {
                                                            wantplace = loc6;
                                                        } else {
                                                            wantplace = temp;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                link1 = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=+" + wantplace + "날씨").get();
                                link2 = link1.select("div.api_more_wrap").select("a").attr("abs:href");
                                if (link2.indexOf("regionCode") == -1) {
                                    link1 = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=날씨+" + wantplace).get();
                                    link2 = link1.select("div.api_more_wrap").select("a").attr("abs:href");
                                }
                                check = link2.indexOf("weather");
                                where = name[targetNum].substr(3);
                            }
                        }
                    } else {
                        temp = temp.select("div.wrap_place").select("div.wrap_cont").toArray();
                        var i = 0;
                        var name = temp.map(v => (1 + i++) + ". " + v.select("a").first().text().replace(" 펼치기/접기", ""));
                        if (name.length == 0) {
                            r.replier.reply("검색이 불가능합니다.");
                            return;
                        }
                        var loc = temp.map(v => {
                            vv = String(v.select("dd.cont").text() + " ");
                            return vv.substr(0, vv.lastIndexOf("면 ") + 1);
                        }
                        );
                        var loc1 = temp.map(v => {
                            vv = String(v.select("dd.cont").text() + " ");
                            return vv.substr(0, vv.lastIndexOf("읍 ") + 1);
                        }
                        );
                        var loc2 = temp.map(v => {
                            vv = String(v.select("dd.cont").text() + " ");
                            return vv.substr(0, vv.lastIndexOf("동 ") + 1);
                        }
                        );
                        var loc3 = temp.map(v => {
                            vv = String(v.select("dd.cont").text() + " ");
                            return vv.substr(0, vv.lastIndexOf("가 ") + 1);
                        }
                        );
                        var msg;
                        r.replier.reply("장소를 선택하세요\n" + name.join("\n"));
                        msg = input.getMsg() * 1;
                        if (!isNaN(msg) && msg >= 1 && msg <= name.length) {
                            var targetNum = msg - 1;
                            var wantplace = "";
                            if (loc[targetNum].length > 0) {
                                wantplace = loc[targetNum];
                            } else {
                                if (loc1[targetNum].length > 0) {
                                    wantplace = loc1[targetNum];
                                } else {
                                    if (loc2[targetNum].length > 0) {
                                        wantplace = loc2[targetNum];
                                    } else {
                                        if (loc3[targetNum].length > 0) {
                                            wantplace = loc3[targetNum];
                                        }
                                    }
                                }
                            }
                            link1 = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=날씨+" + wantplace).get();
                            link2 = link1.select("div.api_more_wrap").select("a").attr("abs:href");
                            if (link2.indexOf("regionCode") == -1) {
                                link1 = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=+" + wantplace + "날씨").get();
                                link2 = link1.select("div.api_more_wrap").select("a").attr("abs:href");
                            }
                            where = name[targetNum].substr(3);
                            check = link2.indexOf("weather");
                        }
                    }
                } else {
                    if (link2 == "http://m.weather.naver.com/m/nation.nhn") {
                        var temp = org.jsoup.Jsoup.connect("https://search.daum.net/search?nil_suggest=btn&w=tot&DA=SBC&q=" + want).get();
                        if (String(temp).indexOf("addressColl") > -1) {
                            var name = [];
                            name.push("1. " + temp.select("div.mg_cont.clear.admin_area").select("div.wrap_tit").select("span").text());
                            var i = 1;
                            name = name.concat(temp.select("div.mg_cont.clear.admin_area").select("div.wrap_relspace").select("a").toArray().map(v => (1 + i++) + ". " + v.text()));
                            if (name.length == 1) {
                                var targetNum = 0;
                            } else {
                                if (name.length > 1) {
                                    var msg;
                                    r.replier.reply("장소를 선택하세요\n" + name.join("\n"));
                                    msg = input.getMsg() * 1;
                                    if (!isNaN(msg) && msg >= 1 && msg <= name.length) {
                                        var targetNum = msg - 1;
                                    }
                                }
                            }
                            var wantplace = "";
                            var temp = name[targetNum].split(". ")[1];
                            var loc = temp.substr(0, temp.lastIndexOf("면 ") + 1);
                            var loc1 = temp.substr(0, temp.lastIndexOf("읍 ") + 1);
                            var loc2 = temp.substr(0, temp.lastIndexOf("동 ") + 1);
                            var loc3 = temp.substr(0, temp.lastIndexOf("가 ") + 1);
                            if (loc.length > 0) {
                                wantplace = loc;
                            } else {
                                if (loc1.length > 0) {
                                    wantplace = loc1;
                                } else {
                                    if (loc2.length > 0) {
                                        wantplace = loc2;
                                    } else {
                                        if (loc3.length > 0) {
                                            wantplace = loc3;
                                        }
                                    }
                                }
                            }
                            link1 = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=날씨+" + wantplace).get();
                            link2 = link1.select("div.api_more_wrap").select("a").attr("abs:href");
                            if (link2.indexOf("regionCode") == -1) {
                                link1 = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=+" + wantplace + "날씨").get();
                                link2 = link1.select("div.api_more_wrap").select("a").attr("abs:href");
                            }
                            check = link2.indexOf("weather");
                            where = name[targetNum].split(". ")[1];
                            if (check == -1 || String(temp).length == 0) {
                                r.replier.reply("검색이 불가능합니다.");
                                return;
                            }
                        }
                    } else {
                        if (link2 == "http://m.weather.naver.com") {
                            var i = 0;
                            var link1 = org.jsoup.Jsoup.connect("https://search.daum.net/search?nil_suggest=btn&w=tot&DA=SBC&q=" + want).get();
                            var name = String(link1.select("select[id=regionnamelist]").text()).replace("하위 행정명", "").trim().split(" ").map(v => (1 + i++) + ". " + v);
                            var msg;
                            if (name.length < 6) {
                                r.replier.reply("지역을 선택하세요\n" + name.join("\n"));
                            } else {
                                if (name.length > 5) {
                                    var name1 = "";
                                    for (var i in name) {
                                        if (Number(name[i].split(".")[0]) % 2 == 1) {
                                            name1 += name[i];
                                        } else {
                                            name1 += " / " + name[i] + "\n";
                                        }
                                    }
                                    r.replier.reply("지역을 선택하세요\n" + name1.trim());
                                }
                            }
                            msg = input.getMsg() * 1;
                            if (!isNaN(msg) && msg >= 1 && msg <= name.length) {
                                var targetNum = msg - 1;
                                link1 = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=날씨+" + name[targetNum].substr(3)).get();
                                link2 = link1.select("div.api_more_wrap").select("a").attr("abs:href");
                                if (link2.indexOf("regionCode") == -1) {
                                    link1 = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=+" + name[targetNum].substr(3) + "날씨").get();
                                    link2 = link1.select("div.api_more_wrap").select("a").attr("abs:href");
                                }
                                check = link2.indexOf("weather");
                                where = name[targetNum].substr(3);
                            }
                        }
                    }
                }
            }
            if (link2.indexOf("regionCode") == -1) {
                r.replier.reply("검색이 불가능합니다.");
                return;
            }
            if (check > -1) {
                var doc = org.jsoup.Jsoup.connect(link2).get();
                var sky = doc.select("div.weather_icon.sp_icon_60").toArray().map(v => v.text());
                var degree = doc.select("div._cnWtrHourlyChartData").select("div[data-tab=0]").text().split(",").slice();
                var rain = doc.select("div._cnWtrHourlyChartData").select("div[data-tab=1]").text().split(",").slice();
                var wind = doc.select("div._cnWtrHourlyChartData").select("div[data-tab=2]").text().split(",").slice();
                var wet = doc.select("div._cnWtrHourlyChartData").select("div[data-tab=3]").text().split(",").slice();
                var where1 = "";
                if (want.length > 0) {
                    var where1 = "(" + doc.select("div.section_location").select("strong").text() + ")";
                }
                if (String(doc).indexOf("Weathernews") > 0 || String(doc).indexOf("The Weather Channel") > 0 || String(doc).indexOf("accuweather") > 0) {
                    var clock = doc.select("span.th_text").text().match(/[0123456789]?[0123456789](?=시)/g);
                    var clock1 = clock.length;
                    if (clock1 > 16) {
                        clock1 = 16;
                    }
                    var res = where + where1 + " 날씨\n";
                    res += "-------------날씨-------------\n";
                    res += "시간 기온 강수 습도 바람    날씨\n [h]   [℃]  [%]  [%]  [㎧]    상태\n";
                    for (var i = 1; i < clock1; i++) {
                        res += " " + String(clock[i]).extension("0", 2) + "    ";
                        res += String(degree[i]).extension(" ", 2) + "    ";
                        res += String(rain[i]).extension(" ", 2) + "   ";
                        res += String(wet[i]).extension(" ", 2) + "   ";
                        res += String(wind[i]).extension(" ", 2) + " ";
                        res += String(sky[i]).extension("ㅤ", 5) + "\n";
                        if (i == 5) {
                            res += es;
                        }
                    }
                    res += "\n" + link2;
                } else {
                    var clock = doc.select("span.th_text").text().match(/[0123456789]?[0123456789](?=시)/g);
                    var clock1 = clock.length;
                    var uv1 = doc.select("li.uv").select("em").text();
                    var uv = doc.select("li.uv").select("span").text().replace(uv1, " (" + uv1 + ")");
                    var index = doc.select("strong.title").text().replace("최근 검색한 곳", "").split(" ").map(v => String(v).replace(/온도/g, "온도 : ").replace(/지수/g, "지수 : "));
                    var sun1 = doc.select("li.sun_item").select("div.day").select("span").get(0).text() + " : " + doc.select("li.sun_item").select("div.time").get(0).text();
                    var sun2 = doc.select("li.sun_item").select("div.day").select("span").get(1).text() + " : " + doc.select("li.sun_item").select("div.time").get(1).text();
                    var link3 = link2 + "&default=air";
                    var doc1 = org.jsoup.Jsoup.connect(link3).get();
                    var pollution = doc1.select("li.pollution_item").toArray().map(v => {
                        vv = String(v.select("span.number").select("em").text());
                        vvv = String(v.select("span.title").text());
                        return vvv + " : " + v.select("span.number").text().replace(vv, " " + vv);
                    }
                    );
                    var dust = doc1.select("div.chart_item").toArray().map(v => v.select("div.dust_graph_number").text().replace("먼지", "먼지 :") + "㎍/㎥" + "(" + v.select("div.dust_graph_text").text() + ")");
                    if (sky.slice(0, 7).map(v => String(v)).indexOf("비") > -1) {
                        r.replier.reply("☔비소식이 있습니다. 우산을 챙기세요☔");
                    }
                    var res = where + where1 + " 날씨\n" + "ㅤㅤ<종합정보 → 전체보기>\n";
                    res += "-------미세먼지/자외선--------\n";
                    res += dust.join("\n") + "\n";
                    res += "자외선 : " + uv + "\n";
                    res += "-------------날씨-------------\n";
                    res += "시간ㅤ기상ㅤ기온 강수 습도 바람\n [h] ㅤ상황    [℃]  [%]  [%]  [㎧]\n";
                    for (var i = 0; i < clock1; i++) {
                        res += " " + String(clock[i]).extension("0", 2) + " ";
                        res += String(sky[i]).extensionRight("ㅤ", 4) + "  ";
                        res += String(degree[i]).extension(" ", 2) + "   ";
                        res += String(rain[i]).extension(" ", 2) + "   ";
                        res += String(wet[i]).extension(" ", 2) + "   ";
                        res += String(wind[i]).extension(" ", 2) + "\n";
                        if (i == 6) {
                            res += es;
                        }
                    }
                    res += "------------기타지수------------\n" + pollution.join("\n") + "\n";
                    res += "------------일상지수------------\n" + index.join("\n");
                    res += "\n------------일출&일몰-----------\n" + sun1 + "\n" + sun2;
                    res += "\n" + link2;
                }
                r.replier.reply(res);
            }
        }
        catch (e) {
            r.replier.reply(e + "\n" + e.stack);
        }
    });
}
function hamburg(r){
	var lotte = org.jsoup.Jsoup.connect('http://www.lotteria.com/menu/Menu_All.asp').get().select('div.memu_group>ul').get(0).select('div.cont.menu.roundMiddle > a').toArray().map(v=>v.text());
	var moms1 = org.jsoup.Jsoup.connect('http://www.momstouch.co.kr/sub/menu/menu_list.html?pg=1&menu=4').get().select('span.title').toArray().map(v=>v.text());
	var moms2 = org.jsoup.Jsoup.connect('http://www.momstouch.co.kr/sub/menu/menu_list.html?pg=2&menu=4').get().select('span.title').toArray().map(v=>v.text());
	var moms3 = org.jsoup.Jsoup.connect('http://www.momstouch.co.kr/sub/menu/menu_list.html?pg=3&menu=4').get().select('span.title').toArray().map(v=>v.text());
	var moms = moms1.concat(moms2).concat(moms3);
	var rad = rad = Math.floor(Math.random() * 2);
	if(rad = 1)
	{
		var rad = rad = Math.floor(Math.random() * lotte.length);
		r.replier.reply('롯데리아 버거 추천\n' + lotte.splice(rad,1)[0]);
	} 
	else (rad = 2)
	{
		var rad = rad = Math.floor(Math.random() * moms.length);
		r.replier.reply('맘스터치 버거 추천\n' + moms.splice(rad,1)[0]);
	} 
}
function subway(r) {
	var sandwich = org.jsoup.Jsoup.connect('http://subway.co.kr/sandwichList').get().select('div.pd_list_wrapper');
	var nbf = sandwich.select('li:not(.bf)').toArray().map(v=> v.select('strong').text() + '(' + v.select('span.cal').text() + ')' );
	var bf = sandwich.select('li.bf').toArray().map(v=> v.select('strong').text() + '(' + v.select('span.cal').text() + ')' );

	if( time().hour < 11 ) {
		nbf.concat(bf);
	}

	var addtop = org.jsoup.Jsoup.connect('http://subway.co.kr/toppingList').get().select('strong').toArray().map(v=>v.text());;

	var top = org.jsoup.Jsoup.connect('http://subway.co.kr/freshInfo?tab=vegetable').get();
	var bread = top.select('li.bread').select('strong').toArray().map(v=>v.text());
	var veg = top.select('li.vegetable').select('strong').toArray().map(v=>v.text());
	var cheese = top.select('li.cheese').select('strong').toArray().map(v=>v.text());
	var sauce = top.select('li.sauce').select('strong').toArray().map(v=>v.text());

	//소스 2
	//치즈 0~1
	//야채 2~4
	//빵 0~1

	var str = '';

	var rad = Math.floor(Math.random() * nbf.length);
	str += '메뉴 : ' + nbf.splice(rad, 1)[0] + '\n';

	var rad = Math.floor(Math.random() * bread.length*2);
	if(rad+1 > bread.length){
		str += '빵 : 기본\n'
	} else {
		str += '빵 : ' + bread.splice(rad, 1)[0] + '\n';
	}

	str += '야채 : '
	var rad1 = Math.floor(Math.random() * 4)+3;
	for (var i = 0 ; i < rad1 ; i++){
		var rad = Math.floor(Math.random() * veg.length);
		str += veg.splice(rad, 1)[0]+', ';
	}
	str = str.substr(0, str.length - 2)+'\n';

	var rad1 = Math.random();
	if(rad1 < 0.5){
		var rad = Math.floor(Math.random() * cheese.length);
		str += '치즈 : ' + cheese.splice(rad, 1)[0] + '\n';
	}

	var rad1 = Math.floor(Math.random() * 3);
	if(rad1 > 0){
		str += '소스 : '
	}
	for (var i = 0 ; i < rad1 ; i++){
		var rad = Math.floor(Math.random() * sauce.length);
		str += sauce.splice(rad, 1)[0]+', ';
	}
	if(rad1 > 0){
		str = str.substr(0, str.length - 2);
	}

	r.replier.reply('서브웨이 추천 메뉴\n'+str.trim());
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
                 r.replier.reply("축하합니다! "+r.sender+"님이 부방장에 당첨 되었습니다.\n 100네루가 추가 지급 되었습니다.");
		currentpoint+=100;
                D.update("botpoint",{"point":currentpoint},"name=?",r.sender);
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
                        r.replier.reply("축하합니다! "+r.sender+"님이 부방장에 당첨 되었습니다.\n 100네루가 추가 지급 되었습니다.");
			currentpoint+=100;
                	D.update("botpoint",{"point":currentpoint},"name=?",r.sender);
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
function versus(r){
	 if(r.msg.indexOf("vs")!=-1) {
	 var temp = r.msg.split("vs");
	 var num = Math.floor((temp.length) * Math.random());
	 r.replier.reply(temp[num].trim());
         }
}
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
function pointgive(r){
	random = Math.floor(Math.random()*101);
	give1 = Math.floor(Math.random()*10)
	give2 = Math.floor(Math.random()*10)+10
	give3 = Math.floor(Math.random()*10)+20
	
	if(D.selectForArray("botpoint","name","name=?",r.sender) == r.sender){
		currentpoint=D.selectForArray("botpoint",null,"room=? and name=?",[r.room,r.sender])[0][2];
		if(random > 95 && r.room=="46"){
			if(currentpoint>=200){
				currentpoint+=give1;
				D.update("botpoint",{"point":currentpoint},"name=?",r.sender);
				r.replier.reply(r.sender+"님 "+give1+"네루 획득")
			}
			else if (200>currentpoint>=100)
			{
				currentpoint+=give2;
				D.update("botpoint",{"point":currentpoint},"name=?",r.sender);
				r.replier.reply(r.sender+"님 "+give2+"네루 획득")
			}
			else
			{
				currentpoint+=give3;
				D.update("botpoint",{"point":currentpoint},"name=?",r.sender);
				r.replier.reply(r.sender+"님 "+give3+"네루 획득")
			}
		
		}
	}
	else 
	{
		D.insert("botpoint",{room : r.room, name:r.sender, point:0})	
	}
}
function intro(r){
	if(r.msg=="/기능"){
		r.replier.reply("/날씨\n/가사\n/즉석복권\n/부방장복권\n최근채팅\n/실검\nvs기능\n/햄버거\n/써브웨이\n자세한 사항은 /기능 기능명 (예시 /기능 날씨)");
	}
	if(r.msg=="/기능 날씨"){
		r.replier.reply("/날씨 지역명");
	}
	if(r.msg=="/기능 실검"){
		r.replier.reply("/실검\n네이버 기준 실시간 검색어입니다");
	}
	if(r.msg=="/기능 vs"){
		r.replier.reply("예시 네루vs노루");
	}
	if(r.msg=="/기능 즉석복권"){
		r.replier.reply("10 네루를 사용해 복권을 뽑습니다.\n1등 : 200네루 1%\n2등 : 50네루 4%\n3등 : 30네루 6%\n4등 : 15네루 10%");
	}
	if(r.msg=="/기능 부방장복권"){
		r.replier.reply("10 네루를 사용해 부방장 복권을 뽑습니다.\n부방장 당첨 확률 1% 당첨 시 하루 당 200 네루 지급 부방장은 2 명으로 2명인 상태에서 새로운 부방장이 뽑히면 첫번째로 부방장이 된 사람은 탄핵됩니다.");
	}
	if(r.msg=="/기능 가사"){
		r.replier.reply("/가사 /노래명/아티스트명");
	}
	if(r.msg=="/기능 최근채팅"){
		r.replier.reply("갯수 당 1 네루를 사용합니다! /최근채팅/닉/갯수");
	}
}

function Keyaki() {
	name1=org.jsoup.Jsoup.connect("https://www.keyakizaka46.com/s/k46o/?ima=0000").get().select("span").toArray().map((v)=>v.text())[0]
	link1="https://www.keyakizaka46.com"+org.jsoup.Jsoup.connect("https://www.keyakizaka46.com/s/k46o/?ima=0000").get().select("span").select("a").attr("href")
	if((D.selectForArray('Keyaki')[0] != link1)==true){
	D.update("Keyaki",{"osirase":link1})
	Api.replyRoom("46","케야키자카46 공지가 갱신 되었습니다.\n"+name1+"\n"+link1);	
	}
}	
keyakinofi = T.register("Keyaki1",()=>{
	while(true){
		java.lang.Thread.sleep(10*1000);
		Keyaki();
		}
	}).start();
function Hinata() {
	name2 = org.jsoup.Jsoup.connect("https://www.hinatazaka46.com/s/official/?ima=0000").get().select('p.c-news__text').toArray().map((v)=>v.text())[0]
	link2 = "https://www.hinatazaka46.com"+org.jsoup.Jsoup.connect("https://www.hinatazaka46.com/s/official/?ima=0000").get().select('li.p-news__item').select('a').attr("href")
	if((D.selectForArray('Hinata')[0] != link2)==true){
	D.update("Hinata",{"osirase":link2})
	Api.replyRoom("46","히나타자카46 공지가 갱신 되었습니다.\n"+name2+"\n"+link2);
	}
}
hinatanofi = T.register("Hinata1",()=>{
		while(true){
			java.lang.Thread.sleep(10*1000);
			Hinata();
		}
	}).start();
function news(r){
	if(r.msg=="/실검"){
	link=org.jsoup.Jsoup.connect('https://datalab.naver.com/keyword/realtimeList.naver?where=main').get().select('div.item_box').toArray().map((v,i)=>(i +1) +'. '+ v.select('span.item_title').text()).join('\n');
	r.replier.reply(link)
	}
}
	function chat(r){
	D.insert("chatdb",{room : r.room, name:r.sender, chat:r.msg})
	currentpoint=D.selectForArray("botpoint",null,"room=? and name=?",[r.room,r.sender])[0][2];
	var arr =[]
	if(r.msg.indexOf("/최근채팅")==0){
		namae = r.msg.split("/")[2];
		numb = Number(r.msg.split("/")[3]);
		if(currentpoint-numb>0){
			currentpoint-=numb;
			D.update("botpoint",{"point":currentpoint},"name=?",r.sender);
			number = Number(D.selectForArray("chatdb","chat","room=? and name=?",[r.room,namae]).length-1);
			name = Number(D.selectForArray("chatdb","name","room=? and name=?",[r.room,namae]).length-1);
			for(i=0 ; i<numb ; i++){
			ch = D.selectForArray("chatdb","chat","room=? and name=?",[r.room,namae])[number];
			na = D.selectForArray("chatdb","name","room=? and name=?",[r.room,namae])[name];	
	        	arr[i]=na+" : "+ch
			name=name-1
			number=number-1
			}
		r.replier.reply(arr.join("\n"))
		}
		else{
			r.replier.reply("네루가 부족합니다")
		}
			
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
        if (r.sender == "김석우" ) {
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
            T.interruptAll();
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
function Hread(r){
	r.replier.reply(T.getThreadList().join("\n"));
}
function response(room, msg, sender, isGroupChat, replier, imageDB) {
	
	var r = {replier: replier, msg: msg, sender: sender, room : room};
	I.run(room, sender, msg);
	pointgive(r);
	pointcheck(r);
	intro(r);
	versus(r);
	chat(r);
	news(r);
        if (msg.indexOf('/날씨')==0&& room=="46"){ 
    	weather(r);
        return;
        }
	if (msg=='/햄버거'){ 
    	hamburg(r)
        return;
        }
	if (msg=='/써브웨이'){ 
    	subway(r)
        return;
        }
	if (msg.indexOf("/가사")==0) {
		lyric(r)
		return;
	}
	if(msg=="/공지"){
	osirase(r);
	}
   	if (msg.indexOf(">") == 0 && sender=="김석우") {
		ev(r);
		return;
	}
	
	if (msg.indexOf(">") == 0 && room=="건의방") {
		ev(r);
		return;
	}
	if (msg == '/로딩'){
    		reload(r);
    		return;
	}
	if (msg == '/쓰레드'){
    		Hread(r);
    		return;
	}
	if (msg.indexOf('/즉석복권')==0){ 
    pointlottery(r);
    return;
    }
	if(msg.indexOf("/부방장복권")==0){
    roomlottery(r)
    return;
    }	
if (msg == "/코로나"){
replier.reply(CoronaVirus(r));
return;
}
}
	
}

