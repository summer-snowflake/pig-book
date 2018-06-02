Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'users/registrations'
  }

  root to: 'welcome#show'
  get '/mypage', to: 'mypage#show'
  get '/base_setting', to: 'base_setting#show'

  resources :categories, only: %w[index create destroy]
  resources :places, only: %w[index destroy]

  namespace :api do
    resources :places, only: %w[index]
  end

  namespace :admin do
    resources :users, only: %w[index]
  end

  # for letter_opener
  mount LetterOpenerWeb::Engine, at: '/letter_opener' if Rails.env.development?
end
