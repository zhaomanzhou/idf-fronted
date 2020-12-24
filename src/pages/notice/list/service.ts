import request from "@/utils/request";
import api from "@/utils/api";



const fetchNotificationList = async () =>{
    return await request.get(api.user_api.getNotificationList, {});
}


export default {
    fetchNotificationList,
}
