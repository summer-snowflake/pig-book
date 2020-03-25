# frozen_string_literal: true

namespace :tally do
  desc 'Calculate the records.'
  task :update, %i[user_id] => :environment do |_task, args|
    raise '[:user_id] is not found.' unless args[:user_id]

    user = User.find(args[:user_id])

    ActiveRecord::Base.transaction do
      updater = MonthlyBalanceTable::Updater.new(user: user)
      updater.update!
      updater.update_empty!

      updater = YearlyBalanceTable::Updater.new(user: user)
      updater.update!

      user.tally_events.where('created_at < ?', 1.month.ago).destroy_all
      user.tally_events.create!(month: Time.zone.today.month)
    end
  end
end
