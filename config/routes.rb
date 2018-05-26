Rails.application.routes.draw do
  devise_for :users

  root to: 'welcome#show'
  get '/mypage', to: 'mypage#show'

  # for letter_opener
  mount LetterOpenerWeb::Engine, at: '/letter_opener' if Rails.env.development?
end
