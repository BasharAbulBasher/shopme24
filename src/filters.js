import Vue from 'vue'
Vue.filter('substringDes',function(text){
    return text.substr(0,70);
});
Vue.filter('substringTit',function(text){
    return text.substr(0,15);
});
