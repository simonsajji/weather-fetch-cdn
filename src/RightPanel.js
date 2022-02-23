
// import searchicon from "./src/images/search1.png";

class RightPanel extends React.Component {

    API_KEY_current="92101be211c2017ba6cbb80d2025fcad";

    

    constructor(props){
        super(props);
        this.localtempref=React.createRef();
        this.localhumidtyref=React.createRef();
        this.localpressureref=React.createRef();
        this.inputRef=React.createRef();
        this.state={
            inputVal:"",
        }

        


    }
    componentDidMount() {
        this.getMylocation();
    }

    getMylocation=()=>{

        navigator.geolocation.getCurrentPosition((pos)=>{

            
            let lat=pos.coords.latitude;
            let lon=pos.coords.longitude;

            let API_URL_current=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.API_KEY_current}&units=metric`;
            
            
            this.fetchMylocation(API_URL_current,lat,lon);



        },()=>{
            console.log("err");
            alert("Please enable your location!");
            this.getMylocation();

        })

    }
   


    fetchMylocation= async (api,lon,lat)=>{

        const res  = await fetch(api);
        const data = await res.json();
        // console.log(data);
        this.localtempref.current.innerHTML=data.main.temp;
        this.localhumidtyref.current.innerHTML=data.main.humidity;
        this.localpressureref.current.innerHTML=data.weather[0]?.description;


            
        

    }

    handleClick=(e)=>{

        e.preventDefault();

        this.setState({inputVal:this.inputRef.current.value});
        // console.log(this.inputRef.current.value)
        this.props.fn(this.inputRef.current.value);
        
    }
    render() {
        return (
            <div className="RightPanel">
                <div className='Inputs'>
                    <input type="text" placeholder="Another location" ref={this.inputRef}/>

                     <input type="button" onClick={this.handleClick} value=""/>
                </div>

                <div className="topcities">
                    <div className="citieshead">Top Cities</div>
                    <hr/>

                    <div >kochi</div>
                    <div >London</div>
                    <div >Chennai</div>
                    <div >Pune</div>

                    
                </div>

                <div className="currentlocweather">
                    <small className="localweatherhead">Your Local Weather</small>

                    <div className="wrapper">
                        <h1 className="localtemp"> <span ref={this.localtempref}>9</span><sup>o</sup>C</h1>
                       
                        

                    </div>

                    <div className="wrapperdes">
                        <h2 className="localhumidity">Humidity <span ref={this.localhumidtyref} className="percentage">69</span></h2>
                        <h2 className="localhumidity"><span ref={this.localpressureref}></span></h2>
                        

                    </div>
                    

                </div>
                
            </div>
        );
    }
}

