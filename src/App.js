
// import background from "./src/images/mohammad-alizade-DunSKupQL7g-unsplash.jpg";
// import background2 from "./src/images/pexels-josh-hild-2448749.jpg";
// import background3 from "./src/images/pexels-gabriela-palai-395196.jpg";
// import background4 from "./src/images/pexels-pixabay-259620.jpg";
// import background5 from "./src/images/pexels-steve-johnson-858076.jpg";
// import background6 from "./src/images/justin-cron-HWLMYSkkiAg-unsplash.jpg";



class App extends React.Component {

  API_KEY="92101be211c2017ba6cbb80d2025fcad";
  cityname="Chennai";
  

  constructor(){
    super();
    this.state = {
      bgs:["./src/images/mohammad-alizade-DunSKupQL7g-unsplash.jpg","./src/images/pexels-josh-hild-2448749.jpg","./src/images/pexels-gabriela-palai-395196.jpg","./src/images/pexels-pixabay-259620.jpg","./src/images/pexels-steve-johnson-858076.jpg","./src/images/justin-cron-HWLMYSkkiAg-unsplash.jpg"],
      temp:"",humidity:"",name:"",des:"",windspeed:"",
      
    }

    this.AppRef=React.createRef();
    

  
  
    
  }


  
  changeBackground=()=>{
    var num = Math.ceil( Math.random() * 6 - 1 );
    console.log(num);
    let app=this.AppRef.current;
    app.style.backgroundImage=`url(${this.state.bgs[num]})`;
    
  }



  componentDidMount=()=>{
    this.changeBackground(); 
  }

 
  API_URL=`https://api.openweathermap.org/data/2.5/weather?q=${this.cityname}&appid=${this.API_KEY}&units=metric`;

  fetchResults= async (val)=>{

    // await console.log(val);
    let Left=document.getElementsByClassName("Left")[0];
    // console.log(Left.innerHTML);
   
    await this.changeBackground();
    try{
      const res  = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${val}&appid=${this.API_KEY}&units=metric`);
      const data = await res.json();
    

      let div=document.createElement("div");
      div.classList.add("flexbox");
      div.innerHTML=`<div class="flex1">${data.main.temp}<sup>o</sup></div>
      <div class="flex2"><div class='cname'>${data.name}</div> <div class='des'>${data?.weather[0]?.description}</div></div>
      <div class="flex3"> <div class='hum'>Humidity <span>${data.main.humidity}%</span></div> <div class='wind'>Wind <span>${data?.wind?.speed}%</span></div> </div>`;
      Left.appendChild(div);
      return div;

      this.setState({
        temp:data.main.temp,humidity:data.main.humidity,name:data.name,des:data?.weather[0]?.description,windspeed:data?.wind?.speed,
      })


    }
    catch(err){
      console.log("error");
    }
    
    
  }



  render() {
    return (
      <div ref={this.AppRef} className="App" style={{ backgroundImage: `url(${this.state.bgs[0]})`}}>

        <Left  temp={this.state.temp} humidity={this.state.humidity} name={this.state.name} des={this.state.des} windspeed={this.state.windspeed}/>

        <RightPanel fn={this.fetchResults} />
          

        
        
      </div>
    );
  }
}

