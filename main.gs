function doPost() {
  // slackからPOSTされた時間を取得
  var d = new Date();
  // slackからPOSTされた時間を取得
  var hh =  Utilities.formatDate( d, 'Asia/Tokyo', 'HH')
  var mm =  Utilities.formatDate( d, 'Asia/Tokyo', 'mm')
  
  myFunction(hh,mm);
  
}

function myFunction(hh,mm) {
  var id = '************************************'; // スプレッドシート名
  var name = 'weekday'; // シート名

  var hourFilter = 'key >= '+ (hh + mm) ; // 時間のfilter文章を作成
  Logger.log(hourFilter);
  
  try {
    var rs = SpreadSheetsSQL.open(id, name).select(['key_formula','key']).filter(hourFilter).orderBy(['key','time']).result();
    Logger.log(rs);
    Logger.log(hourFilter);
    Logger.log(rs[0].key);
    text = "次の電車は " + rs[0].key.slice(0,2) + ":" + rs[0].key.slice(2,4) + " だよ～～";
    //text = "次の電車は " + rs[0].key + " だよ～～"
    postSlack(text);
  }
  catch (e) {
    postSlack("天王町発の電車はもうないよ");
  }

}

function postSlack(text){
  // SlackAPI側で設定したWebhookURLを記入
  var url = "************************************";
  var options = {
    "method" : "POST",
    "headers": {"Content-type": "application/json"},
    "payload" : '{"text":"' + text + '"}'
  };
  UrlFetchApp.fetch(url, options);
}
