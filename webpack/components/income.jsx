import React from 'react';
import { Link } from 'react-router';

class Income extends React.Component {
	constructor(props) {
		super(props);
		this.state = { income: null, editView: false };
		this.toggleEdit = this.toggleEdit.bind(this);
	}

	componentWillMount() {
	 $.ajax({
	 	url: '/api/income',
	 	type: 'GET',
	 	dataType: 'JSON'
	 }).done( income => {
	 	this.setState({ income });
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
		let amount = this.refs.amount.value;

		$.ajax({
			url: `/api/income/${this.state.income.id}`,
				type: 'PUT',
				data: { income: { name, amount } },
				dataType: 'JSON'
		}).done( income => {
			this.setState({ income, editView: false });
		}).fail( data => {
			console.log( data )
		});
	}

	render() {
		if(this.state.editView) {
			return(
				<div>
					<h3>Edit Income: {this.state.income.name}</h3>
					<form onSubmit={this.handleEdit.bind(this)}>
						<input ref='name' type='text' placeholder='Name' defaultValue={this.state.income.name} />
						<input ref='amount' type='integer' placeholder='Amount' defaultValue={this.state.income.amount} />
						<input type='Submit' defaultValue='Update Income' className='btn' />
						<button type='button' onClick={this.toggleEdit} className='btn grey'>Cancel</button>
					</form>
				</div>
			);
		} else {
			if(this.state.income) {
				return(
					<div className='col s12 m6'>
						<div className='card blue-grey darken-1'>
							<div className='card-content white-text'>
								<span className='card-title'>{this.state.income.name}</span>

								<div>
									<label>Amount:</label>
									<p>{this.state.expense.amount}</p>
								</div>
								<div className='card-action'>
									<Link to='/'>Budget</Link>
									<button className='btn' onClick={this.toggleEdit}>Edit</button>
								</div>
							</div>
						</div>
					</div>
				)
			} else {
				return(
					<div className='row'>
						<h3 className='center'>Income Not Loaded...</h3>
					</div>
				)
			}
		}
	}
}

export default Income;
