window.utils = {

  stripUnicode: function( key ) {
     var str = "";
     str = key;
    if( str ) {
      var unicode = [{
        uni : '(á|à|ả|ã|ạ|ă|Ă|ắ|ặ|ằ|ẳ|ẵ|â|ấ|ầ|ẩ|ẫ|ậ)',
        nonUni : 'a'
      }, {
        uni : '(đ)',
        nonUni : 'd'
      }, {
        uni : '(é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ)',
        nonUni : 'e'
      }, {
        uni : '(í|ì|ỉ|ĩ|ị)',
        nonUni : 'i'
      }, {
        uni : '(ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ)',
        nonUni : 'o'
      }, {
        uni : '(ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự)',
        nonUni : 'u'
      }, {
        uni : '(ý|ỳ|ỷ|ỹ|ỵ)',
        nonUni : 'y'
      }];
      var len = unicode.length;
      for(var i = 0; i < len; i++) {
        reg = new RegExp(unicode[i].uni,"gi");
        str = str.replace(reg, unicode[i].nonUni);
      }
    }
    return str;
  }
};