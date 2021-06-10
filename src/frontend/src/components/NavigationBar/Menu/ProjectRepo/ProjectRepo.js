import React from 'react'
import './ProjectRepo.css'

import Item from '../sharedComponents/Item/Item'

function ProjectRepo() {
    return (
        <div className='projectRepoRoot'>
            <Item style={{color:'black'}} to='/project' itemName='Project'/>
        </div>
    )
}

export default ProjectRepo
