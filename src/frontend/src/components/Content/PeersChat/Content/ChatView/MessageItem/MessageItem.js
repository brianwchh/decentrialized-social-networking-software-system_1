import React from 'react'

function MessageItem() {
    
    const messageArray = [
        {
            FROM : '李雷',
            TO   :  '韓梅梅',
            DATA :  'IMU'
        },
        {
            FROM : '韓梅梅',
            TO   :  '李雷',
            DATA :  'IMU2'
        },
        {
            FROM : '李雷',
            TO   :  '韓梅梅',
            DATA :  'IMU'
        },
        {
            FROM : '韓梅梅',
            TO   :  '李雷',
            DATA :  'IMU2'
        },
        {
            FROM : '李雷',
            TO   :  '韓梅梅',
            DATA :  'IMU'
        },
        {
            FROM : '韓梅梅',
            TO   :  '李雷',
            DATA :  'IMU2'
        },
        {
            FROM : '李雷',
            TO   :  '韓梅梅',
            DATA :  'IMU'
        },
        {
            FROM : '韓梅梅',
            TO   :  '李雷',
            DATA :  'IMU2'
        },
        {
            FROM : '李雷',
            TO   :  '韓梅梅',
            DATA :  'IMU'
        },
        {
            FROM : '韓梅梅',
            TO   :  '李雷',
            DATA :  'IMU2'
        },
        {
            FROM : '李雷',
            TO   :  '韓梅梅',
            DATA :  'IMU'
        },
        {
            FROM : '韓梅梅',
            TO   :  '李雷',
            DATA :  'IMU2'
        },
        {
            FROM : '李雷',
            TO   :  '韓梅梅',
            DATA :  'IMU'
        },
        {
            FROM : '韓梅梅',
            TO   :  '李雷',
            DATA :  'IMU2'
        },
        {
            FROM : '李雷',
            TO   :  '韓梅梅',
            DATA :  'IMU'
        },
        {
            FROM : '韓梅梅',
            TO   :  '李雷',
            DATA :  'IMU2'
        },
        {
            FROM : '李雷',
            TO   :  '韓梅梅',
            DATA :  'IMU'
        },
        {
            FROM : '韓梅梅',
            TO   :  '李雷',
            DATA :  'IMU2'
        },
        {
            FROM : '李雷',
            TO   :  '韓梅梅',
            DATA :  'IMU'
        },
        {
            FROM : '韓梅梅',
            TO   :  '李雷',
            DATA :  'IMU2'
        },
        {
            FROM : '李雷',
            TO   :  '韓梅梅',
            DATA :  'IMU'
        },
        {
            FROM : '韓梅梅',
            TO   :  '李雷',
            DATA :  'IMU2'
        },
        {
            FROM : '李雷',
            TO   :  '韓梅梅',
            DATA :  'IMU'
        },
        {
            FROM : '韓梅梅',
            TO   :  '李雷',
            DATA :  'IMU2'
        },
        {
            FROM : '李雷',
            TO   :  '韓梅梅',
            DATA :  'IMU'
        },
        {
            FROM : '韓梅梅',
            TO   :  '李雷',
            DATA :  'IMU2'
        },
        {
            FROM : '李雷',
            TO   :  '韓梅梅',
            DATA :  'IMU'
        },
        {
            FROM : '韓梅梅',
            TO   :  '李雷',
            DATA :  'IMU2'
        },
        {
            FROM : '李雷',
            TO   :  '韓梅梅',
            DATA :  'IMU'
        },
        {
            FROM : '韓梅梅',
            TO   :  '李雷',
            DATA :  'IMU2'
        },
        {
            FROM : '李雷',
            TO   :  '韓梅梅',
            DATA :  'IMU'
        },
        {
            FROM : '韓梅梅',
            TO   :  '李雷',
            DATA :  'IMU2'
        },
        {
            FROM : '李雷',
            TO   :  '韓梅梅',
            DATA :  'IMU'
        },
        {
            FROM : '韓梅梅',
            TO   :  '李雷',
            DATA :  'IMU2'
        },
    ]

    let msgItem = (
        messageArray.map((msg,index) => {
            if (msg.FROM === '李雷') {
                let contentDiv = document.createElement('div')
                contentDiv.className = 'content'
                contentDiv.innerHTML = blogList[i].content ;
            }
        })
    )


    return (
        <div className='messageItemRoot'>
            
        </div>
    )
}

export default MessageItem
