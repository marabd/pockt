import React from 'react';
import { Link } from 'react-router'

class Expense extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expense: null, editView: false }
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  componentWillMount() {
    $.ajax({
      url: '/api/expense',
      type: 'GET',
      dataType: 'JSON'
    }).done( expense => {
      this.setState({ expense });
    }).fail( data => {
      console.log(data);
    });
  }

  toggleEdit() {
    this.setState({ editView: !this.state.editView });
  }

  handleEdit(e) {
    e.preventDefault();
    let name = this.refs.name.value;
    let est_amount = this.refs.estAmount.value;
    let act_amount = this.refs.actAmount.value;
    let paid = this.refs.paid.value;

    $.ajax({
      url: `/api/expense/${this.state.expense.id}`,
      type: 'PUT',
      data: { expense: { name, est_amount, act_amount, paid } },
      dataType: 'JSON'
    }).done( expense => {
      this.setState({ expense, editView: false });
    }).fail( data => {
      console.log( data )
    });
  }

  render() {
    if(this.state.editView) {
      return(
        <div>
          <h3>Edit Beer: {this.state.expense.name}</h3>
          <form onSubmit={this.handleEdit.bind(this)} >
            <input ref='name'type='text' placeholder='Name' defaultValue={this.state.expense.name} />
            <input ref='est_amount'type='text' placeholder='Estimated Amount' defaultValue={this.state.expense.est_amount} />
            <input ref='act_amount'type='text' placeholder='Actualy Amount' defaultValue={this.state.expense.act_amount} />
            <input ref='paid'type='text' placeholder='Paid' defaultValue={this.state.expense.paid} />
            <input type='Submit' defaultValue='Update Beer' className='btn' />
            <button type='button' onClick={this.toggleEdit} className='btn grey'>Cancel</button>
          </form>
        </div>
      );
    } else {
      if(this.state.expense) {
        return(
          <div className="col s12 m6">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">{this.state.expense.name}</span>

                <div>
                  <label>Estimated Amount:</label>
                  <p>{this.state.expense.est_amount}</p>

                  <label>Actual Amount:</label>
                  <p>{this.state.expense.act_amount}</p>

                  <label>Paid:</label>
                  <p>{this.state.expense.paid}</p>
                </div>

              </div>
              <div className="card-action">
                <Link to='/'>All Expenses</Link>
                <button className='btn' onClick={this.toggleEdit}>Edit</button>
              </div>
            </div>
          </div>
        )
      } else {
        return(
          <div className='row'>
            <h3 className='center'>Expense Not Loaded...</h3>
          </div>
        )
      }
    }
  }
}

export default Expense;
