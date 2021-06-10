import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';

import './FollowMe.css'


import { blog_newBlog_url , hostDomain} from '../../../ipconfig';


const fileName = "FollowMe.js"

function FollowMe(props) {

    return (
        <form className='followMeRoot' >
            <div className="container">
                <p className="line">
                    copy following url to get the latest blog 
                </p>
                <p className="line">
                    api_url : {hostDomain}/api/blog?action=thumbNailOfLatest
                </p>
                <p className="line">
                    <span> return data :  </span>
                </p>
                <div className="imageWrappers">
                    <img src = "/Blog/returnData.png" alt="" />
                </div>

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
) (FollowMe)

