var React = require('react');
var AdminLayout = require('./layouts/admin-layout');

class AddEmployees extends React.Component {
    constructor () {
        super();
    }
    render() {
        return(
            <AdminLayout>
                <h4>Add Employee</h4>
                <form method="POST" action="/admin/add">
                    <div class="form-group">
                        <label>Name:</label>
                        <input class="form-control" name="name" type="text"/>
                    </div>
                    <div class="form-group">
                        <label>Age:</label>
                        <input class="form-control" name="age" type="text"/>
                    </div>
                    <div class="form-group">
                        <label>Salary:</label>
                        <input class="form-control" name="salary" type="text"/>
                    </div>
                    <div class="form-group">
                        <label>Address:</label>
                        <input class="form-control" name="houseno" type="text"/>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label>City:</label>
                            <input class="form-control" name="city" type="text"/>
                        </div>
                        <div class="form-group col-md-4">
                            <label>State:</label>
                            <input class="form-control" name="state" type="text"/>
                        </div>
                        <div class="form-group col-md-2">
                            <label>Pincode:</label>
                            <input class="form-control" name="pin" type="text"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Gender:</label>
                        <select class="form-control" name="gender">
                            <option value="">select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div class="form-row">
                        <div class="col-md-6" id="form-group">
                            <label>Department:</label>
                            <select class="form-control" name="dept_name">
                                <option value="0">Select</option>
                                <option value="accounts">accounts</option>
                                <option value="sales">sales</option>
                                <option value="technical">technical</option>
                                <option value="customer support">customer support</option>
                                <option value="payroll">payroll</option>
                            </select>
                        </div>
                        <div class="col-md-6" id="form-group">
                            <label>Region:</label>
                            <select class="form-control" name="dept_region">
                                <option value="0">Select</option>
                                <option value="delhi">delhi</option>
                                <option value="north">north</option>
                                <option value="south">south</option>
                                <option value="central">central</option>
                                <option value="bangalore">bangalore</option>
                            </select>
                        </div>
                    </div>
                    <br/>
                    <input class="btn btn-primary" type="submit" value="submit"/>
                </form>
            </AdminLayout>
        ) 
    }
}
module.exports = AddEmployees;

    
