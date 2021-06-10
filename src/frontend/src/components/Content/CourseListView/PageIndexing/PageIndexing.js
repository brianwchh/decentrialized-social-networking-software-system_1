import React,{useState} from 'react'
import './PageIndexing.css'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

function PageIndexing(props) {

    const pageItems = []

    for (let i=0; i<props.TotalPageNum; i++){
        pageItems.push(<p className='pageItem' key={i}><span>{i}</span></p>)
    }

    return (
        <div className='pageIndexingRoot'>
            <div className='innerWrapper'>
                <div className='navItem'>
                    <SkipPreviousIcon style={{ color: 'green', fontSize: "30px" }} />
                </div>
                <div className='navItem'>
                    <ArrowLeftIcon style={{ color: 'green', fontSize: "40px" }} />
                </div>
                <div className='flexBoxesContainer'>
                    {pageItems}
                </div>
                <div className='navItem'>
                    <ArrowRightIcon style={{ color: 'green', fontSize: "40px" }} />
                </div>
                <div className='navItem'>
                    <SkipNextIcon style={{ color: 'green', fontSize: "30px" }} />
                </div>
            </div>
        </div>
    )
}

export default PageIndexing


