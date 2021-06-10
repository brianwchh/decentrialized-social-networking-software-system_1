import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';
import axios from 'axios'

import WangEditor from 'wangeditor'
import KityformulaMenu from './component/kityformulaMenu'
import './NewBlog.css'
import handleError from '../../../utility/handleError.js'


import { blog_newBlog_url } from '../../../ipconfig';


const fileName = "NewBlog.js"

function NewBlog(props) {
    
    const [title,setTitle] = useState('')
    const [editor,setEditor] = useState([])
    const [editorData, setEditorData] = useState([])

    useEffect(() => {

        window.editor = new WangEditor('#editorContent')
        // 获取必要的变量，这些在下文中都会用到

         // 注册菜单
        const kityformulaKey = 'kityformulaKey' // 菜单 key ，各个菜单不能重复
        window.editor.menus.extend('kityformulaKey', KityformulaMenu)

        // 将菜单加入到 editor.config.menus 中
        // 也可以通过配置 menus 调整菜单的顺序，参考【配置菜单】部分的文档
        window.editor.config.menus = window.editor.config.menus.concat(kityformulaKey)

        window.editor.config.uploadImgShowBase64 = true
        window.editor.config.uploadImgMaxLength = 5 // 一次最多上传 5 个图片
        window.editor.config.zIndex = 100
        window.editor.config.height = 500

        // 配置 onchange 回调函数，将数据同步到 vue 中
        window.editor.config.onchange = newHtml => {
            setEditorData(newHtml)
        }

        // 创建编辑器
        window.editor.create() 

        setEditor(window.editor)

        return () => {
            
                // editor.destroy()
                setEditor([])
        }

    }, [])

    const handleTitleOnChange = (e) => {
        e.preventDefault()
        const value = e.target.value ;
        setTitle(value)
    }

    const handleOnSubmit = (e) => {

        const functionName = "handleOnSubmit"

        e.preventDefault();
        
        const token = localStorage.getItem('token');

        if (!token){
            alert("please log in to post")
            return 
        }

        const formDataObj = {
            title: title,
            content: editorData ,
        }

        // post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
        const config = {
            params: {
                token : token,
            },
            headers : {
                'Content-Type': 'application/json', 
            }
        }

        axios
            .post(blog_newBlog_url,
                        JSON.stringify(formDataObj),
                        config  
                        )
            .then( res => {
                if (res.data.isSuccess === true){
                    props.history.push("/blog")
                }
            })
            .catch (error => {
                handleError(error,fileName,functionName)
            })

    }

    return (
        <form className='newBlogRoot' onSubmit={handleOnSubmit}>
            <div className='titleWrapper'>
                <input className='title' 
                    type='text' 
                    name='title' 
                    value={title} 
                    onChange={handleTitleOnChange} 
                    placeholder="input title here"
                />
                <input className='submit' type='submit' value='submit' />
            </div>
            <div id='editorContent'>

            </div>
        </form>
    )
}

const mapStateToProps = state => {
    return {
        // loading: state.auth.loading,
        // error: state.auth.error,
        // data: state.auth.data,
        // token: state.auth.token,
        // isTokenValid: state.auth.isTokenValid
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        // createEditor: () => dispatch(eidtorCreateAction())
    };
  };

//   const mapDispatchToProps = dispatch => {
//     return {
//         login: (username,password) => dispatch(authLoginAction(username,password)),
//         loginFailed: () => dispatch(authLoginFailedAction()),
//         clearStates: () => dispatch(authResetStateAction()),
//         authCheckTokenVaidAction: (token) => dispatch(authCheckTokenVaidAction(token)),
//     };
//   };

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (NewBlog)

