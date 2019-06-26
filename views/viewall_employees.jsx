var React = require('react');
var AdminLayout = require('./layouts/admin-layout');

class ViewAllEmployees extends React.Component {
    constructor () {
        super();
    }
    renderData() {
        let HTMLUI = [];
        const { employees } = this.props;
        for (var x in employees) {
            HTMLUI.push(<li key={x} className="list-group-item"><a className="app-emp-name" href={`/admin/view/`+employees[x]._id}>{employees[x].name}</a></li>)
        }
        return HTMLUI;
    }
    render() {
        return (
        <AdminLayout>
            <h4>View All</h4>
            <ul class="list-group">
                { this.renderData() }
            </ul>
            <br/>
        </AdminLayout>);
    }
}

module.exports = ViewAllEmployees;





