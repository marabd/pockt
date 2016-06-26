Rails.application.routes.draw do
  root 'home#index'

  namespace :api do
  	resources :income
  	resources :expense
  end

  get '*unmatched_route', to: 'home#index'
end
