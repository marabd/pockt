class CreateExpenses < ActiveRecord::Migration
  def change
    create_table :expenses do |t|
      t.string :name, null: false
      t.integer :est_amount
      t.integer :act_amount, null: false
      t.boolean :paid

      t.timestamps null: false
    end
  end
end
