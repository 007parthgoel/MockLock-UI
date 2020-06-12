import cookie from 'react-cookies'

export const localConfig={
    user_token:"user_token",
    user_id:"user_id",
    user_type:"user_type",
    user:"user",
    userID_selected:"userID_selected",
    playlistID_selected:"playlistID_selected",
};

// export const set_localStorage=(pageName,key,value)=>{
//     // console.log("set->"+pageName+"->"+ key+"::"+value);
//     localStorage.setItem(localConfig[key],value);
//     // console.log(get_localStorage(key));
// };
//
// export const remove_localStorage=(pageName,key)=>{
//     // console.log("remove->"+pageName+"->"+key+"::");
//     localStorage.removeItem(localConfig[key]);
// };
//
// export const get_localStorage=(pageName,key)=>{
//     // console.log("get->"+pageName+"->"+key+"::"+localStorage.getItem(key));
//     return localStorage.getItem(key);
// };
//


export const set_cookies=(pageName,name,value,{path,expires,maxAge,domain,secure,httpOnly})=>{
    console.log(`set Cookies->${pageName}->${name}->${value}`);
    return cookie.save(name,value,{
        path:'/',
        expires:expires,
        maxAge:maxAge,
        domain:domain,
        secure:secure,
        httpOnly:httpOnly
    });
};

export const remove_cookies=(pageName,name)=>{
    console.log(`remove Cookies->${pageName}->${name}`);
    return cookie.remove(name,{
        path:'/',
        // expires:expires,
        // maxAge:maxAge,
        // domain:domain,
        // secure:secure,
        // httpOnly:httpOnly
    });
};

export const load_cookies=(pageName,name,doNotParse)=>{
    console.log(`load cookie->${pageName}->${name}->${cookie.load(name)}`);
    // console.log(cookie.load(name,doNotParse));
    return cookie.load(name,doNotParse);
};

export const loadAll_cookies=(pageName)=>{
    console.log(`loadAll cookies ${pageName}`);
    console.log(cookie.loadAll());
    return cookie.loadAll();
};


