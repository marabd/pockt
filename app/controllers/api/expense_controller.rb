class Api::ExpenseController < ApplicationController
  before_action :expense, except: :index

  def index
    render json: Expense.all
  end

  def show
    render json: @expense
  end

  def new

  end
  
  def create
    @expense = Expense.create(expense_params)
    if @expense.save
      render json: @expense
    else
      render json: {errors: @expense.errors.full_messages}
    end
  end

  def destroy
    @expense.destroy
    render json: true
  end

  def update
    if @expense.update(expense_params)
      render json: @expense.reload
    else
      render json: {errors: @expense.errors.full_messages}
    end
  end

  private
  def expense_params
    params.require(:expense).permit(:name, :est_amount, :act_amount, :paid)
  end
  
  def expense
    @expense = Expense.find_by(id: params[:id])
  end
end
