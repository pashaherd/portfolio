import { useState, useEffect, useRef } from 'react'
import { Element, Link, animateScroll} from 'react-scroll'
import arrow from './assets/arrow.png'; 
import * as THREE from 'three'



function App() {
  const [done, setDone] = useState(new Array(3).fill(false))
  const [intro, setIntro] = useState(''); 
  const [phrase, setPhrase] = useState('');
  const [phrase2, setPhrase2] = useState(''); 
  const [scroll, setScroll] = useState(0);
  const [scrollY, setScrollY] = useState(0);  

  const scrollElement = useRef(); 

  function handleType(statement, setFunction, id){
    return new Promise((res) =>{
      let i = 0; 
      const intervalID = setInterval(() =>{
            if(i === statement.length - 1){
              clearInterval(intervalID); 
              let copy = done; 

              copy[id] = true; 
              setDone(copy); 
              res(true)
            } else {
            
            setFunction((prev) => prev + statement[i])
            i++
            } 
          },100); 
    })
  }

  useEffect(() =>{
    console.log(done); 
  const statement = `P asha Herd 08/09/02 `; 
  
  handleType(statement, setIntro,0)
  .then(() => handleType('  Digital Creator',setPhrase,1))
  .then(() => handleType('  Portfolio 22\'23',setPhrase2,2))
  .then(() => {
    setTimeout(() =>{
       const body = document.querySelector('body'); 
       const types = Array.from(document.querySelectorAll('.type h1'));
       const links = Array.from(document.querySelectorAll('.header li a')); 
       const bgs = Array.from(document.querySelectorAll('.bg'));
       const h1 = document.querySelector('.cover h1');  
       const showMore = document.querySelector('.arrows h3'); 
       const arrowDiv = document.querySelector('.arrows'); 

       showMore.classList.add('on'); 

       body.classList.add('trans'); 
       h1.classList.add('active')

       types.forEach((type) =>{
        type.style.color = 'rgb(47, 110, 56)'; 
       })
       links.forEach((link) =>{
        link.style.color = 'rgb(47, 110, 56)'
       })

       bgs.forEach((bg) =>{
        bg.classList.add('active'); 
       })
    },1000)
  }); 
   
  function addScroll(){
    const { scrollY } = window; 
  
    setScrollY(() => scrollY); 
    setScroll((prev) => prev += 1)
  }
  
  // Intersection 
  
  /*
  const element = document.querySelector('.content'); 

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) =>{
      if(entry.isIntersecting){
        console.log(`Observing ${JSON.stringify(entry)}`); 
     
      
      }
    })
  })

  observer.observe(element); 
  */
 // Adjust the duration (in milliseconds) to control scroll speed
  
  scrollElement.current.addEventListener('scroll', addScroll)

  return () =>{
    window.removeEventListener('scroll', addScroll)
  }
 },[])

 function handleShowMore(e){
    animateScroll.scrollToBottom({
      smooth:true,
      duration:750
    }) 
    e.target.parentNode.style.display = "none"; 
 }
   
  return (
    <div className="wrap">
      <nav>
     <div className="typing">
      <span className={ done[0] ? `type done` : `type`}>
      <h1>{intro}</h1>
      </span>
      <span className={ done[1] ? `type done` : `type`}>
        <h1>{phrase}</h1>
      </span>
      <span className={ done[2] ? `type done` : `type`}>
        <h1>{phrase2}</h1>
      </span>
      </div>
      <ul className="header">
        <li><a href="https://github.com/pashaherd" target="_blank">github</a></li>
        <li><a href="https://tiktoklivegames.io" target="_blank">tiktoklivegames</a></li>
        <li><a href="https://leadwebservices.ca" target="_blank">LEAD</a></li>
      </ul>
      </nav>
      <div className="cover">
        <div className="bg b1"></div>
        <div className="bg b2"></div>
        <div className="bg b3"></div>
        <h1>A Creative Mind</h1>
     
        <div className="arrows" onClick={(e) => handleShowMore(e)}>
          <img src={arrow} alt="" id="arrow-2"/>
          <img src={arrow} alt="" id="arrow-3"/>
          <h3>Show More</h3>
        </div>
      </div>
 
      <div className="content-wrap">
        <h1>Creative Works</h1>
        <div className="content" ref={scrollElement}>
           <div className="p1">
            <span>
              <h2>LEAD Web Services</h2>
            <p>LEAD Web Services is a dynamic and innovative web agency committed to guiding businesses through the digital landscape.
              lead by myself, I provide comprehensive web solutions tailored to meet the unique needs of our clients. Our services encompass web design, development, and e-commerce solutions, ensuring visually 
              appealing and fully functional websites.I specialize in crafting responsive, user-friendly, and SEO-optimized platforms to enhance our clients' 
              online presence and drive growth. 
            </p>
            </span>
            <div className="content-bg front"></div>
           </div>
           <div className="p1 reverse">
            <span>
              <h2>Tiktok Live Games</h2>
            <p>TikTokLiveGames is an exciting SAAS platform designed to revolutionize the world of live streaming on TikTok. Our innovative solution offers content creators and influencers a powerful suite of tools and interactive games to engage with their audiences like never before. With TikTokLiveGames, users can seamlessly integrate trivia, polls, and challenges into their live broadcasts, turning passive viewers into active participants
            </p>
            </span>
            <div className="content-bg second"></div>
           </div>
          
        </div>
      </div>
    </div>
  )
}

export default App
