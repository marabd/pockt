class Expense < ActiveRecord::Base
	validates_presence_of :name, :act_amount
end
