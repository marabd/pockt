import React from 'react';
import { Link } from 'react-router';

class Income extends React.Component {
	constructor(props) {
		super(props);
		this.state = { income: [], editView: false, addView: false };
		this.toggleAdd = this.toggleAdd.bind(this);
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

	toggleAdd() {
		this.setState({ handleSubmit: !this.state.addView });
	}

	handleSubmit(e) {
		e.preventDefault();
		let name = this.refs.name.value;
		let amount = this.refs.amount.value;
		$.ajax({
			url: 'api/income',
			type: 'POST',
			data: { income: { name, amount } },
			dataType: 'JSON'
		}).done( income => {
			this.props.handleSubmit(income);
			this.refs.handleSubmit.reset();
		}).fail( data => {
			console.log( data )
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

	displayCards() {
		return this.state.income.map( income => {
			return(
				<div key={`income-${income.id}`}>
					<div className='row' >
						<div className= 'col m8'>
							{income.name}
						</div>
						<div className= 'col m4 right-align'>Amount: ${income.amount}.00
						</div>
					</div>
				</div>
			)
		});
	}

	render() {
		if(this.state.editView) {
			return(
				<div className="col s12 m6">
					<div className="card light-green darken-3">
						<div className="card-content">
							<h5>Edit Income: {this.state.income.name}</h5>
							<form onSubmit={this.handleEdit.bind(this)}>
								<input ref='name' type='text' placeholder='Name' defaultValue={this.state.income.name} />
								<input ref='amount' type='text' placeholder='Amount' defaultValue={this.state.income.amount} />
								<input type='Submit' defaultValue='Update Income' className='btn' />
								<button type='button' onClick={this.toggleEdit} className='btn grey'>Cancel</button>
							</form>
						</div>
					</div>
				</div>
			);
		} else if(this.state.addView) {
			return(
				<div className='col s12 m6'>
					<div className='card light-green darken-3'>
						<div className='card-content white-text'>
							<h4>Add Income:</h4>
							<form ref='addForm' onSubmit={this.handleSubmit.bind(this)}>
								<input ref='name' type='text' placeholder='Name' required />
								<input ref='amount' type='text' placeholder='Amount' required />
								<input type='Submit' defaultValue='Add Income' className='btn' />
								<button type='button' onClick={this.toggleAdd} classname='btn grey'>Cancel</button>
							</form>
						</div>
					</div>
				</div>
			);
		} else if(this.state.income) {
			return(
				<div className='row'>
					<div className='col s12 m6'>
						<div className='card light-green darken-3'>
							<div className='card-content white-text'>
								<h4>Income:</h4>
								<span>{this.displayCards.bind(this)()}</span>
								<div className='card-action'>
									<Link to='/' className='btn'>Budget</Link>
									<button className='btn' onClick={this.toggleEdit}>Edit</button>
									<button className='btn' onClick={this.toggleAdd}>Add Income</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		} else {
			return(
				<div className='row'>
					<h3 className='center'>Income Not Loaded...</h3>
				</div>
			);
		}
	}
}

export default Income;
