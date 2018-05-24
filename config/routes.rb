Rails.application.routes.draw do
  root to: 'welcome#show'

  resource :session, only: %i[new]
end
