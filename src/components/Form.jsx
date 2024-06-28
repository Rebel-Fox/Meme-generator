import React from 'react'

export default function Form() {
    const [meme, setMeme] = React.useState({
        topText: '',
        bottomText: '',
        randomImage: ''
    })

    const [allMemes, setAllMemes] = React.useState([])

    const id =React.useId()

    // React.useEffect(()=>{
    //     fetch('https://api.imgflip.com/get_memes')
    //     .then(response => response.json())
    //     .then(object =>{
    //         console.log(object.data.memes)
    //         setAllMemes(object.data.memes)
    //     })
    // },[])

     /**
    useEffect takes a function as its parameter. If that function
    returns something, it needs to be a cleanup function. Otherwise,
    it should return nothing. If we make it an async function, it
    automatically retuns a promise instead of a function or nothing.
    Therefore, if you want to use async operations inside of useEffect,
    you need to define the function separately inside of the callback
    function, as seen below:
    */

    React.useEffect(()=>{
        async function getMemes(){
            const response = await fetch('https://api.imgflip.com/get_memes')
            const object = await response.json()
            setAllMemes(object.data.memes)
        }
        getMemes()
    },[])

    function handleChange(e) {
        const { name, value } = e.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    function getMemeImage() {
        const randomMemeIndex = Math.floor(Math.random() * allMemes.length)
        const newUrl = allMemes[randomMemeIndex].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: newUrl
        }))
    }

    return (
        <main>
            <div className='form'>
                <div className="flex-tray">
                    <div className='text-container'>
                        <label htmlFor={id +'-top-text'}>Top text</label>
                        <input
                            name='topText'
                            type='text'
                            className='top-text'
                            id={id +'-top-text'}
                            placeholder='Shut up'
                            onChange={handleChange}
                            value={meme.topText}

                        />
                    </div>
                    <div className='text-container'>
                        <label htmlFor={id + '-bottom-text'}>Bottom text</label>
                        <input
                            name='bottomText'
                            type='text'
                            className='bottom-text'
                            id={id + '-bottom-text'}
                            placeholder='And take my money'
                            onChange={handleChange}
                            value={meme.bottomText}

                        />
                    </div>
                </div>
                <button type='submit' className='submit-btn' onClick={getMemeImage}>Get a new meme image  🌄</button>
            </div>
            <div className="meme-container">
                {meme.randomImage && <img src={meme.randomImage} alt='meme-image' className="meme-image"/>}
                <p className="top meme-text">{meme.topText}</p>
                <p className="bottom meme-text">{meme.bottomText}</p>
            </div>
        </main>
    )
}