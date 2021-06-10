import React, {} from 'react'
import './Router.css'

import { Route, Switch } from 'react-router-dom';
import Home from './Home/Home'
import Register from './Profile/Register'
import Login from './Profile/Login'
import CourseListView from './CourseListView/CourseListView'
import PeersChat from './PeersChat/PeersChat'
import CourseDetailView from '../Content/CourseDetailView/CourseDetailView'
import Gallery from './Gallery/Gallery'
import Blog from './Blog/Blog'
import NewBlog from './Blog/NewBlog'
import SubCategory from '../Content/Gallery/SubCategory/SubCategory.js'
import ImageListView from '../Content/Gallery/ImageListView/ImageListView.js'
import ImageDetailView from '../Content/Gallery/ImageDetailView/ImageDetailView.js'
import FollowMe from "./Blog/FollowMe"
import Subscription from "./Subscription/Subscription"
import NewSubscription from "./Subscription/NewSubscription"
import ProjectRepo from './ProjectRepo/ProjectRepo'


function Router() {
    return (
        <div className='routerRoot'>
            
                <Route>
                    <Switch>

                        <Route path='/blog' exact component={Blog}/>
                        <Route path='/blog/newblog'  component={NewBlog}/>

                        <Route path='/gallery' exact component={Gallery} />
                        <Route path='/gallery/:category' exact component={SubCategory} />
                        <Route path='/gallery/:category/:place' exact component={ImageListView} />
                        <Route path='/gallery/:category/:place/:imageId'  component={ImageDetailView} /> 


                        <Route path='/blog/followme'  component={FollowMe} /> 
                        <Route path='/subscription'  component={Subscription} /> 
                        <Route path='/newsubscription'  component={NewSubscription} /> 
                        
                        

                        {/* <Route path='/peerschat' exact component= {PeersChat} /> */}

                        <Route path='/course' exact  component={CourseListView} />
                        <Route path='/course/:id'  component={CourseDetailView} />
                        
                        <Route path='/profile/login'  component={Login} />
                        <Route path='/profile/register'  component={Register} /> 

                        <Route path='/project'  component={ProjectRepo} /> 

                        <Route path='/' exact  component={Home} />

                    </Switch>
                </Route>
        </div>
    )
}

export default Router
