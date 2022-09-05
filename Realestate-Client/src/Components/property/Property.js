import React from "react";
import { useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import {debounce} from "lodash";
import { BsSearch } from "react-icons/bs";
import {BiShow,BiPencil} from "react-icons/bi"
import {FaImages} from "react-icons/fa";
import axios from "axios";
import { Cookies } from 'react-cookie';
import Header from "../header_sidebar/Header";
import Sidebar from "../header_sidebar/Sidebar";
import './Property.css'
import Modal from "../Modals/Modal";


const Property = ({setHeaderData}) =>{
    // console.log(props.userData)
    const [isOpen,setIsOpen] = useState(false);
    const [isImage,setIsImage]=useState("");
    const [value,setValue]= useState("");
    const [users,setUsers]= useState([]);
    const [userName_id, setUserName_id] = useState({})
    const [allData, setAllData] = useState(null)
    const cookies = new Cookies()
    const token = cookies.get('jwt')
    let navigate = useNavigate();
    

    
    const deb= debounce((text)=>{
        setValue(text);
    },1000);

    const onChange=(e)=>{
        const text= e.target.value;
        deb(text);
    }

    const onSearch = (searchTerm)=>{
        const ppd_arr=searchTerm.split(" ");
        const ppd_id=parseInt(ppd_arr[1]);

        let post = users;
            const result= post.filter((val)=>val._id===ppd_id);
            setUsers(result);
            if(result.length===0){
                window.alert(`Oops! ${searchTerm} Not Found.`)
            }
    }


    const filterData = (e)=>{
        let filterToApply = e.target.value
        if(filterToApply==="All"){
         setUsers(allData)
         return
        }
        if(allData===null){
          setAllData(users)
          if(filterToApply === "Unsold"){
                const result= users.filter((val)=>val.status===filterToApply);
                setUsers(result);
                console.log(result)
            }else{
                const result= users.filter((val)=>val.property_type===filterToApply)
                setUsers(result)
            }
          
        }else if(users.length!==allData.length){
          setUsers(allData)
          if(filterToApply === "Unsold"){
            const result= allData.filter((val)=>val.status===filterToApply);
            setUsers(result);
            }else{
                const result= allData.filter((val)=>val.property_type===filterToApply)
                setUsers(result)
                // console.log(users)
            }
          
        }else{
            if(filterToApply === "Unsold"){
                const result= users.filter((val)=>val.status===filterToApply);
                setUsers(result);
                }else{
                    const result= users.filter((val)=>val.property_type===filterToApply)
                    setUsers(result)
                }
          
    
        }
      }

    //   const clearFilter = ()=>{
    //     if(allData !==null){
    //         setUsers(allData)
    //         setDefault("All")
    //     }else{
    //         return
    //     }
    //   }
    
    useEffect(()=>{
        const afterLogin = ()=>{
            console.log("Inside afterLogin function property.js useEffect")
                axios({
                    method: 'get',
                    url:"http://localhost:5000/property",
                    headers: {
                        Accept : "application/json",
                        authorization: token,
                        "Content-Type": "application/json"
                      }, 
                      credentials: "include"
                }).then((res)=>{
                    console.log("Inside then block of property.js")
                    // eslint-disable-next-line
                    setHeaderData(res.data.userData[0])
                    setUserName_id(res.data.userData[0])
                    setUsers(res.data.property)
                    console.log(res.data.property)
                }).catch((err)=>{
                    console.log("Inside catch block of property.js")
                    console.log(err)
                    // if(err){
                    //     navigate("/login")
                    // }
                    if(err.response.data === "Unauthorized user" || err.response.status === 409 ){
                            navigate("/login")
                    }
                })

        }
    
            afterLogin()
        },[token, navigate,value])

    
    return(
        <>
                <Header userData={userName_id}/>
                <Sidebar/>
            <div className="row_search_bar">
                <div className="boxContainer">
                    <table className="elementsContainer">
                        <tr>
                            <td>
                                     <input type="text" placeholder="Search PPD ID (e.g. PPD 0000)" className="search" name="searchtext" onChange={onChange}/>
                            </td>
                            
                            <td><span className="stand">|</span></td>

                            <td>
                                     <button className="search_btn" onClick={()=> onSearch(value)}><BsSearch className="search_icon"/></button>
                            </td>
                        </tr>
                    </table>
                </div>
                <div id="filter">
                    <label>Filter</label>
                    <select onChange={filterData}>
                    <option>All</option>
                    <option>Unsold</option>
                    <option>Land</option>
                    <option>House</option>
                    <option>Plot</option>
                    </select>
                    {/* <button onClick={clearFilter}>Clear</button> */}
                </div>
            </div>
            
            <div className="button_div">
            <Link to="/basicinfo"> <button className="btn_add"><span className="plus">+</span><span className="text_btn">Add Property</span></button>  </Link>        
            </div>
            
            <div className="main_row">
                <p className="head_column_one">PPDID</p>
                <p className="head_column_two">Image</p>
                <p className="head_column_three">Property</p>
                <p className="head_column_four">Contact</p>
                <p className="head_column_five">Area</p>
                <p className="head_column_six">Views</p>
                <p className="head_column_seven">Status</p>
                <p className="head_column_eight">DaysLeft</p>
                <p className="head_column_nine">Action</p>
            </div>

            {[...users].map((user, i)=>{
                return(
                    <div key={i} className="property_row">
                    <p className="property_column_one">PPD {user._id}</p>
                    <p className="property_column_two"><FaImages onClick={()=>{setIsOpen(!isOpen);setIsImage(user.image)}} className="image" /></p>
                    <Modal open={isOpen} onClose={()=>setIsOpen(!isOpen)}>
                        <img src={isImage} style={{width:"1186px",height:'600px',borderRadius:'20.5px'}} alt="the property"/>
                        {/* hello */}
                    </Modal>
                    <p className="property_column_three">{user.property_type}</p>
                    <p className="property_column_four">{user.mobile}</p>
                    <p className="property_column_five">{user.total_area}</p>
                    <p className="property_column_six">{user.views}</p>
                    <p className="property_column_seven"><button className="btn">{user.status}</button></p>
                    <p className="property_column_eight">{user.days_left}</p>
                    <p className="property_column_nine"><BiShow className="show"/><BiPencil className="edit"/></p>
                </div>
                )
            })}

                
            
        </>
    )
}

export default Property;
