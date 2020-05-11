export const localStorageConfig={
    Admin_user:"Admin_user" ,
    is_login:"is_login",
};

export const set_localStorage=(pageName,key,value)=>{
    console.log("set->"+pageName+"->"+ key+"::"+value);
    localStorage.setItem(localStorageConfig[key],value);
    // console.log(get_localStorage(key));
};

export const remove_localStorage=(pageName,key)=>{
    console.log("remove->"+pageName+"->"+key+"::");
    localStorage.removeItem(localStorageConfig[key]);
};

export const get_localStorage=(pageName,key)=>{
    console.log("get->"+pageName+"->"+key+"::"+localStorage.getItem(key));
    return localStorage.getItem(key);
};

