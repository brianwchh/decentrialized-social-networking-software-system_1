import React,{useState} from 'react'
import './CourseCategory.css'
import CategoryDropDown from '../DropDown/CategoryDropDown'
import CourseCategoryItem from './CourseCategoryItem'

function CourseCategory(props) {

    const [selectedId,setSelectedId] = useState(0);
    const categories = props.categories
    const [showMenu,setShowMenu] = useState(false)

    const handleOnSelection = (id) => {

        setSelectedId(id) ;
        props.handleFilterCategory(categories[id].category_id)

        handleOnClickCheckBox();
    }

    const handleOnClickCheckBox  = () => {
        if (showMenu == false) {
            setShowMenu(true)
        } else {
            setShowMenu(false)
        }
    }

    return (
        <div className='courseCategoryRoot'>
            {/* <div className='categoryClass'>
                <p><span>檢索分類</span></p>
            </div> */}
            <div className='categoryDropDownMenuWrapper'>
                <CategoryDropDown 
                    menuName={categories[selectedId].category_name}  
                    style={{color:'rgb(100,100,100)'}} 
                    parentCallBack = {handleOnClickCheckBox}
                    showMenu = {showMenu}
                >
                    {categories.map((item,index)=>(
                        <div 
                            className='item' 
                            key= {index} 
                            onClick = {()=>{handleOnSelection(index)}}
                        >
                            <CourseCategoryItem 
                                style={{color:'rgb(100,100,100)'}}  
                                itemName={item.category_name}
                            />
                        </div>))
                    }
                </CategoryDropDown>
            </div>
        </div>
    )
}

export default CourseCategory
