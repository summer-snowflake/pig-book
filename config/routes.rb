Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  root to: 'welcome#show'
  get '/mypage', to: 'mypage#show'
  resources :csv_files, only: %w[index]
  resources :import_histories, only: %w[index]

  resource :base_setting, only: %w[show update]

  resources :categories, only: %w[index]
  resources :places, only: %w[index]
  resources :breakdowns, only: %w[index]
  resources :templates, only: %w[index]
  resources :tags, only: %w[index]
  resources :records, only: %w[index new]
  resource :dashboard, only: %w[show]

  namespace :admin do
    resources :users, only: %w[index]
  end

  namespace :api, format: :json do
    resource :base_setting, only: %w[show]
    resources :categories, only: %w[index create update destroy] do
      resources :breakdowns, only: %w[index], module: :categories
    end
    resources :breakdowns, only: %w[index create update destroy]
    resources :places, only: %w[index create update destroy] do
      resources :categories, only: %w[index], module: :places
    end
    resources :tags, only: %w[index create update destroy]
    resources :categorized_places, only: %w[create]
    resources :records, only: %w[index show create update destroy]
    resources :templates, only: %w[index create update destroy]
    resources :monthly_balance_tables, only: %w[index]
    resources :import_histories, only: %w[create]

    namespace :admin do
      resources :users, only: :none do
        patch :tally
      end
    end
  end

  namespace :locales, format: :json do
    get '/ja/translation', to: 'translation#ja'
    get '/en/translation', to: 'translation#en'
  end

  # for letter_opener
  mount LetterOpenerWeb::Engine, at: '/letter_opener' if Rails.env.development?
end
