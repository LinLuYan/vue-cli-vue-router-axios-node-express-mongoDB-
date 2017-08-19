//公共方法
var passKey = '4c05c54d952b11e691d76c0b843ea7f9';
		
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('A G(a,b){x(b==v||b.7<=0){D.y("z R P O");t v}6 c="";s(6 i=0;i<b.7;i++){c+=b.u(i).n()}6 d=m.r(c.7/5);6 e=l(c.9(d)+c.9(d*2)+c.9(d*3)+c.9(d*4)+c.9(d*5));6 f=m.M(b.7/2);6 g=m.B(2,C)-1;x(e<2){D.y("L K J z");t v}6 h=m.F(m.H()*N)%I;c+=h;w(c.7>q){c=(l(c.o(0,q))+l(c.o(q,c.7))).n()}c=(e*c+f)%g;6 j="";6 k="";s(6 i=0;i<a.7;i++){j=l(a.u(i)^m.r((c/g)*E));x(j<p){k+="0"+j.n(p)}Q k+=j.n(p);c=(e*c+f)%g}h=h.n(p);w(h.7<8)h="0"+h;k+=h;t k}A S(a,b){6 c="";s(6 i=0;i<b.7;i++){c+=b.u(i).n()}6 d=m.r(c.7/5);6 e=l(c.9(d)+c.9(d*2)+c.9(d*3)+c.9(d*4)+c.9(d*5));6 f=m.F(b.7/2);6 g=m.B(2,C)-1;6 h=l(a.o(a.7-8,a.7),p);a=a.o(0,a.7-8);c+=h;w(c.7>q){c=(l(c.o(0,q))+l(c.o(q,c.7))).n()}c=(e*c+f)%g;6 j="";6 k="";s(6 i=0;i<a.7;i+=2){j=l(l(a.o(i,i+2),p)^m.r((c/g)*E));k+=T.U(j);c=(e*c+f)%g}t k}',57,57,'||||||var|length||charAt||||||||||||parseInt|Math|toString|substring|16|10|floor|for|return|charCodeAt|null|while|if|log|key|function|pow|31|console|255|round|encrypt|random|100000000|the|change|plesae|ceil|1000000000|empty|be|else|cannot|decrypt|String|fromCharCode'.split('|'),0,{}))

module.exports = {

	getCookie:function(cname){
		//获取cookie
		var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0; i<ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1);
	        if (c.indexOf(name) != -1){
	           var cnameValue = unescape(c.substring(name.length, c.length));
	           return decrypt(cnameValue, passKey);
	        } 
	    }
	    return "";
	},
	clearCookie:function(cname){
		//清楚cookie
		this.setCookie(cname, "", -1);
	},
	setCookie:function(cname, cvalue, exdays){
		//设置cookie
		var d = new Date();
	    d.setTime(d.getTime() + (exdays*24*60*60*1000));
	    var expires = "expires="+d.toUTCString();
	    document.cookie = cname + "=" + encrypt(escape(cvalue), passKey) + "; " + expires;
	},
	eleMessageCallback:function(obj){
        obj.time = 3000;
        obj.target.$message[obj.type]({
        	duration:obj.time,
        	message:obj.message
        });
        var timer = setTimeout(function(){
            obj.callback();
        },obj.time);
	},
	getParams:function(url){
		if(!url) {
            url = location.search.substring(1)
        }else {
            url = url.substr(url.indexOf('?') + 1)
        }
        var args = new Object();   // 声明并初始化一个 "类"
        // 获得地址(URL)"?"后面的字符串.
        var query = decodeURI(url);
        var pairs = query.split("&");  // 分割URL(别忘了'&'是用来连接下一个参数)
        for(var i = 0; i < pairs.length; i++) {
            var pos = pairs[i].indexOf('=');
            if(pos == -1) continue; // 它在找有等号的 数组[i]
            var argname = pairs[i].substring(0, pos); // 参数名字
            var value = pairs[i].substring(pos + 1);  // 参数值
            // 以键值对的形式存放到"args"对象中
            args[argname] = decodeURI(value);
        }
        return args;
	}
}