//imported React,React-DOM, jQuery as script in index.html
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'home',
      formData: {}
    };
  }

  //button handlers:
  //if don't need event in handling, don't put in parameter
  handleCheckout(nextPage) {
    //create new record in db, $.post -->
    //call handleNextClick
  }

  handleNextClick(nextPage) {
    //save info to new record created in handleCheckout
    this.setState({
      page: nextPage
    });
  }
  //when handling event, input from child --> put into parameters
  handleInput(event, input) {
    //copy object:
    var dataCopy = JSON.parse(JSON.stringify(this.state.formData));
    //keys are unique in object, so if detect multiple changes, will overwrite them
    dataCopy[input] = event.target.value;
    this.setState({
      formData: dataCopy
    })
  }

  render() {
    var element;
    if (this.state.page === 'home') {
      element = (
        <Checkout onClick= {this.handleNextClick.bind(this, 'f1')}/>
      );
    } else if (this.state.page === 'f1') {
      element = (
        <div>
          <Form id='F1' onChange= {this.handleInput.bind(this)}/>
          <Next onClick= {this.handleNextClick.bind(this, 'f2')}/>
        </div>
      );
    } else if (this.state.page === 'f2') {
      element = (
        <div>
          <Form id='F2' onChange= {this.handleInput.bind(this)}/>
          <Next onClick= {this.handleNextClick.bind(this, 'f3')}/>
        </div>
      );
    } else if (this.state.page === 'f3') {
      element = (
        <div>
          <Form id='F3' onChange= {this.handleInput.bind(this)}/>
          <Next onClick= {this.handleNextClick.bind(this, 'confirm')}/>
        </div>
      );
    } else if (this.state.page === 'confirm') {
      var data = JSON.stringify(this.state.formData).replace(/"/g, '').replace(/:/g, ': ');
      data = data.slice(1, data.length-1).split(',');
      //can place array of tags into render method
      data = data.map(info => {
        //Keys should be given to the elements inside the array to give the elements a stable identity
        return <p key={info.toString()}>{info}</p>; });
      element = (
        <div>
          {data}
          <Purchase onClick= {this.handleNextClick.bind(this, 'home')}/>
        </div>
      );
    }

    return (
      <div>
        <br/>
          {element}
        <br/>
      </div>
    );
  }
 }

const Checkout = props => (
  <button onClick= {props.onClick}>Checkout</button>
);

const Next = props => (
  <button onClick={props.onClick}>Next</button>
);

const Purchase = props => (
  <button onClick= {props.onClick}>Purchase</button>
);

class Form extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var id = this.props.id;
    var form;
    if (id === 'F1') {
      form = (
        <form id='F1'>Info <br/>
          <label htmlFor='Name'>Name: </label>
          {/* pass in event, param --> to parent's handler function */}
          <input type='text' id='Name' onChange={ () => {this.props.onChange(event, 'Name')} }></input><br/>
          <label htmlFor='Email'>Email: </label>
          <input type='text' id='Email' onChange={ () => {this.props.onChange(event, 'Email')} }></input><br/>
          <label htmlFor='Password'>Password: </label>
          <input type='password' id='Password' onChange={ () => {this.props.onChange(event, 'Password')} }></input><br/>
        </form>
      );
     } else if (id === 'F2') {
      form = (
        <form id='F2'>Address <br/>
          <label htmlFor='line1'>Line 1: </label>
          <input type='text' id='line1' onChange={ () => {this.props.onChange(event, 'Line 1')} }></input><br/>
          <label htmlFor='line2'>Line 2: </label>
          <input type='text' id='line2' onChange={ () => {this.props.onChange(event, 'Line 2')} }></input><br/>
          <label htmlFor='city'>City: </label>
          <input type='text' id='city' onChange={ () => {this.props.onChange(event, 'City')} }></input><br/>
          <label htmlFor='state'>State: </label>
          <input type='text' id='state' onChange={ () => {this.props.onChange(event, 'State')} }></input><br/>
          <label htmlFor='zipcode'>Zipcode: </label>
          <input type='text' id='zipcode' onChange={ () => {this.props.onChange(event, 'Zipcode')} }></input><br/>
        </form>
      );
    } else if (id === 'F3') {
      form = (
        <form id='F3'>Payment <br/>
          <label htmlFor='cc'>Credit Card Number: </label>
          <input type='text' id='cc' onChange={ () => {this.props.onChange(event, 'Credit Card Number')} }></input><br/>
          <label htmlFor='expr'>Expiry Date: </label>
          <input type='text' id='expr' onChange={ () => {this.props.onChange(event, 'Expiry Date')} }></input><br/>
          <label htmlFor='cvv'>CVV: </label>
          <input type='text' id='cvv' onChange={ () => {this.props.onChange(event, 'CVV')} }></input><br/>
          <label htmlFor='billingZipCode'>Billing Zip Code: </label>
          <input type='text' id='billingZipCode' onChange={ () => {this.props.onChange(event, 'Billing Zip Code')} }></input><br/>
        </form>
      );
    }
    return(
      <div>
        {form}
      </div>
    );
  }
}



//must be last statement!
//use native DOM method to get container element
ReactDOM.render(<App />, document.getElementById('app'));