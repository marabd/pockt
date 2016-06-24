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
      url: `/api/expense/${this.props.params.id}`,
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
    let description = this.refs.description.value;
    let style = this.refs.style.value;
    let alcohol_content = this.refs.alcoholContent.value;

    $.ajax({
      url: `/api/expense/${this.state.expense.id}`,
      type: 'PUT',
      data: { expense: { name, description, style, alcohol_content } },
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
            <input ref='description'type='text' placeholder='Description' defaultValue={this.state.expense.description} />
            <input ref='style'type='text' placeholder='Style' defaultValue={this.state.expense.style} />
            <input ref='alcoholContent'type='text' placeholder='Alcohol Content' defaultValue={this.state.expense.alcohol_content} />
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
                  <label>Style:</label>
                  <p>{this.state.expense.style}</p>

                  <label>Description:</label>
                  <p>{this.state.expense.description}</p>

                  <label>Alcohol Content:</label>
                  <p>{this.state.expense.alcohol_content}</p>
                </div>

              </div>
              <div className="card-action">
                <Link to='/'>All Beers</Link>
                <button className='btn' onClick={this.toggleEdit}>Edit</button>
              </div>
            </div>
          </div>
        )
      } else {
        return(
          <div className='row'>
            <h3 className='center'>Beer Not Loaded...</h3>
          </div>
        )
      }
    }
  }
}

export default BeerCard;
