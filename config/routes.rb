Rails.application.routes.draw do
  devise_for :users

  root to: 'welcome#show'

  resource :session, only: %i[new]
end
