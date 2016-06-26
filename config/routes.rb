Rails.application.routes.draw do
  get 'income/index'

  get 'income/show'

  get 'income/edit'

  get 'income/create'

  root 'home#index'

  namespace :api do
  	resources :income
  	resources :expense
  end

  get '*unmatched_route', to: 'home#index'
end
