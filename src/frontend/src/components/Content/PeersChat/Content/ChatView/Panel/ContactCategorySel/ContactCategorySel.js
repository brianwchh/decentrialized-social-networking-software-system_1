import React,{useState} from 'react'
import './ContactCategorySel.css'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


function ContactCategorySel(props) {

    const [showMenu,setShowMenu] = useState(false)

    /**
     *  control dropdown menu via clicking at icon 
     */
    const handleShowCategoryMenuOnClick = () => {
        setShowMenu(!showMenu)
    } 

    return (
        <div className="contactCategorySelRoot">
            <div className='aTagAndIcon'>
                <a  style={props.style}>
                    <span>{props.menuName}</span>
                </a>
                <div className='iconWrapper'  onClick={handleShowCategoryMenuOnClick} >
                    <ExpandMoreIcon style={{ color: 'black', fontSize: "20px" }} />
                </div>
            </div>

            <div className='menuContent' style={{display: showMenu==true? 'block' : 'none'}} >
                {props.children}
            </div>
        </div>
    )
}

export default ContactCategorySel
