import React from "react";
import "./style.css"
import img1 from "./profile.jpeg";
import "boxicons"

const NavBar = () => {

    window.onload = function(){
        const sidebar = document.querySelector(".sidebar");
        const closeBtn = document.querySelector("#btn");
        const searchBtn = document.querySelector(".bx-search")
    
        closeBtn.addEventListener("click",function(){
            sidebar.classList.toggle("open")
            menuBtnChange()
        })
    
        searchBtn.addEventListener("click",function(){
            sidebar.classList.toggle("open")
            menuBtnChange()
        })
    
        function menuBtnChange(){
            if(sidebar.classList.contains("open")){
                closeBtn.classList.replace("bx-menu","bx-menu-alt-right")
            }else{
                closeBtn.classList.replace("bx-menu-alt-right","bx-menu")
            }
        }
    }

    return (
        <>
        
        <div className="sidebar">
            <div className="logo_details">
            <i className="bx bxl-audible icon"></i>
            <box-icon name="icon"></box-icon>
            <div className="logo_name">Code Effect</div>
            <i className="bx bx-menu" id="btn"></i>
            </div>
            <ul className="nav-list">
            <li>
                <i className="bx bx-search"></i>
                <input type="text" placeholder="Search..."/>
                <span className="tooltip">Search</span>
            </li>
            <li>
                <a href="/">
                <i className="bx bx-grid-alt"></i>
                <span className="link_name">Dashboard</span>
                </a>
                <span className="tooltip">Dashboard</span>
            </li>
            <li>
                <a href="/">
                <i className="bx bx-user"></i>
                <span className="link_name">User</span>
                </a>
                <span className="tooltip">User</span>
            </li>
            <li>
                <a href="/">
                <i className="bx bx-chat"></i>
                <span className="link_name">Message</span>
                </a>
                <span className="tooltip">Message</span>
            </li>
            <li>
                <a href="/">
                <i className="bx bx-pie-chart-alt-2"></i>
                <span className="link_name">Analytics</span>
                </a>
                <span className="tooltip">Analytics</span>
            </li>
            <li>
                <a href="/">
                <i className="bx bx-folder"></i>
                <span className="link_name">File Manger</span>
                </a>
                <span className="tooltip">File Manger</span>
            </li>
            <li>
                <a href="/">
                <i className="bx bx-cart-alt"></i>
                <span className="link_name">Order</span>
                </a>
                <span className="tooltip">Order</span>
            </li>
            <li>
                <a href="/">
                <i className="bx bx-cog"></i>
                <span className="link_name">Settings</span>
                </a>
                <span className="tooltip">Settings</span>
            </li>
            <li className="profile">
                <div className="profile_details">
                <img src={img1} alt="profile"/>
                <div className="profile_content">
                    <div className="name">Anna Jhon</div>
                    <div className="designation">Admin</div>
                </div>
                </div>
                <i className="bx bx-log-out" id="log_out"></i>
            </li>
            </ul>
        </div>
        <section className="home-section">
            <div className="text">Dashboard</div>
        </section>
        </>
    )
}
export default NavBar;