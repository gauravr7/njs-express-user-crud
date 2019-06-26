var React = require('react');

class LoginLayout extends React.Component {
  render() {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <link rel="stylesheet" href="/assets/bootstrap/dist/css/bootstrap.css"></link>
          <link rel="stylesheet" href="/assets/main.css"></link>
          <link rel="stylesheet" href="/assets/signin.css"></link>
        </head>
        
        <body class="text-center">{this.props.children}</body>

        <script src="/assets/jquery/dist/jquery.min.js"></script>
        <script src="/assets/bootstrap/dist/js/bootstrap.min.js"></script>
        <script src="/assets/main.js"></script>
      </html>
    );
  }
}

module.exports = LoginLayout;
