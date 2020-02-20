Rails.application.routes.draw do
  match '*path' => 'options_request#preflight', via: :options

  scope :api do
    mount_devise_token_auth_for 'User', at: 'auth'
  end
end
