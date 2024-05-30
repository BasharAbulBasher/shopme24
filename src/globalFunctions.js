export const globalFunctions={
    setAuthData:function(refresh_token,roles)
    {
        localStorage.setItem("refreshToken",refresh_token);
        localStorage.setItem("roles",JSON.stringify(roles));
    },
    deleteAuthData:function()
    {
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("roles");
    },

}