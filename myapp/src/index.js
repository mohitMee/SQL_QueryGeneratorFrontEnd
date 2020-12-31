
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';




class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstNumber: 0,
            secondNumber: 0,
             operator: '+',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputSubmit = this.handleInputSubmit.bind(this);

    }

    handleInputChange(event) {
      
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });

        
    }
    
    async handleInputSubmit(event){
         event.preventDefault();
        let jsonObject = {"firstNumber" : this.state.firstNumber,
                          "secondNumber" : this.state.secondNumber,
                          "operator" : this.state.operator,    
        };


        await fetch('localhost/sendjson/', {
    
            method: 'GET',
            
            body: JSON.stringify(jsonObject),
        
        })
        
        .then(response => {
            
            if(!response.ok) alert("Http-Error : " + response.status);
            
            return response.json();
            
        })
        
        .then(data => {
            
        //   var tmp;
          

        //     tmp= JSON.parse(data);

        console.log(data);
          
          
            
        //   console.log(tmp);
        
        });

    }

    render(){
        return (
           <form  onSubmit={this.handleInputSubmit}> 
            <label>
                FirstNumber:
                <input
                    name="firstNumber"
                    type="text"
                    value={this.state.firstNumber}
                    onChange={this.handleInputChange}/>
            </label>
            <br/>
            <label>
                SecondNumber:
                <input
                    name="secondNumber"
                    type="text"
                    value={this.state.secondNumber}
                    onChange={this.handleInputChange}/>
            </label>
            <br/>
            <label>
             Pick your Opeartor:
             <select name="operator"
             value={this.state.operator}
                onChange={this.handleInputChange}>        
               <option operator="+">+</option>
               <option operator="-">-</option>
               <option operator="*">*</option>
               <option operator="/">/</option>
             </select>
           </label>
           <br/>
            <input type="submit" value="Submit"

                // onSubmit={this.handleInputSubmit}
            />
            
           </form> 
        );
    }




 }



  ReactDOM.render(
     < Calculator/>,
    document.getElementById('root')
  );
  