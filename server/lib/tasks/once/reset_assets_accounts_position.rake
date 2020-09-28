# frozen_string_literal: true

namespace :once do
  desc 'Reset assets_accounts position column'
  task reset_assets_accounts_position: 'environment' do
    User.all.find_each do |user|
      user.assets_accounts.order(:created_at).each.with_index(1) do |assets_account, index|
        assets_account.update(position: index)
      end
    end
    puts 'Done.'
  end
end
