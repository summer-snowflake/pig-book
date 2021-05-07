# frozen_string_literal: true

namespace :once do
  desc 'Update assets_accounts checked column'
  task update_assets_accounts_checked: 'environment' do
    AssetsAccount.record_timestamps = false

    User.all.find_each do |user|
      user.assets_accounts.update(checked: true)
    end
    puts 'Done.'
  end
end
