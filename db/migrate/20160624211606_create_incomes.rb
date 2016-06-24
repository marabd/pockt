class CreateIncomes < ActiveRecord::Migration
  def change
    create_table :incomes do |t|
      t.string :name, null: false
      t.integer :amount, null: false

      t.timestamps null: false
    end
  end
end
