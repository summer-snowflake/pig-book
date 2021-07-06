Rails.application.routes.draw do
  root to: 'root#show'

  namespace :users do
    get 'sign_in', to: 'sessions#new'
    get 'confirmed', to: 'sessions#new'
    get 'sign_up', to: 'registrations#new'
    get 'confirmations', to: 'confirmations#new'
  end

  get 'mypage', to: 'mypage#show'

  namespace :admin, module: :admin_page do
    get 'users', to: 'users#show'
  end

  scope :api do
    mount_devise_token_auth_for 'User', at: 'auth', controllers: {
      confirmations: 'api/auth/confirmations'
    }
  end

  namespace :api do
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
    resources :piggy_banks do
      resources :piggy_items, only: %i[index create update destroy]
    end

    namespace :admin do
      resources :users, only: %i[index]
    end
  end
end
