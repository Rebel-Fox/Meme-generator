import React from 'react'
import TrollFace from '../assets/Troll-Face.svg'
export default function Header(){
    return(
        <header>
            <img src={TrollFace} alt='Troll Face icon' className='troll-face-icon'/> 
            <h2 className='page-title'>Meme Generator</h2>
            <p>React Course - Project 3</p>
        </header>
    )
}