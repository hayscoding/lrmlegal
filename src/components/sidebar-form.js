import React from 'react'

class SidebarForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      email: '',
      message: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault()

    if(e.target.name == "name") {
      this.setState({name: e.target.value});
    } else if(e.target.name == "phone") {
      this.setState({phone: e.target.value});
    } else if(e.target.name == "email") {
      this.setState({email: e.target.value});
    } else if(e.target.name == "message") {
      this.setState({message: e.target.value});
    }  
  }

  handleSubmit(e) {
    e.preventDefault();

    if(this.validateEmail(this.state.email) && this.validateName(this.state.name)) {
      // alert('This data was submitted: name: '+this.state.name+' phone: '+this.state.phone+' email: '+this.state.email+' message: '+this.state.message);
      this.sendFormData()
    } else {
      if(!this.validateName(this.state.name))
        alert('You have entered an invalid name.')
      else if(!this.validateEmail(this.state.email)) 
        alert('You have entered an invalid email.')
    }
  }

  // sendFormData() {
  //   const formData = new FormData()
  //   formData.append("name", this.state.name)
  //   formData.append("phone", this.state.phone)
  //   formData.append("email", this.state.email)
  //   formData.append("message", this.state.message)
  //   formData.append("_gotcha", "") //This is to prevent spam

  //   const req = new XMLHttpRequest()
  //   const url = "https://formcarry.com/s/q3-3INEjAYw"
  //   req.open('POST', url) //POST to formspree, which will forward to email at end of url

  //   /////////////This is used to test the xmlhttp request
  //   req.onreadystatechange = function() {
  //     if(req.readyState == 4 && req.status == 200) {
  //       alert("status " + req.responseText);
  //       console.log("status " + req.responseText);
  //     }
  //   }

  //   req.send(formData)

  //   this.clearFormData()
  // }

  sendFormData() {
    const formData = new FormData()
    formData.append("name", this.state.name)
    formData.append("phone", this.state.phone)
    formData.append("email", this.state.email)
    formData.append("message", this.state.message)
    formData.append("_gotcha", "") //This is to prevent spam

    const FORMSPREE_URL = "//formspree.io/haysiszues@gmail.com"

    fetch(FORMSPREE_URL,  {
      method: 'POST',
      body: this.formDataToJson(formData),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .catch(error => console.error('Fetch Error: ', error))
    .then(response => response.json())
    .then(response => {
          if (response.success === 'email sent') {
            console.log(response);
          }
          else {
            // you still going on about validation and error handling?
          }          
        });

    /////////////This is used to test the xmlhttp request
    // req.onreadystatechange = function() {
    //   if(req.readyState == 4 && req.status == 200) {
    //     alert("status " + req.responseText);
    //     console.log("status " + req.responseText);
    //   }
    // }

    // this.clearFormData()
  }

  formDataToJson(formData) {
    var object = {};

    formData.forEach(function(value, key){
        object[key] = value;
    });

    var json = JSON.stringify(object);

    return json;
  }

  clearFormData() {
    this.setState({
      name: '',
      phone: '',
      email: '',
      message: '',
    });
  }

  validateName(name) {
    return name.length > 0 && name.length < 30 ? true : false
  }

  validateEmail(email) {
    const re = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    return re.test(email)
  }

  render() {
    return(
      <div id="sidebar-section">
        <h1 id="title">Free Consultation</h1>
        <hr />
        <div id="body">
          <form onSubmit={this.handleSubmit}>
            <label>
              Name: {/*all form inputs must have a name attribute to work with Formspree (which is being used)*/}
              <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
            </label>
            <label>
              Phone Number:
              <input type="text" name="phone" value={this.state.phone} onChange={this.handleChange} />
            </label>
            <label>
              Email:
              <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
            </label>
            <label>
              Message:
              <input type="text" name="message" value={this.state.message} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    )
  }
}

export default SidebarForm