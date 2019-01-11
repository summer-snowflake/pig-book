# frozen_string_literal: true

namespace :once do
  desc 'Calculate the records on monthly.'
  task :change_year_and_month, :environment do
    MonthlyBalanceTable.all.find_each do |monthly|
      monthly.update!(year: monthly.year_and_month.slice(0..3),
                      month: monthly.year_and_month.slice(5, 2))
    end
  end
end
