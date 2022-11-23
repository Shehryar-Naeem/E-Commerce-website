import React, { useState } from "react"
import "./Search.css"
import { useNavigate, } from "react-router-dom"

const Search =()=>{
    const [word,setWord] = useState("")
    const navigate = useNavigate()
    const onSubmitHandler=(e)=>{
        e.preventDefault()
        if(word.trim()){
            navigate(`/products/${word}`)
        }else{
            navigate("/products")
        }
    }   
    return(
        <>
            <form className="search_box" onSubmit={onSubmitHandler}>
                <input type="text" value={word} name="word" placeholder="Serach a product..." onChange={(e)=> setWord(e.target.value)}/>
                <input type="submit" value="search"/>
            </form>
        </>
    )
}

export default Search