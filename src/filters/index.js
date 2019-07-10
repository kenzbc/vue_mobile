export const formatDate = (str) => {
  var date = new Date(str*1000),
    Y = date.getFullYear(),
    m = date.getMonth() + 1,
    d = date.getDate(),
    H = date.getHours(),
    i = date.getMinutes(),
    s = date.getSeconds();
  if (m < 10) {
    m = '0' + m;
  }
  if (d < 10) {
    d = '0' + d;
  }
  if (H < 10) {
    H = '0' + H;
  }
  if (i < 10) {
    i = '0' + i;
  }
  if (s < 10) {
    s = '0' + s;
  }
  var t = Y + '.' + m + '.' + d +' '+H +':'+i;
  return t;
}
export const formatDate2 = (str) => {
  var date = new Date(str*1000),
    Y = date.getFullYear(),
    m = date.getMonth() + 1,
    d = date.getDate(),
    H = date.getHours(),
    i = date.getMinutes(),
    s = date.getSeconds();
  if (m < 10) {
    m = '0' + m;
  }
  if (d < 10) {
    d = '0' + d;
  }
  if (H < 10) {
    H = '0' + H;
  }
  if (i < 10) {
    i = '0' + i;
  }
  if (s < 10) {
    s = '0' + s;
  }
  var t = Y + '-' + m + '-' + d +' '+H +':'+i;
  return t;
}
export const formatDate5 = (str) => {
  var date = new Date(str*1000),
    Y = date.getFullYear(),
    m = date.getMonth() + 1,
    d = date.getDate(),
    H = date.getHours(),
    i = date.getMinutes(),
    s = date.getSeconds();
  if (m < 10) {
    m = '0' + m;
  }
  if (d < 10) {
    d = '0' + d;
  }
  if (H < 10) {
    H = '0' + H;
  }
  if (i < 10) {
    i = '0' + i;
  }
  if (s < 10) {
    s = '0' + s;
  }
  var t = Y + '年' + m + '月' + d +'日 ';
  return t;
}
export const formatDate6 = (str) => {
  var date = new Date(str*1000),
    Y = date.getFullYear(),
    m = date.getMonth() + 1,
    d = date.getDate(),
    H = date.getHours(),
    i = date.getMinutes(),
    s = date.getSeconds();
  if (m < 10) {
    m = '0' + m;
  }
  if (d < 10) {
    d = '0' + d;
  }
  if (H < 10) {
    H = '0' + H;
  }
  if (i < 10) {
    i = '0' + i;
  }
  if (s < 10) {
    s = '0' + s;
  }
  var t = H +':'+i+':'+s;
  return t;
}
export const formatDate3= (str) => {
  var t='';
  if(str.length>5){
    t=str.substring(0,parseInt(str.length)-4)+'k';
  }else{
    t=str;
  }
  /*var t = ;*/
  return t;
}

export const formatDate4= (str) => {
  var t='';
  if(str.length>4){
    t=str.substring(0,4);
  }else{
    t=str;
  }
  /*var t = ;*/
  return t;
}
