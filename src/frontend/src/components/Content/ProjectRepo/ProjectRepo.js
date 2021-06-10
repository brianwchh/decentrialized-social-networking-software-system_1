import React from 'react'
import './ProjectRepo.css'

function ProjectRepo(props) {
    return (
        <div className="projectRoot">
            <p className="clickBelow">click below to visit project in github</p>
            <a className="link" href="https://github.com/DeCensorMedia/DeCensorMedia.git">https://github.com/DeCensorMedia/DeCensorMedia.git</a>
        </div>
    )
}

export default ProjectRepo
