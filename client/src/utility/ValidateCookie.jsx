import { useCookies } from "react-cookie";
import { setProfile } from "@/redux/slices/MyProfile";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "@/redux/slices/ModeSlice";

export default function ValidateCookie(isTokenRequired, navigate) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.Profile);
  const [cookie] = useCookies(["WS_TOKEN"]);
  const token = cookie.WS_TOKEN;

  if(token && Object.keys(profile).length == 0){
    // Set to redux store for global access
    const decode = jwtDecode(token);
    dispatch(setProfile(decode));
    dispatch(setMode(decode['0'].role));
  } 

  if (isTokenRequired) {
    if (token == undefined || token == "" || JSON.stringify(token) == "{}") {
      console.log(isTokenRequired, navigate, token);
      window.location.href = navigate;
    }
  } else {
    if (token != undefined) {
      window.location.href = navigate;
    }
  }
}
