var React = require('react');
var LoginLayout = require('./layouts/login-layout');

class LoginForm extends React.Component {
  showMessage() {
    alert('HI');
  } 
  render() {
    return (
    <LoginLayout>
      <div class="login-content">
        <div unwrap dangerouslySetInnerHTML={{ __html: this.props.messages() }} />
        
        <form class="form-signin" method="POST" action="/users/login">
          <img class="mb-4" src="../assets/img/bootstrap-solid.svg" alt="" width="72" height="72"/>
          <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label class="sr-only" for="inputEmail">Email address</label>
          <input class="form-control" id="inputEmail" name="username" type="text" placeholder="User Name" value="superadmin" required="" autofocus=""/>
          <label class="sr-only" for="inputPassword">Password</label>
          <input class="form-control" id="inputPassword" name="password" type="password" placeholder="Password" value="superadmin" required=""/>
          <div class="checkbox mb-3">
            <label></label>
            <input type="checkbox" value="remember-me"/>Remember me</div>
          
          <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
        <button onClick={this.showMessage}>Show React alert</button>
        <button onClick={window.alert('gem gem')}>Show Js alert</button>
      </div>
    </LoginLayout>);
  }
}

module.exports = LoginForm;