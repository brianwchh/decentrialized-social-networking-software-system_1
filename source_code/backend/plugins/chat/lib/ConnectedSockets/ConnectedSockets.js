/**
 *  websocketUrl+hisID should be enough to identify a connected socket ? what if another one carrying the same websocket and 
 *  hisID, before replace the former one, should send a verify info. for stranger, it is enough. 
 * 
 *  1. for each incoming websocket connection request, if token belongs to users, create dictionary like so 
 *          socket_conn['category'] = "user"
 *          socket_conn['user_id'] = user_id  in database  // used to identify who you are 
 *          socket_conn['socketUrl'] = 
 *          socket_conn['hisId']
 *   userConnList   =    {
 *                          user_id :  socket_conn    // used for server to identify where you are
 *          
 *               } 
 * 
 *  2. for each incoming websocket connection request, if token belongs to contact, create dictionary like so 
 *          socket_conn['category'] = "contact"
 *          socket_conn['contact_id'] = contact_id in database  // used to identify who he is 
 *          socket_conn['socketUrl'] = 
 *          socket_conn['hisId']
 *   contactConnList   =    {
 *                          contact_id :  socket_conn    // used for server to identify where he is 
 * }
 * 
 *  3. for each incoming websocket connection request, withou token, if permitted, create dictionary like so 
 *          socket_conn['category'] = "stranger"
 *          socket_conn['stranger_id'] = "websocketUrl+ID"   // used to identify who he is 
 *          socket_conn['socketUrl'] = 
 *          socket_conn['hisId']
 *   contactConnList   =    {
 *                          "websocketUrl+ID" :  socket_conn    // used for server to identify where he is 
 * }
 * 
 * 
 */


/**
 *   
 *  userConnDict = {
 *          user_id :  socket_conn  
 * 
 *    }
 *  
 */
export const userConnDict = { }  


/**
 *   
 *  contactConnDict = {
 *          contact_id :  {
 *                              as_client : socket_conn_asClient2ThisServer ,
 *                              as_master : socket_conn_asMaster2ThisServer ,
 *                      }
 * 
 *    }
 *  
 */
export const contactConnDict = { }  



/**
 *   
 *  strangerConnDict = {
 *          "websocketUrl+ID" :  {
 *                              as_client : socket_conn_asClient2ThisServer ,
 *                              as_master : socket_conn_asMaster2ThisServer ,
 *                      }
 * 
 *    }
 *  
 */
export const strangerConnDict = { }  







