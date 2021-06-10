import React,{useState,useEffect} from 'react'
import Contact from '../Contact/Contact'
import Group  from '../Group/Group'
import './Panel.css'
import DropDownList from '../DropDownList/DropDownList'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios'
import {contactEndPoint,
        chatRoomEndPoint,
        hostIP,
        wsuri,
        my_wsuri,
        hostDomain
    } from '../../../../../../ipconfig'
import {config_json} from '../../../../../../global_config'
import getSafeProperty from '../../../../../../utility/getSafeProperty'
import handleError from '../../../../../../utility/handleError'
import { connect } from 'react-redux';
import { 
    authCheckTokenVaidAction,
    authLogoutAction
    } from '../../../../../../store/auth/actions'

import { 
    selectContactAction,
    selectGroupAction,
    selectMyChatRoomAction,
    setContactListAction,
    setIsShowPanelAction
    } from '../../../../../../store/websocket/actions'
    
import * as actionType  from '../../../../../../store/auth/actionTypes'
import asyncDelay from '../../../../../../utility/asyncDelay'
import ContactCategorySel from './ContactCategorySel/ContactCategorySel'
import getSafePropertyWithAlert from '../../../../../../utility/getSafePropertyWithAlert'
import AddIcon from '@material-ui/icons/Add';

import {
    selectedContactObj,
    selectedGroupObj,
    selectedChatroomObj,      
    allContactObj,
    allGroupObj,
    allChatroomObj,
    me      
} from '../../../../../NavigationBar/Menu/PeersChatMenu/websocket/globalVar'


