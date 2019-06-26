var React = require('react');

class AdminLayout extends React.Component {
  render() {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <link rel="stylesheet" href="/assets/bootstrap/dist/css/bootstrap.css"></link>
          <link rel="stylesheet" href="/assets/main.css"></link>
        </head>
        
        <body>
          <nav class="navbar navbar-expand-md navbar-dark bg-dark"><a class="navbar-brand" href="#">EMS Admin</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarsExampleDefault">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item"><a class="nav-link" href="/admin/add">Add</a>
                </li>
                <li class="nav-item"><a class="nav-link" href="/admin/viewall">View</a>
                </li>
                <li class="nav-item"><a class="nav-link" href="/admin/search">Search </a>
                </li>
              </ul>
              <ul class="navbar-nav navbar-right">
                <li class="nav-item"><a class="nav-link" href="/users/logout">Logout</a>
                </li>
              </ul>
            </div>
          </nav>
          <div class="container app-custom-container">
            {this.props.children}
          </div>
          <hr/>
          <footer class="footer mt-auto py-3">
            <div class="container">
              <p class="text-muted">copyright &copy; 2019</p>
            </div>
          </footer>
        </body>

        <script src="/assets/jquery/dist/jquery.min.js"></script>
        <script src="/assets/bootstrap/dist/js/bootstrap.min.js"></script>
        <script src="/assets/main.js"></script>
      </html>
    );
  }
}

module.exports = AdminLayout;


