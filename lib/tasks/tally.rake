# frozen_string_literal: true

namespace :tally do
  desc 'Calculate the records.'
  task :update, %i[user_id operator_id] => :environment do |_task, args|
    raise '[:user_id] is not found.' unless args[:user_id]
    raise '[:operator_id] is not found.' unless args[:operator_id]

    user = User.find(args[:user_id])
    operator = User.find(args[:operator_id])
    raise 'operator is not administrator' unless operator.admin?

    ActiveRecord::Base.transaction do
      updater = MonthlyBalanceTable::Updater.new(user: user)
      updater.update!
      updater.update_empty!

      updater = YearlyBalanceTable::Updater.new(user: user)
      updater.update!

      user.events.where('created_at < ?', 1.month.ago).destroy_all
      user.events.create!(category: :tally_monthly, operator: operator)
    end
  end
end
