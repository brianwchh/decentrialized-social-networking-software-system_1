import React,{useState,useEffect} from 'react'
import axios from "axios";
import {blogEndPoint} from '../../../ipconfig'

import './Blog.css'
import handleError from '../../../utility/handleError.js'


const fileName =  "Blog.js"

function Blog(props) {


    const [blogList,setBlogList] = useState([])

    useEffect(() => {

        const functionName =  "useEffect"

        // get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
        const config = {
            params: {
                action : "getList"
            },
            headers : {
                'Content-Type': 'application/json', 
            }
        }

        
        // get blog list from server, 
        axios 
            .get(blogEndPoint,
                config
            )
            .then(res => {
                if (res.data.isSuccess === true) {
                    console.log(res.data)
                    setBlogList(res.data.querySet)
                }
            })
            .catch (error => {
                handleError(error,fileName,functionName)
            })
            

        return () => {
            
        }
    }, [])
    

    useEffect(() => {
        
        for (let i=0; i<blogList.length; ++i){
            let blogWrapperDiv = document.createElement('div')
            blogWrapperDiv.className = 'blogWrapper'
            let timeAndTitleDiv = document.createElement('div')
            timeAndTitleDiv.className = 'timeAndTitle'
            let dateP = document.createElement('p')
            dateP.className = 'date'

            let dateSpan = document.createElement('span')
            const datetime = new Date(blogList[i].createdAt)
            dateSpan.innerHTML = `${datetime.getFullYear()}-${datetime.getMonth()}-${datetime.getDate()}  \
                                  ${datetime.getHours()}:${datetime.getMinutes()}:${datetime.getSeconds()}`
            dateP.appendChild(dateSpan)
            timeAndTitleDiv.appendChild(dateP)

            let titleP = document.createElement('p')
            titleP.className = 'title'
            titleP.innerHTML= blogList[i].title 
            timeAndTitleDiv.appendChild(titleP)

            let contentDiv = document.createElement('div')
            contentDiv.className = 'content'
            contentDiv.innerHTML = blogList[i].content ;


            blogWrapperDiv.appendChild(timeAndTitleDiv)
            blogWrapperDiv.appendChild(contentDiv)
            document.getElementsByClassName("blogRoot")[0].appendChild(blogWrapperDiv)

            console.log(blogList[i].createdAt)
        }

    }, [blogList])


    return (

        <div className='blogRoot'>

        </div>
    )
}

export default Blog
