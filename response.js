function reload(r) {
	if(r.sender == '니부아카리' || r.sender == '건의방'){
		reloadcheck = 1;
		reloadtime = new Date().getTime();
		var Timer = new Date();
	    file = "storage/emulated/0/kbot/response.js";
	    checksum = org.jsoup.Jsoup.connect("https://github.com/Akaribu/KakaoTalkBot/commits/master").get().select("div.repository-content>a").attr("href").split('commit/')[1];
	    conn = new java.net.URL("https://raw.githubusercontent.com/Akaribu/KakaoTalkBot/"+checksum+"/response.js").openConnection();
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
	    Api.replyRoom(r.room ,"파일저장 완료 / " + time + "s\n" + new Date() );
	    Api.reload();
	    reloadcheck = 0;
	    control = D.selectForArray('control').map(v=>v[0]);
	    controlPanel = D.selectForObject('control');
	    var time = (new Date() - Timer) / 1000;
	    Api.replyRoom(r.room , "reloading 완료 / " + time + "s\n" + new Date());
	}
}
function response(room, msg, sender, isGroupChat, replier, imageDB) {
}
