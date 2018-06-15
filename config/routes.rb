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
  resources :breakdowns, only: %w[index]
  resources :tags, only: %w[index]

  namespace :admin do
    resources :users, only: %w[index]
  end

  namespace :api, format: :json do
    resources :categories, only: %w[index create update destroy] do
      resources :breakdowns, only: %w[index], module: :categories
    end
    resources :breakdowns, only: %w[index create destroy]
    resources :places, only: %w[index create destroy] do
      resources :categories, only: %w[index], module: :places
    end
    resources :tags, only: %w[index]
    resources :categorized_places, only: %w[create]
  end

  namespace :locales, format: :json do
    get '/ja/translation', to: 'translation#ja'
    get '/en/translation', to: 'translation#en'
  end

  # for letter_opener
  mount LetterOpenerWeb::Engine, at: '/letter_opener' if Rails.env.development?
end
