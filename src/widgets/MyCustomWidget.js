import React, { useEffect, useState } from 'react'
 
export default function MyCustomWidget() {
    const [quote, setQuote] = useState();
    const [author, setAuthor] = useState();
    const [imageSrc, setImageSrc] = useState();

    const generateImage = async () => {
        const response = await fetch('https://api.unsplash.com/photos/random?topics=6sMVjTLSkeQ&orientation=landscape&client_id='+process.env.REACT_APP_UNSPLASH_ACCESS_KEY, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            }
        })

        const data = await response.json();
        setImageSrc(data.urls.regular)
    }

    const generateQuote = async () => {
        const response = await fetch('https://api.api-ninjas.com/v1/quotes?category=happiness', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': process.env.REACT_APP_NINJA_API_KEY
            }
        })

        const data = await response.json();
        setQuote(data[0].quote)
        setAuthor(data[0].author)
    }

    useEffect (() => {
        generateQuote();
        generateImage();
    }, [])
    
    return (
        <div style={{ width: 300 }}>
            <img className='quote_image' src={imageSrc} style={{marginBottom: "20px"}}></img>
            <div className='quote-text'>
                <p className='context' style={{ fontFamily: "Kalam", marginBottom: '20px', }}>{quote}</p>
                <span className='author' style={{ fontFamily: "Kalam"}}>~{author}~</span>
            </div>
        </div>
    )
}