class Api::IncomeController < ApplicationController
	before_action :income, except: :index

	def index
		render json: Income.all
	end

	def show
		# find - throws an exception if it can't find it
		# find_by - returns nil if it can't find it
		render json: @income
	end

	def update
		if @income.update(income_params)
			render json: @income.reload
		else
			render json: {errors: @income.errors.full_messages}
		end
	end

	def destroy
		@income.destroy
		render json: true
	end

	private
	def income_params
		params.require(:income).permit(:name, :amount)
	end

	def income
		@income = Income.find_by(id: params[:id])
	end
end
