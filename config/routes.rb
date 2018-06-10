Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  root to: 'welcome#show'
  get '/mypage', to: 'mypage#show'
  get '/base_setting', to: 'base_setting#show'

  resources :categories, only: %w[index]
  resources :places, only: %w[index]

  namespace :admin do
    resources :users, only: %w[index]
  end

  namespace :api, format: :json do
    resources :categories, only: %w[index create destroy] do
      resources :breakdowns, only: %w[index], module: :categories
    end
    resources :places, only: %w[index create destroy] do
      resources :categories, only: %w[index], module: :places
    end
    resources :categorized_places, only: %w[create]
  end

  # for letter_opener
  mount LetterOpenerWeb::Engine, at: '/letter_opener' if Rails.env.development?
end
