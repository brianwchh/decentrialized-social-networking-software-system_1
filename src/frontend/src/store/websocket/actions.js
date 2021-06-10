import * as actionTypes from './actionTypes'

import {config_json} from '../../global_config'
import {
    wsuri,
} from "../../ipconfig"

import webSocketEvents from './utility/webSocketEvents'
import asyncDelay from '../../utility/asyncDelay';

const createWebsocket = (websocketConn) => {
    return {
      type: actionTypes.WEBSOCKET_CREATE ,
      data: {
        websocketConn : websocketConn
      }
    };
};

const destroyWebsocket = () => {
    return {
      type: actionTypes.WEBSOCKET_DESTROY ,
      data: {
        websocketConn : null
      }
    };
};

const selectContact = (selectedContact) => {

  return {
    type: actionTypes.WEBSOCKET_SELECT_CONTACT ,
    data: {
      isGroupChat : false,
      isMyChatRoom : false,
      isContactChat: true,
      selectedContact : selectedContact
    }
  }

}

const selectGroup = (selectedGroup) => {

  return {
    type: actionTypes.WEBSOCKET_SELECT_GROUP ,
    data: {
      isGroupChat : true,
      isMyChatRoom : false ,
      isContactChat: false,
      selectedGroup : selectedGroup
    }
  }

}

const selectChatRoom = (selectedChatRoom) => {

  return { 
    type: actionTypes.WEBSOCKET_SELECT_MYCHATROOM ,
    data: {
      isGroupChat : false,
      isMyChatRoom : true ,
      isContactChat: false ,
      selectedChatRoom : selectedChatRoom
    }
  }

} 


const setIsExpandChatMenu = (isExpandMenu) => {
  return { 
    type: actionTypes.WEBSOCKET_SET_ISEXPANDMENU ,
    data: {
      isExpandMenu : isExpandMenu,
    }
  }
}

const setNewMsgToggle = (newMsgReadyToggle) => {
  return {
    type : actionTypes.WEBSOCKET_NEWMESSAGE ,
    data: {
      newMsgReadyToggle: newMsgReadyToggle
    }
  }
}

const setWebRTCmediaCallState = (mediaCallState) => {

  return {
    type : actionTypes.WEBRTC_SET_MEDIACALLSTATE ,
    data: {
      mediaCallState: mediaCallState
    }
  }
}

const setWebRTCstreamRef = (localStream_ref , remoteStream_ref) => {
  return {
    type : actionTypes.WEBRTC_SET_STREAM_REF ,
    data: {
      localStream_ref  : localStream_ref,
      remoteStream_ref : remoteStream_ref
    }
  }
}

const setContactList = (allContactList_keyIsIpId) => {
  return {
    type : actionTypes.WEBSOCKET_SET_CONTACTLIST ,
    data: {
      allContactList_keyIsIpId : allContactList_keyIsIpId
    }
  }
}

const setIsShowPanel = (isShowPanel) => {

  return {
    type : actionTypes.WEBSOCKET_SET_ISSHOWPANEL ,
    data: {
      isShowPanel : isShowPanel
    }
  }

}

export const saveWebsocketConn2StoreAction =  (websocketConn) => {

    return dispatch => {
        dispatch(createWebsocket(websocketConn));
    }

}

export const destroyWebsocketAction = () => {
    return dispatch => {
        dispatch(destroyWebsocket());
    }
}


export const selectContactAction = (selectedContact) => {

  return dispatch => {
    dispatch(selectContact(selectedContact));
  }

}

export const selectGroupAction = (selectedGroup) => {

  return dispatch => {
    dispatch(selectGroup(selectedGroup));
  }

}

export const selectMyChatRoomAction = (selectedChatRoom) => {

  return dispatch => {
    dispatch(selectChatRoom(selectedChatRoom));
  }

}

export const setIsExpandChatMenuAction = (isExpandMenu) => {

  return dispatch => {
    dispatch(setIsExpandChatMenu(isExpandMenu));
  }

}

export const setNewMsgToggleAction = (newMsgReadyToggle) => {
  return dispatch => {
    dispatch(setNewMsgToggle(newMsgReadyToggle))
  }
}

export const setWebRTCmediaCallStateAction = (mediaCallState) => {
  return dispatch => {
    dispatch(setWebRTCmediaCallState(mediaCallState))
  }
}

export const setWebRTCstreamRefAction = (localStreamRef,remoteStreamRef) => {
  return dispatch => {
    dispatch(setWebRTCstreamRef(localStreamRef,remoteStreamRef))
  }
}

export const setContactListAction = (allContactList_keyIsIpId) => {
  return dispatch => {
    dispatch(setContactList(allContactList_keyIsIpId))
  }
}

export const setIsShowPanelAction = (isShowPanel) => {
  return dispatch => {
    dispatch(setIsShowPanel(isShowPanel))
  }
}




