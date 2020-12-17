import React, {Component} from 'react'
import './Router.css'

import { Route, Switch } from 'react-router-dom';
import Home from './Home/Home'
import PeersChat from './PeersChat/PeersChat'
import Blog from './Blog/Blog'
import Gallery from './Gallery/Gallery'


import  SubCategory  from './Gallery/SubCategory/SubCategory'
import ImageListView from './Gallery/ImageListView/ImageListView'
import ImageDetailView from './Gallery/ImageDetailView/ImageDetailView'


function Router() {
    return (
        <div className='routerRoot'>
            
                <Route>
                    <Switch>

                        <Route path='/peerschat' component= {PeersChat} />

                        <Route path='/blog' component={Blog}/>

                        <Route path='/gallery' exact component={Gallery} />
                        <Route path='/gallery/:category' exact component={SubCategory} />
                        <Route path='/gallery/:category/:place' exact component={ImageListView} />
                        <Route path='/gallery/:category/:place/:imageId'  component={ImageDetailView} />

                        <Route path='/' exact  component={Home} />

                    </Switch>
                </Route>
        </div>
    )
}

export default Router
