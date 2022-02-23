

class Card extends React.Component {

    constructor(){

        super();

    }

    
    render() {
        return (
            <div>
                 <div>{this.props.name}</div>
                <div>{this.props.temp}</div>
                <div>{this.props.humidity}</div>
                <div>{this.props.des}</div>
                <div>{this.props.windspeed}</div>
                
            </div>
        );
    }
}

