# bin/rake update_breakdowns_user_id
desc '内訳 breakdowns に user_id カラムを追加したので、user_id に価を設定する'
task update_breakdowns_user_id: :environment do
  Breakdown.all.find_each do |breakdown|
    breakdown.user = breakdown.category.user
    breakdown.save!
  end

  puts 'Done.'
end