function Panel(props) {

    const fileName = "Panel.js"


    const [newContact,setNewContact] = useState({
                                            socketUrl: wsuri,
                                            id:  'HanMeiMei',
                                            name  :  "韓梅梅",
                                            image  : "meihua.png",
                                            category_id: 0 ,
                                            categoryArrayIndex: '',
                                            token2AccessHim : '',
                                            tokenAssigned2Him : ''
                                        })

    const [joinGroup,setJoinGroup] = useState({
                                            socketUrl: wsuri,
                                            id:  'MeiGroup',
                                            name  :  "韓梅梅",
                                            image  : "meihua.png",
                                        })

    const [createGroup,setCreateGroup] = useState({
                                            roomName:  'MeiGroup',
                                            image  : "meihua.png",
                                        })

    const [isAddContactShown,setIsAddContactShown] = useState(false)
    const [isAddGroupShown,setIsAddGroupShown] = useState(false)
    const [isCreateGroupShown,setIsCreateGroupShown] = useState(false)
    const [contactCategory,setContactCategory] = useState([])
    const [groupArray,setGroupArray] = useState([])
    const [chatRoomArray,setChatRoomArray] = useState([])
    const [sbDeCnt,setSbDeCnt] = useState(1)  // since React does not detect deep copied data(like loong long long array) status, need a 
                                              // signal to force the re-render,just pass it to an irrelivent html variable like (key+some number)
                                              // so when the html variable changes states,it will automatically triger a re-render
    const [contactCategoryMenuControl,setContactCategoryMenuControl] = useState([])  // each array item decides whether the corresponding category to be unfold or not
    const [selectedCategory,setSelectedCategory] = useState()
    const [newCategoryName,setNewCategoryName] = useState()



    /**
     * *****************************************************************************************************
     *   initilization at component creationg
     * 
     * *****************************************************************************************************
     */
    useEffect(() => {
        
        // setup the callback functions to assign value to the global object values 
        selectedContactObj.setSelectedContact_CB = handleSelectContact2Chat
        selectedGroupObj.setSelectedGroup_CB = handleSelectGroup2Chat
        selectedChatroomObj.setSelectedChatroom_CB = handleSelectMyGroup2Chat

        // all contact, all group, all chatroom global object, set callback function
        allGroupObj['setAllGroup_CB'] = setAllGroup_CB 
        allChatroomObj['setAllChatroom_CB'] = setAllChatroom_CB 

        // webRTC_global
        // webRTC_global.setIsIncallStoreAction_cb = props.setisInMediaCallAction 

        // get all contact list from backend 
        // getAllContactList();
        
        return () => {
            
        }
    }, [])
    

    /**
     * 
     *  const allContactObj = {
            allContact : null ,
            setAllContact_CB : null 
        }
     *  sectAllContact_CB 
     */

    /**
     * 
     *  const allContactObj = {
            allContact : null ,
            setAllContact_CB : null 
        }
     *  sectAllContact_CB 
     */

    const setAllGroup_CB = (allGroup) => {
        allGroupObj.allGroup = allGroup
    }

    /**
     * 
     *  const allContactObj = {
            allContact : null ,
            setAllContact_CB : null 
        }
     *  sectAllContact_CB 
     */

    const setAllChatroom_CB = (allChatroom) => {
        allChatroomObj.allChatroom = allChatroom
    }
    
    /**
     * *****************************************************************************************************
     *   getContactCategoryItemList : get the contact category array
     * *****************************************************************************************************
     */
    const getContactCategoryItemList = () => {
        const funcName = getContactCategoryItemList.name

        axios
        .get(`${contactEndPoint}/category`,
                config_json  
            )
        .then( res => {
            const querySet = getSafePropertyWithAlert(()=>res.data.querySet,fileName,funcName)

            for(let i=0; i<querySet.length; i++){
                contactCategoryMenuControl.push(false)
            }
            setContactCategoryMenuControl(contactCategoryMenuControl)
            
            setContactCategory(querySet)

            const querySetLen = getSafePropertyWithAlert(()=>querySet.length,fileName,funcName)
            if (querySetLen != 0) {
                const selectedCategory = getSafePropertyWithAlert(()=>querySet[0],fileName,funcName)
                setSelectedCategory(selectedCategory.name)
                // intially set selected category to be the first one in the list 
                newContact.categoryArrayIndex = 0 
                newContact.category_id = selectedCategory.id
                setNewContact(newContact)
            }

        })
        .catch(error => {

            handleError(error,fileName,funcName,"getContactCategoryItemList",props.authLogoutAction)
            
        })

    }


    /**
     * *****************************************************************************************************
     *   getContactListByCategory  : get contact array from backend server for the selected category
     * 
     * @param { * contactCategory[index], this is needed for updating the Array accordingly,contactCategory[index].contactArray = querySet } index   
     * @param {* category_id = contactCategory[index].id } category_id 
     * 
     *
     * *****************************************************************************************************
     */
    const getContactListByCategory = (index, category_id)  => {

        const funcName = "getContactListByCategory"

        const token = localStorage.getItem('token')
        const url = `${contactEndPoint}/?token=${token}&category_id=${category_id}`

        axios
        .get(url,
                config_json  
            )
        .then( res => {

            const querySet = getSafeProperty(()=>res.data.querySet, undefined)
            if (querySet  == undefined) {
                alert('@Panel.js getItemList , querySet is undefined')
            }

            contactCategory[index].contactArray = querySet
            setContactCategory(contactCategory)

        })
        .catch(error => {

            handleError(error,"Panel.js","getContactCategoryItemList",props.authLogoutAction)
        })
    }

    

     /**
     * *****************************************************************************************************
     *   getGroupItemList : get the group list from backend server
     * 
     * *****************************************************************************************************
     */
    const getGroupItemList = () => {
        const token = localStorage.getItem('token')
        axios
        .get(`${contactEndPoint}/group?token=${token}`,
                config_json  
            )
        .then( res => {
            const querySet = getSafeProperty(()=>res.data.querySet, undefined)
            if (querySet  == undefined) {
                alert('@Panel.js getGroupItemList , querySet is undefined')
            }
            // console.log("getGroupItemList = ", querySet)
            setGroupArray(querySet)

        })
        .catch(error => {

            handleError(error,"Panel.js","getGroupItemList",props.authLogoutAction)
            
        })

    }

    /**
     * *****************************************************************************************************
     *   getMyChatRoomList : get my chat room list from backend server
     * 
     * *****************************************************************************************************
     */
    const getMyChatRoomList = () => {

        const functionName = "getMyChatRoomList"

        const token = localStorage.getItem('token')
        axios
        .get(`${chatRoomEndPoint}?token=${token}`,
                config_json  
            )
        .then( res => {
            const querySet = getSafeProperty(()=>res.data.querySet, undefined)
            if (querySet  == undefined) {
                alert(`@${fileName}, ${functionName} querySet is undefined`)
            }
            setChatRoomArray(querySet)

        })
        .catch(error => {

            handleError(error,fileName,functionName)
            
        })

    }
     /**
     * *****************************************************************************************************
     *   handleAddNewContactRequest : add new contact to backend server
     * 
     * *****************************************************************************************************
     */
    const handleAddNewContactRequest = async (e) => {
        e.preventDefault();

        const functionName = "handleAddNewContactRequest"

        console.log(fileName, functionName,"newContact = ",newContact)

        props.authCheckTokenVaidAction()
        const token = localStorage.getItem('token')

        const formDataObj = {
            name : newContact.name,
            hisID : newContact.id ,
            webSocketUrl : newContact.socketUrl,
            image : newContact.image,
            category_id : newContact.category_id,
            tokenAssigned2Him : newContact.tokenAssigned2Him,
            token2AccessHim : newContact.token2AccessHim
        }

        console.log(fileName, functionName,"formDataObj = ",formDataObj)

        axios
        .post(`${contactEndPoint}?token=${token}`,
                                    JSON.stringify(formDataObj),
                                    config_json  
                                    )
        .then( res => {
            // if no error return, update the new category list 
            getContactListByCategory(newContact.categoryArrayIndex,newContact.category_id)
        })
        .catch(error => {
            handleError(error,fileName,functionName,props.authLogoutAction)
        })

        await asyncDelay(0.3)
        if (sbDeCnt > 2000){
            setSbDeCnt(1000)
        } else {
            setSbDeCnt(sbDeCnt + 1)
        }

    }

    /**
     * *****************************************************************************************************
     *   handleOnChangeAddNewContact : handles the input form data onchange when trying to add new contact
     * 
     * *****************************************************************************************************
     */
    const handleOnChangeAddNewContact = (e) => {
        e.preventDefault()
        const name = e.target.name ;
        const value = e.target.value ;
        setNewContact( {...newContact , ...{[name] : value}})
    }
    
    /**
     * *****************************************************************************************************
     *   handleOnChangeAddNewGroup : handles the input form data onchange when trying to add new group
     * 
     * *****************************************************************************************************
     */
    const handleOnChangeAddNewGroup = (e) => {
        e.preventDefault()
        const name = e.target.name ;
        const value = e.target.value ;
        setJoinGroup( {...joinGroup , ...{[name] : value}})
    }

    /**
     * *****************************************************************************************************
     *   handleOnChangeAddNewGroup : handles the input form data onchange when trying to add new group
     * 
     * *****************************************************************************************************
     */
    const handleOnChangeCreateGroup = (e) => {
        e.preventDefault()
        const name = e.target.name ;
        const value = e.target.value ;
        setCreateGroup( {...createGroup , ...{[name] : value}})
    }

    /**
     * *****************************************************************************************************
     *   handleOnClickShowAddContact : controls the drop down menu of adding new contact
     * 
     * *****************************************************************************************************
     */
    const handleOnClickShowAddContact = () => {
        setIsAddContactShown(!isAddContactShown)
    }

    /**
     * *****************************************************************************************************
     *   handleOnExpandContactListSection : when click on the expand icon, fetech contact category list from backend server ,
     *   similar to fetching contact data of certain category, await for 0.3sec, and update key of html to force 
     *   re-render when data is ready
     * 
     * *****************************************************************************************************
     */
    const handleOnExpandContactListSection = async () => {

        if (props.login_status == actionType.LOGIN_STATUS_SUCCEED){
            // validate if token still valid, keep it as an usual routine before requesting private data from backend. 
            props.authCheckTokenVaidAction() 
            getContactCategoryItemList()

            await asyncDelay(0.3)

            if (sbDeCnt > 2000){
                setSbDeCnt(1)
            } else {
                setSbDeCnt(sbDeCnt + 1)
            }
        } else {
            
        }
    }

    /**
     * *****************************************************************************************************
     *   handleOnExpandGroupList : when click on the expand icon, fetech group list from backend server ,
     *   similar to fetching contact data of certain category, await for 0.3sec, and update key of html to force 
     *   re-render when data is ready
     * 
     * *****************************************************************************************************
     */
    const handleOnExpandGroupList = async () => {

        if (props.login_status == actionType.LOGIN_STATUS_SUCCEED){
            // validate if token still valid, keep it as an usual routine before requesting private data from backend. 
            props.authCheckTokenVaidAction() 
            getGroupItemList()

            await asyncDelay(0.3)

            if (sbDeCnt > 2000){
                setSbDeCnt(1000)
            } else {
                setSbDeCnt(sbDeCnt + 1)
            }
        } else {
            setGroupArray([])
        }
    }

    /**
     * *****************************************************************************************************
     *   handleOnExpandMyChatRoomList : 
     * *****************************************************************************************************
     */
    const handleOnExpandMyChatRoomList = async () => {

        if (props.login_status == actionType.LOGIN_STATUS_SUCCEED){
            // validate if token still valid, keep it as an usual routine before requesting private data from backend. 
            props.authCheckTokenVaidAction() 
            getMyChatRoomList()

            await asyncDelay(0.3)

            if (sbDeCnt > 2000){
                setSbDeCnt(1000)
            } else {
                setSbDeCnt(sbDeCnt + 1)
            }
        } else {
            setChatRoomArray([])
        }
    }

    /**
     * *****************************************************************************************************
     *   handleOnClickShowAddGroup : controls the drop down menu of adding new group
     * 
     * *****************************************************************************************************
     */
    const handleOnClickShowAddGroup = () => {
        setIsAddGroupShown(!isAddGroupShown)

    }

    /**
     * *****************************************************************************************************
     *   handleOnClickShowCreateGroup : controls the drop down menu of adding new group
     * 
     * *****************************************************************************************************
     */
    const handleOnClickShowCreateGroup = () => {
        setIsCreateGroupShown(!isCreateGroupShown)
    }

    /**
     * *****************************************************************************************************
     *   handleOpenMenuCallBack : click to open the contact list under the selected category
     * 
     * @param {*} index 
     * @param {*} category_id 
     * 
     * *****************************************************************************************************
     */
    const handleOpenMenuCallBack = async (index,category_id) => {

        console.log(index,category_id)

        contactCategoryMenuControl[index] = !contactCategoryMenuControl[index] // unfold or fold the selected category
        setContactCategoryMenuControl(contactCategoryMenuControl)

        if (props.login_status == actionType.LOGIN_STATUS_SUCCEED){
            // validate if token still valid, keep it as an usual routine before requesting private data from backend. 
            props.authCheckTokenVaidAction() 

            getContactListByCategory(index, category_id)  // get the contact list under the clicked category

            await asyncDelay(0.3);  // wait 0.3s, since currently I don't know how to trigger allback function 
                                    // after the state has changed
                                    // 感覺像是一個bug，大的數據改變之後怎麼去啓動回調函數？
                                    // 
                                    /**    問題： 
                                     *      contactCategory[index].contactArray = querySet
                                     * 
                                     *     // useEffect(() => {

                                            //     console.log("contactCategory , change detected .....")

                                            //     return () => {
                                                    
                                            //     }
                                            // }, [contactCategory])

                                            不懂內部觸發機制，contactCategory[index].contactArray這種深層拷貝的數據變化似乎是比較難用簡單的
                                            數據對比來做回調函數的觸發，本身大量數據對比就是一個很好時間的過程。沒有程序的中斷機制，這應該是一個javascrip無法
                                            解決的問題？？？？！

                                            這裏採用一種瞎折騰的方式，先等一點時間，0.3s,然後再用計數器的方式，改變html的key的值，強迫它重新render。如此，強迫rener時
                                            數據應該就更新完成了。
                                     */

            if (sbDeCnt > 2000){
                setSbDeCnt(1)
            } else {
                setSbDeCnt(sbDeCnt + 1)
            }

        }

    }

    /**
     * *****************************************************************************************************
     *   handleSelectCategoryToNewContact  : select the category name for a new contact 
     * 
     * @param { * category model in database: id, name } category   
     * @param { * index in the category Array for this category selected  } index 
     * 
     *
     * *****************************************************************************************************
     */
    const handleSelectCategoryToNewContact = (category,index) => {

        console.log(category, index)
        
        setSelectedCategory(category.name)
        newContact.categoryArrayIndex = index 
        newContact.category_id = category.id
        setNewContact(newContact)
    }

    /**
     * *****************************************************************************************************
     *   handleAddNewCategoryOnInputChange 
     * 
     * *****************************************************************************************************
     */
    const handleAddNewCategoryOnInputChange = (e) => {
        e.preventDefault()
        const value = e.target.value ;
        setNewCategoryName(value)
    }

    /**
     * *****************************************************************************************************
     *   handleSubmitAddNewContactCategoryToserver 
     * 
     * *****************************************************************************************************
     */
    const handleSubmitAddNewContactCategoryToserver = () => {
        const functionName = "handleSubmitAddNewContactCategoryToserver"

        props.authCheckTokenVaidAction()
        const token = localStorage.getItem('token')

        const formDataObj = {
            name : newCategoryName
        }

        axios
        .post(`${contactEndPoint}/category?token=${token}`,
                                    JSON.stringify(formDataObj),
                                    config_json  
                                    )
        .then( res => {
            // if no error return, update the new category list 
            getContactCategoryItemList()
        })
        .catch(error => {
            handleError(error,fileName,functionName,props.authLogoutAction)
        })

    }

    /**
     * *****************************************************************************************************
     *   handleAddNewGroupRequest 
     * 
     * *****************************************************************************************************
     */
    const handleAddNewGroupRequest = async (e) => {
        e.preventDefault();

        const functionName = "handleAddNewGroupRequest"

        props.authCheckTokenVaidAction()
        const token = localStorage.getItem('token')

        const formDataObj = {
            name : joinGroup.name,
            hisID : joinGroup.id ,
            webSocketUrl : joinGroup.socketUrl,
            image : joinGroup.image,
        }

        axios
        .post(`${contactEndPoint}/group?token=${token}`,
                                    JSON.stringify(formDataObj),
                                    config_json  
                                    )
        .then( res => {
            // if no error return, update the new category list 
            getGroupItemList()
        })
        .catch(error => {
            handleError(error,fileName,functionName,props.authLogoutAction)
        })

        await asyncDelay(0.3)
        if (sbDeCnt > 2000){
            setSbDeCnt(1000)
        } else {
            setSbDeCnt(sbDeCnt + 1)
        }
    }


    /**
     * *****************************************************************************************************
     *   handleCreateNewGroupRequest 
     * 
     * *****************************************************************************************************
     */
    const handleCreateNewGroupRequest = async (e) => {
        e.preventDefault();

        const functionName = "handleCreateNewGroupRequest"

        props.authCheckTokenVaidAction()
        const token = localStorage.getItem('token')

        const formDataObj = {
            roomName : createGroup.roomName,
            image    : createGroup.image,
        }

        axios
        .post(`${chatRoomEndPoint}/?token=${token}`,
                                    JSON.stringify(formDataObj),
                                    config_json  
                                    )
        .then( res => {
            // if no error return, update the new category list 
            getMyChatRoomList()
        })
        .catch(error => {
            handleError(error,fileName,functionName,props.authLogoutAction)
        })

        await asyncDelay(0.3)
        if (sbDeCnt > 2000){
            setSbDeCnt(1000)
        } else {
            setSbDeCnt(sbDeCnt + 1)
        }
    }

    /**
     * *****************************************************************************************************
     *   handleSelectContact2Chat:  select the contact to chat with, set the selected contact so in other 
     *   view can change the view accordingly  
     * 
     * *****************************************************************************************************
     */

    const handleSelectContact2Chat = (selectedContact) => {
        selectedContactObj.selectedContact = selectedContact
        props.selectContactAction(selectedContact)
        props.setIsShowPanelAction(false) // show chat view instead of panel of contact and group list
    }

    /**
     * *****************************************************************************************************
     *   handleSelectGroup2Chat:  select the group to chat with, set the selected contact so in other 
     *   view can change the view accordingly  
     * 
     * *****************************************************************************************************
     */
    const handleSelectGroup2Chat = (selectedGroup) => {
        props.selectGroupAction(selectedGroup)
        props.setIsShowPanelAction(false) // show chat view instead of panel of contact and group list
    }

    useEffect(() => {
        selectedContactObj.selectedGroup = props.selectedGroup // assign to global variable for websocket function to get access to
        return () => {
            
        }
    }, [props.selectedGroup])


    /**
     * *****************************************************************************************************
     *   handleSelectMyGroup2Chat:  select the chatroom I have create to chat with, set the selected contact so in other 
     *   view can change the view accordingly  
     * 
     * *****************************************************************************************************
     */
    const handleSelectMyGroup2Chat = (selectedChatRoom) => {
        props.selectMyChatRoomAction(selectedChatRoom)
        props.setIsShowPanelAction(false) // show chat view instead of panel of contact and group list
    }

    useEffect(() => {
        selectedContactObj.selectedChatRoom = props.selectedChatRoom // assign to global variable for websocket function to get access to
        return () => {
            
        }
    }, [props.selectedChatRoom])


    /**
     * *****************************************************************************************************
     *   update the new massage notification icon when new message comes in
     * 
     * *****************************************************************************************************
     */
    useEffect(() => {
        
        return () => {
            
        }
    }, [props.newMsgReadyToggle])


    return (

        <div className='panelRoot'>
            <input className='searchBar' type='text' placeholder='Search' />
            <div className="whoAmI">
                <div className="myImageWrapper">
                    {<img src={me.userImage} alt="" />}
                </div>
                <p className="userName"> {me.myUserName} </p>
            </div>

            <div className='contactListWrapper'>
                <DropDownList menuName='Contact' style={{color:'white'}} cb={handleOnExpandContactListSection}>
                    {/* ***********************************  add new contact ******************************* */}
                    <div className='addNewContact categoryWrapper'>
                        <div className='titleNicon'>
                            <p className='title'><span>add contact</span></p>
                            <div className='iconWrapper' onClick={handleOnClickShowAddContact}>
                                <ExpandMoreIcon style={{ color: 'white', fontSize: "20px" }} />
                            </div>
                        </div>
                        <form 
                            className='dropDownContent' 
                            onSubmit={handleAddNewContactRequest} 
                            autoComplete="off"
                            style={{display: isAddContactShown == true ? 'block':'none'}}
                        >
                            <div className='wrapper'>
                                <div className='title'>
                                    <span>ws url</span>
                                </div>
                                <div className='inputWrapper'>
                                    <input 
                                        type='text' 
                                        value={newContact.socketUrl} 
                                        name='socketUrl' 
                                        placeholder='the socketURL'
                                        onChange = {handleOnChangeAddNewContact}
                                    />
                                </div> 
                            </div>
                            <div className='wrapper'>
                                <div className='title'>
                                    <span>ID</span>
                                </div>

                                <div className='inputWrapper'>
                                    <input 
                                        type='text' 
                                        value={newContact.id} 
                                        name='id' 
                                        placeholder='name or ID'
                                        onChange = {handleOnChangeAddNewContact}
                                    />
                                </div>
                            </div>
                            <div className='wrapper'>
                                <div className='title'>
                                    <span>name</span>
                                </div>

                                <div className='inputWrapper'>
                                    <input 
                                        type='text' 
                                        value={newContact.name} 
                                        name='name' 
                                        placeholder='name'
                                        onChange = {handleOnChangeAddNewContact}
                                    />
                                </div>
                            </div>
                            <div className='wrapper'>
                                <div className='title'>
                                    <span>image</span>
                                </div>

                                <div className='inputWrapper'>
                                    <input 
                                        type='text' 
                                        value={newContact.image} 
                                        name='image' 
                                        placeholder='image url of newContact'
                                        onChange = {handleOnChangeAddNewContact}
                                    />
                                </div>
                            </div>
                            <div className='wrapper'>
                                <div className='title'>
                                    <span>token1</span>
                                </div>

                                <div className='inputWrapper'>
                                    <input 
                                        type='text' 
                                        value={newContact.token2AccessHim} 
                                        name='token2AccessHim' 
                                        placeholder='token to access contact'
                                        onChange = {handleOnChangeAddNewContact}
                                    />
                                </div>
                            </div>
                            <div className='wrapper'>
                                <div className='title'>
                                    <span>token2</span>
                                </div>

                                <div className='inputWrapper'>
                                    <input 
                                        type='text' 
                                        value={newContact.tokenAssigned2Him} 
                                        name='tokenAssigned2Him' 
                                        placeholder='token given to contact'
                                        onChange = {handleOnChangeAddNewContact}
                                    />
                                </div>
                            </div>

                            {/* *******************  select category or add new category to a new contact ********************** */}
                            <div className='wrapper'>
                                <div className='title'>
                                    <span>category</span>
                                </div>
                                <div className='inputWrapper'>
                                    <ContactCategorySel 
                                        menuName = {selectedCategory}
                                    >
                                        {
                                            contactCategory.map((category,index)=>(
                                                <p className="contactCategorySel_item" 
                                                    key={index}
                                                    onClick = {()=>(handleSelectCategoryToNewContact(category,index))}
                                                >
                                                    <span>{category.name}</span>
                                                </p>
                                            ))
                                        }
                                        <div className="addNewCategory contactCategorySel_item">
                                            <div className='addNewCategoryInputWrapper'>
                                                <input 
                                                    type='text' 
                                                    value={newCategoryName} 
                                                    name='newCategoryName' 
                                                    placeholder='input a new category'
                                                    onChange = {handleAddNewCategoryOnInputChange}
                                                />
                                            </div>
                                            <div className="AddiconWrapper" onClick={handleSubmitAddNewContactCategoryToserver}>
                                                <AddIcon style={{ color: 'white', fontSize: "20px" }} />
                                            </div>
                                        </div>
                                    </ContactCategorySel>
                                </div>
                            </div>

                            <div className='submitBottonWrapper'>
                                <input type='submit' value='add' />
                            </div>
                        </form>
                    </div>
                    
                    {/* **********************************  Contact list  ********************************* */}
                    {
                        contactCategory.map((item,index) => (
                                                                <div className='categoryWrapper' key={index} >
                                                                    <div className="nameNicoWrapper">
                                                                        <p className='menuName' style={{color:'white'}}><span>{item.name}</span></p>
                                                                        <div className='iconWrapper' onClick = {()=>(handleOpenMenuCallBack(index,item.id))}>
                                                                            <ExpandMoreIcon style={{ color: 'white', fontSize: "20px" }} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="dropDownClick" style={{display: contactCategoryMenuControl[index] == false? 'none' : 'block'}} >
                                                                        {
                                                                            item.contactArray.map((contact,contact_index) => (
                                                                            <div className='contact' key={contact_index + sbDeCnt } onClick={()=>{handleSelectContact2Chat(contact)}}>
                                                                                <Contact 
                                                                                    profileImg= {contact.image} 
                                                                                    name={contact.name} 
                                                                                    unReadMsgCnt = {10}
                                                                                />
                                                                            </div>))
                                                                        }
                                                                    </div>
                                                                </div>)
                                                            )
                    }
                </DropDownList>
            </div>

            {/*  *************************************************  group   ****************************************************  */}

            {/* **************** join group ******************** */}
            <div className='groupListWrapper contactListWrapper' >
                <DropDownList menuName='Group' style={{color:'white'}} cb={handleOnExpandGroupList}>
                    <div className='addNewContact categoryWrapper'>
                        <div className='titleNicon'>
                            <p className='title'><span>join group</span></p>
                            <div className='iconWrapper' onClick={handleOnClickShowAddGroup}>
                                <ExpandMoreIcon style={{ color: 'white', fontSize: "20px" }} />
                            </div>
                        </div>
                        <form 
                            className='dropDownContent' 
                            onSubmit={handleAddNewGroupRequest} 
                            autoComplete="off"
                            style={{display: isAddGroupShown == true ? 'block':'none'}}
                        >
                            <div className='wrapper'>
                                <div className='title'>
                                    <span>ws url</span>
                                </div>
                                <div className='inputWrapper'>
                                    <input 
                                        type='text' 
                                        value={joinGroup.socketUrl} 
                                        name='url' 
                                        onChange = {handleOnChangeAddNewGroup}
                                    />
                                </div> 
                            </div>
                            <div className='wrapper'>
                                <div className='title'>
                                    <span>ID</span>
                                </div>

                                <div className='inputWrapper'>
                                    <input 
                                        type='text' 
                                        value={joinGroup.id} 
                                        name='id' 
                                        placeholder='name or ID'
                                        onChange = {handleOnChangeAddNewGroup}
                                    />
                                </div>
                            </div>
                            <div className='wrapper'>
                                <div className='title'>
                                    <span>name</span>
                                </div>

                                <div className='inputWrapper'>
                                    <input 
                                        type='text' 
                                        value={joinGroup.name} 
                                        name='name' 
                                        placeholder='name'
                                        onChange = {handleOnChangeAddNewGroup}
                                    />
                                </div>
                            </div>
                            <div className='wrapper'>
                                <div className='title'>
                                    <span>image</span>
                                </div>

                                <div className='inputWrapper'>
                                    <input 
                                        type='text' 
                                        value={joinGroup.image} 
                                        name='image' 
                                        placeholder='image url of group'
                                        onChange = {handleOnChangeAddNewGroup}
                                    />
                                </div>
                            </div>
                    
                            <div className='submitBottonWrapper'>
                                <input type='submit' value='add' />
                            </div>
                        </form>
                    </div>

                    {/* **************************************  Group list  **************************************** */}

                    {
                        groupArray.map((group,index)=>(
                            <div className='group' key={index + sbDeCnt} onClick = {() => handleSelectGroup2Chat(group)} >
                                <Group profileImg= {group.image}
                                    Name= {group.name}
                                    unReadMsgCnt='10'
                                />
                            </div>
                        ))
                    }


                    
                    
                </DropDownList>
            </div>
        
            {/* **************** my chat room ******************** */}
            <div className='groupListWrapper contactListWrapper' >
                <DropDownList menuName='MyGroup' style={{color:'white'}} cb={handleOnExpandMyChatRoomList}>
                    {/* **************** create my chat room ******************** */}
                    <div className='addNewContact categoryWrapper'>
                        <div className='titleNicon'>
                            <p className='title'><span> create group</span></p>
                            <div className='iconWrapper' onClick={handleOnClickShowCreateGroup}>
                                <ExpandMoreIcon style={{ color: 'white', fontSize: "20px" }} />
                            </div>
                        </div>
                        <form 
                            className='dropDownContent' 
                            onSubmit={handleCreateNewGroupRequest} 
                            autoComplete="off"
                            style={{display: isCreateGroupShown == true ? 'block':'none'}}
                        >
                            <div className='wrapper'>
                                <div className='title'>
                                    <span>name</span>
                                </div>

                                <div className='inputWrapper'>
                                    <input 
                                        type='text' 
                                        value={createGroup.roomName} 
                                        name='roomName' 
                                        placeholder='room name'
                                        onChange = {handleOnChangeCreateGroup}
                                    />
                                </div>
                            </div>
                            <div className='wrapper'>
                                <div className='title'>
                                    <span>image</span>
                                </div>

                                <div className='inputWrapper'>
                                    <input 
                                        type='text' 
                                        value={createGroup.image} 
                                        name='image' 
                                        placeholder='image'
                                        onChange = {handleOnChangeCreateGroup}
                                    />
                                </div>
                            </div>
                    
                            <div className='submitBottonWrapper'>
                                <input type='submit' value='create' />
                            </div>
                        </form>
                    </div>
 
                    {/* ************************************** my Group list  **************************************** */}

                    {
                        chatRoomArray.map((group,index)=>(
                            <div className='group' key={index + sbDeCnt} onClick = {() => handleSelectMyGroup2Chat(group)} >
                                <Group profileImg= {group.image}
                                    Name= {group.roomName}
                                    unReadMsgCnt='10'
                                />
                            </div>
                        ))
                    }

                </DropDownList>
            </div>
        
        </div>
    )
}

const mapStateToProps = state => {
    return {
        login_status: state.auth.status ,
        isTokenValid: state.auth.isTokenValid,
        newMsgReadyToggle : state.websocket.newMsgReadyToggle,
        selectedContact   : state.websocket.selectedContact,
        selectedChatRoom  : state.websocket.selectedChatRoom,
        selectedGroup     : state.websocket.selectedGroup
    };
};
  
  
const mapDispatchToProps = dispatch => {
    return {
        authCheckTokenVaidAction: () => dispatch(authCheckTokenVaidAction()),
        authLogoutAction: () => dispatch(authLogoutAction()),
        selectContactAction: (selectedContact) => dispatch(selectContactAction(selectedContact)),
        selectGroupAction: (selectedGroup) => dispatch(selectGroupAction(selectedGroup)),
        selectMyChatRoomAction : (selectedMyChatRoom) => dispatch(selectMyChatRoomAction(selectedMyChatRoom)),
        setContactListAction : (allContactList_keyIsIpId) =>  dispatch(setContactListAction(allContactList_keyIsIpId)),
        setIsShowPanelAction : (isShowPanel) => dispatch(setIsShowPanelAction(isShowPanel))
    };
  };

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (Panel)

