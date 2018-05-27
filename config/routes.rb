Rails.application.routes.draw do
  devise_for :users

  root to: 'welcome#show'
  get '/mypage', to: 'mypage#show'
  get '/base_setting', to: 'base_setting#show'

  resources :categories, only: %w[index]

  # for letter_opener
  mount LetterOpenerWeb::Engine, at: '/letter_opener' if Rails.env.development?
end
