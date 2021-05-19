class IndecisionApp extends React.Component {
  constructor(props){
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handleDecision = this.handleDecision.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      options: []
    }
  }

  handleDeleteOptions(){
    this.setState(() => {
      return {
        options: []
      }
    })
  }

  handleDecision(){
    const randomNumber = Math.floor(Math.random() * this.state.options.length);
    const decision = this.state.options[randomNumber];
    return alert(decision);
  }

  handleAddOption(option){
    // Some error messages for the user, just in case.
    // If there was no text in the first place. option comes out as false
    if(!option){
      return "Please enter a valid value to add item";
    // If the option already exists in the array. indexOf(option) > -1 means the item exists in the array 
    } else if (this.state.options.indexOf(option) > -1){
      return "This option already exists";
    } 
    this.setState((prevState) => {
      return {
        options: prevState.options.concat(option)
      };
    });
  }
  render(){
    const subtitle = "Put your life in the hands of a computer";
    return (
      <div>
        <Header subtitle={subtitle} />
        <Action options={this.state.options} handleDecision={this.handleDecision}/>
        <Options options={this.state.options} handleDeleteOptions={this.handleDeleteOptions}/>
        <AddOption handleAddOption={this.handleAddOption}/>
      </div>
    );
  }
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <h2>{props.subtitle}</h2> }
    </div>
    )
}

Header.defaultProps = {
  title: "Indecision"
}


const Action = (props) => {
  return (
    <div>
      <button 
      disabled={props.options.length == 0}
      onClick={props.handleDecision}
      >
        What should I do?
      </button>
    </div>
    );
  }

const Options = (props) => {
  return (
    <div>
      {props.options.map((option) => <Option key={option} optionText={option}/>)}
      <button onClick={props.handleDeleteOptions}>Remove All</button>
    </div>
  );
}

const Option = (props) => {
  return (
      <div>
        <p>Option: {props.optionText}</p>        
      </div>
    );
}

class AddOption extends React.Component {
  constructor(props){
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined
    }
  }
  handleAddOption(e) {
    e.preventDefault();
    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);
    e.target.elements.option.value = "";
    this.setState(() => {
      return {
        error: error
      }
    })
  }
  render(){
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p> }
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}

// Stateless functional components 
// These don't manage state, but we can manage props.

// Advantage - faster than class based components because they don't have to extend 
// a React.Component, and they have nowhere near as much overhead.

/*const User = (props) => {
  return (
    <div>
      <p>Name: {props.name}</p>
      <p>Age: {props.age}</p>
    </div>
  )
}

ReactDOM.render(<User name={"James"} age={28}/>, document.getElementById('app'));
*/

ReactDOM.render(<IndecisionApp/>, document.getElementById('app'));
