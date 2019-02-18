# frozen_string_literal: true

namespace :once do
  desc '重複して保存されてしまったデータを削除するために、重複データを出力する'
  task remove_duplicate_records: :environment do
    records_ary =
      Record.group(:user_id, :category_id, :breakdown_id, :place_id, :charge,
                   :memo, :currency, :point, 'date(published_at)')
            .having('count(*) >= 2')
            .pluck(:user_id, :category_id, :breakdown_id, :place_id, :charge,
                   :memo, :currency, :point, 'date(published_at)')
    records_ary.each do |attrs|
      user_id, category_id, breakdown_id, place_id, charge,\
        memo, currency, point, date = attrs
      records =
        Record.where(user_id: user_id, category_id: category_id,
                     breakdown_id: breakdown_id, place_id: place_id,
                     charge: charge, memo: memo, currency: currency,
                     point: point)
      dates = records.map { |r| (r.published_at - 9.hours).to_s.slice(0..9) }
      record_index = dates.find_index { |d| d == date.strftime('%Y-%m-%d') }
      target = records[record_index]
      puts "#{target.published_at.to_s.slice(0..9)}, #{target.category.name},
        #{target.breakdown&.name}, #{target.place&.name},
        #{target.currency}, #{target.charge}, #{target.point}, #{target.memo}"
    end
  end
end
