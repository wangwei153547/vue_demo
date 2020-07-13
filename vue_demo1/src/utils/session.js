function setSession(key,value){
  if(typeof value == "object"){//如果要存储对象，则先转为json串
    value = window.JSON.stringify(value);
  }
  sessionStorage.setItem(key, value);
}
function getSession(key){
  if(typeof(Storage)!=="undefined" || typeof key != "string")
  {
    let value = sessionStorage.getItem(key);
    try {
      value = JSON.parse(value);
    }catch (e){

    }
    return value;
  } else {
    return false;
  }
}
function clearSession(){
  sessionStorage.clear();
}
function hasKey(key){//session中是否存在指定key
  if(getSession(key) == "")
    return false;
  return true;
}

export default{
  setSession,
  getSession,
  clearSession,
  hasKey
}
