Rails.application.routes.draw do
  root 'home#index'


  get '*unmatched_route', to: 'home#index'
end
