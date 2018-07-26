# frozen_string_literal: true

namespace :calculator do
  desc 'Calculate the records on monthly.'
  task monthly: :environment do
    id = ENV['USER_ID']
    raise "ENV['USER_ID'] is not found." unless id
    user = User.find(id)
    updator = MonthlyBalanceTable::Updator.new(user: user)
    updator.update!
  rescue ActiveRecord::RecordNotFound => ex
    puts ex.message
  end
end
