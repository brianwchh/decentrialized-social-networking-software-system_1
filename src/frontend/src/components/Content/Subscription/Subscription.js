import React,{useState,useEffect} from 'react'
import axios from "axios";
import {subscriptionENdPoint} from '../../../ipconfig'

import './Subscription.css'
import handleError from '../../../utility/handleError.js'

import getSafeProperty from '../../../utility/getSafeProperty'


const fileName =  "Subscription.js"

function Subscription(props) {

    const [subscriptionUrlList,setSubscriptionUrlList] = useState([])
    const [thumbnailTextArray,setThumbnailTextArray] = useState([])

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
            .get(subscriptionENdPoint,
                config
            )
            .then(res => {
                if (res.data.isSuccess === true) {
                    let api_url_array = []
                    for (let i = 0; i < res.data.querySet.length; i++) {
                        api_url_array.push(res.data.querySet[i].api_url)
                    }
                    setSubscriptionUrlList(api_url_array)
                }
            })
            .catch (error => {
                handleError(error,fileName,functionName)
            })
            

        return () => {
            
        }
    }, [])


    useEffect(() => {

        if (subscriptionUrlList.length) {

            let axiosGetArray = []
            const config = {
                params: {
                    
                },
                headers: {
                    'Content-Type': 'application/json',
                }
            }

            for(let i = 0; i < subscriptionUrlList.length; i++){
                const newPromise = axios({
                    method: 'get',
                    url: subscriptionUrlList[i], 
                    config: config
                })
                axiosGetArray.push(newPromise)
            }

            axios.all(
                axiosGetArray
            ).then(axios.spread((...response) => {
                // Both requests are now complete

                let textArray = []

                for (let i = 0; i < response.length; i++) {
                    const obj = {}

                    console.log(response[i])

                    if (response[i].data.isSuccess === false ){
                        break;
                    }
                    obj['sSuccess'] = response[i].data.isSuccess
                    obj['imageList']  = response[i].data.imageList
                    obj['page_url']  = response[i].data.page_url 
                    obj['text']  = response[i].data.text 

                    textArray.push(obj)
                }
                setThumbnailTextArray(textArray)

                // todo : get the text data and display it as flex box 

            })).catch(errors => {
                handleError(errors,fileName,'')
            })

            return () => {

            }
        }

    }, [subscriptionUrlList])
    

    /**
     *  html file
     * 
     *  <div className="subscriptionRoot"> 
     *      <div className="blogWrapper"> 
     *          <div className="content">
     *                {thumbnailTextArray[i].text}
     *          </div>
     *          <a className="readmore" href={thumbnailTextArray[i].page_url}>
     *              readmore
     *          </a>
     *      </div>
     *  </div> 
     * 
     */

    useEffect(() => {
        
        for (let i=0; i<thumbnailTextArray.length; ++i){

            let contentDiv = document.createElement('div')
            contentDiv.className = 'content'
            contentDiv.innerHTML = thumbnailTextArray[i].text;

            let atag = document.createElement('a')
            atag.href = thumbnailTextArray[i].page_url;
            atag.className = 'readmore'
            atag.innerHTML = 'readmore'


            let blogWrapperDiv = document.createElement('div')
            blogWrapperDiv.className = 'blogWrapper'
            blogWrapperDiv.appendChild(contentDiv)
            blogWrapperDiv.appendChild(atag)
            document.getElementsByClassName("subscriptionRoot")[0].appendChild(blogWrapperDiv)

        }

    }, [thumbnailTextArray])


    return (

        <div className='subscriptionRoot'>

        </div>
    )
}

export default Subscription
