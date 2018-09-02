# frozen_string_literal: true

namespace :tally do
  desc 'Calculate the records on monthly.'
  task :monthly, %i[user_id operator_id] => :environment do |_task, args|
    raise '[:user_id] is not found.' unless args[:user_id]
    raise '[:operator_id] is not found.' unless args[:operator_id]

    user = User.find(args[:user_id])
    operator = User.find(args[:operator_id])

    ActiveRecord::Base.transaction do
      updator = MonthlyBalanceTable::Updater.new(user: user)
      updator.update!
      user.events.where('created_at < ?', 1.month.ago).destroy_all
      user.events.create!(category: :tally_monthly, operator: operator)
    end
  end
end
