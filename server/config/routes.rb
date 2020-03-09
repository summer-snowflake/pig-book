Rails.application.routes.draw do
  match '*path' => 'options_request#preflight', via: :options

  scope :api do
    mount_devise_token_auth_for 'User', at: 'auth'

    resource :user, only: %i[show]
    resource :profile, only: %i[show update]
    resources :categories, only: %i[index create update destroy]
    resources :breakdowns, only: %i[index create update destroy]
    resources :places, only: %i[index create update destroy] do
      resources :categories, only: %i[index], module: :place
    end

    namespace :admin do
      resources :users, only: %i[index]
    end
  end
end
