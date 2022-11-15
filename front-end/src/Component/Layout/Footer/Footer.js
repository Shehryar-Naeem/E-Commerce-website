import React from "react"
import PlayStoreIcon from "../../../Images/playStore.png"
import IOSIcon from "../../../Images/ios.png"
import "./footer.css"
const getYear = new Date().getFullYear()
const Footer =()=>{
    return (
        <>
            <footer id="footer">
                <div className="left_footer">
                    <h4>Download our App</h4>
                    <p>Download App for Android and IOS Mobile App</p>
                    <img src={PlayStoreIcon} alt="playStore icon"/>
                    <img src={IOSIcon} alt="IOS icon"/>
                </div>
                <div className="middle_footer">
                    <h1>E commerce</h1>
                    <p>High Quality always in our first priority</p>
                    <p>copyRight &copy; {getYear} </p>
                </div>
                <div className="right_footer">
                    <h4>Follow us</h4>
                    <a href="http://youtube.com">Instagram</a>
                    <a href="http://youtube.com">YouTube</a>
                    <a href="http://youtube.com">Facebook</a>
                </div>
            </footer>
        </>
    )
}


export default Footer