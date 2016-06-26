5.times do |number|
	Income.create(name: Faker::Lorem.sentence,
								amount: Faker::Number.decimal(2))
end

5.times do |number|
	Expense.create(name: Faker::Lorem.sentence,
								est_amount: Faker::Number.decimal(2),
								act_amount: Faker::Number.decimal(2),
								paid: Faker::Boolean.boolean)
end
