Rails.application.routes.draw do
  scope :api do
    mount_devise_token_auth_for 'User', at: 'auth', controllers: { confirmations: 'confirmations' }

    resource :user, only: %i[show update]
    resource :profile, only: %i[show update]
    resources :categories, only: %i[index show create update destroy]
    resources :breakdowns, only: %i[index create update destroy]
    resources :places, only: %i[index create update destroy] do
      resources :categories, only: %i[index create], module: :place
    end
    resources :tags, only: %i[index create update destroy]
    resources :records, only: %i[index create update destroy]
    resources :dashboards, param: :year, only: %i[index show update] do
      resources :categories, only: %i[show], module: :dashboards
    end
    resource :tutorial, only: %i[show]
    resources :assets_accounts, only: %i[index create update destroy]

    namespace :admin do
      resources :users, only: %i[index]
    end
  end
end
