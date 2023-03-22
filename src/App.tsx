import React,{useRef, useState} from 'react';
import './styles/global.scss';
import { MdOutlineCancel,MdOutlineMailOutline } from 'react-icons/md';
import {FiPhone} from 'react-icons/fi';
import { RxDoubleArrowRight } from 'react-icons/rx';
import { HiGift } from 'react-icons/hi';


function App() {
  const [slide,setSlide] = useState(false);
  const [isGameStarted,setIsGameStarted] = useState(false);
  const [formData,setFormData] = useState({email:'',phone:'',agree:false});
  const [alert,setAlert] = useState({showen:false,msg:''});
  const [wheelDeg,setWheelDeg] = useState<React.CSSProperties>({transform:'rotateY(180deg) rotateZ(0deg)'});
  const [poinetrDeg,setPointerDeg] = useState<React.CSSProperties>({transform: 'translate(-50%,-50%) rotateZ(0deg)'});
  const [gift,setGift] = useState('');
  const [copyTxt,setCopyTxt] = useState('COPY');
  const [close,setClose] = useState(false);
  
  function handleChange(e:React.ChangeEvent<HTMLInputElement>){
    const val = e.target.value;
    const name = e.target.name;
    if(name === 'agree') {
      setFormData(prev => ({...prev,agree: !prev.agree}));
    } else {
      setFormData(prev => ({...prev,[name]:val}));
    }
  }

  function handleCopy(){
    navigator.clipboard.writeText('XAXPDF20');
    setCopyTxt('COPIED!')
    setTimeout(()=> setCopyTxt('COPY'),3000)
  }
  function handleClose(){
    navigator.clipboard.writeText('XAXPDF20');
    setClose(true)
  }



  function handleClick(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)){
      setAlert({showen:true,msg:'make sure to enter a valid email'});
      setTimeout(()=> setAlert({showen:false,msg:'make sure to enter a valid email'}),3000)
    }else if(formData.phone.length < 10) {
      setAlert({showen:true,msg:'make sure to enter at least 10 numbers in phone input'});
      setTimeout(()=> setAlert({showen:false,msg:'make sure to enter at least 10 numbers in phone input'}),3000)
    }else if(!formData.agree){
      setAlert({showen:true,msg:'make sure to agree to receiving recurring automated messages'});
      setTimeout(()=> setAlert({showen:false,msg:'make sure to agree to receiving recurring automated messages'}),3000)
    } else {
      //
      //
      //start sending the data
      //
      //

      // fetch('',{
      //   method:'POST',
      //   body: JSON.stringify(formData)
      // })
      // .then(()=>{
        setIsGameStarted(true);
      // })
      // .catch(()=>{
      //   setAlert({showen:true,msg:'Ooops! somthing went wrong '});
      //   setTimeout(()=> setAlert({showen:false,msg:'Ooops! somthing went wrong '}),3000);
      // })
    }
  }

  function handleSpin(){
    const offersArr = [
      '30% SITEWIDE OFF',
      'BUY 1 GET 1 FREE',
      'FREE COFFEE MUG  ON PURCHASE WORTH  000+',
      'Buy 2 Effervescent tablets & get 1 free',
      'Free 50g tea on purchase of Rs. 500',
      'HOT CHOCLATE FREE WITH TEA',
    ]
    const randomNum = Math.round( Math.random() * 5 );
    setTimeout(()=>{
      setGift(offersArr[randomNum]);
    },6000)
    let transform = 3600;
    
    switch (randomNum) {
      case 0 : 
        transform += 360;
      break;
      case 1 : 
        transform += 300;
      break;
      case 2 : 
        transform += 240;
      break;
      case 3 : 
        transform += 180;
        break;
      case 4 : 
        transform += 120;
        break;
      case 5 : 
        transform += 60;
    }
    setWheelDeg({transform:`rotateY(180deg) rotateZ(${transform}deg)`});
    setPointerDeg({transform: `translate(-50%,-50%) rotateZ(${transform * -1}deg)`})
  }
  return (
    <main className="App">
      <article className={`main-article ${slide? 'active': ''} ${slide? 'active': ''} ${close? 'hide': ''}`}>
        <div className={`alert ${alert.showen? 'active':''}`}>{alert.msg}</div>
        <span className={`slide-btn`} onClick={()=> setSlide(prev => !prev)}><span className='icon'>{RxDoubleArrowRight({})}</span></span>
        <img src="/m-top.png" className='top-image' alt="" />
        <div className={`spin-wheel-container ${isGameStarted? 'active': ''} ${gift === '' ? '' : 'end'}`}>
          <img src="/spin.png" alt="" />
          <div className='spin-wheel' style={wheelDeg}>
            <div className='offer red' style={{transform:'translateX(-50%) rotateZ(0deg)'}}>30% SITEWIDE OFF</div>
            <div className='offer gold' style={{transform:'translateX(-50%) rotateZ(60deg)'}}>BUY 1 GET 1 FREE</div>
            <div className='offer red' style={{transform:'translateX(-50%) rotateZ(120deg)'}}>FREE COFFEE MUG  ON PURCHASE WORTH  000+</div>
            <div className='offer gold' style={{transform:'translateX(-50%) rotateZ(180deg)'}}> Buy 2 Effervescent tablets & get 1 free</div>
            <div className='offer red' style={{transform:'translateX(-50%) rotateZ(240deg)'}}>Free 50g tea on purchase of Rs. 500</div>
            <div className='offer gold' style={{transform:'translateX(-50%) rotateZ(300deg)'}}>HOT CHOCLATE FREE WITH TEA</div>
            <span className='pointer' style={poinetrDeg}>{HiGift({})}</span>
          </div>
        </div>
        {gift === '' ? <button className={`spin-btn ${isGameStarted? 'active': ''}`} onClick={handleSpin}>SPIN</button> : <></>}
        <form action="" className={`${isGameStarted? 'active': ''} ${gift === '' ? '': 'hide'}`}>
          <h2>This is how EngageBud looks like in action!</h2>
          <div className='input'>
            <span className='logo'>{MdOutlineMailOutline({})}</span>
            <label htmlFor="email">Email</label>
            <input 
              type="text" 
              id="email" 
              placeholder='joe@gmail.com'
              value={formData.email}
              name='email'
              onChange={(e)=>handleChange(e)}
              />
          </div>
          <div className='input'>
            <span className='logo'>{FiPhone({})}</span>
            <label htmlFor="phone">Phone</label>
            <input 
              type="text" 
              id="phone" 
              placeholder='+91 98256 XXXXX'
              value={formData.phone}
              name='phone'
              onChange={(e)=>handleChange(e)}
              />
          </div>
          <div className='checkbox'>
            <input 
              type="checkbox" 
              id="checkbox"
              name='agree'
              onChange={(e)=>handleChange(e)}
              />
            <label htmlFor="checkbox">
              I agree to receiving recurring automated messages at the number I have provided.
              Consent is not a condition to purchase.
            </label>
          </div>
          <button onClick={(e)=> handleClick(e)}>
            Try your luck
          </button>
          <p>*You can spin the wheel only once! *If you win, you can claim your coupon for 10 minutes only!</p>
          <p className='cancel'>No, I don’t feel lucky <span>{MdOutlineCancel({})}</span></p>
        </form>
        <div className={`the-gift ${gift === '' ? 'hide' : ''} `}>
          <p className='Congrats'>Congrats! You Won:</p>
          <h2>{gift}</h2>
          <p className='copy' onClick={handleCopy}><span>XAXPDF20</span><button>{copyTxt}</button></p>
          <button className='close' onClick={handleClose}>Close Panel & Copy</button>
          <span className='note'>*You can claim your coupon for 10 minutes only!</span>
        </div>
        <img src="/m-bottom.png" className='bottom-image' alt="" />
      </article>
    </main>
  );
}

export default App;
