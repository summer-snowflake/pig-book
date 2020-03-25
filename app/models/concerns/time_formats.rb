# frozen_string_literal: true

module TimeFormats
  extend ActiveSupport::Concern

  Time::DATE_FORMATS[:human] = lambda do |date|
    seconds = (Time.zone.now - date).round

    days = seconds / (60 * 60 * 24)
    return "#{date.month}月#{date.day}日" if days > 10 # 10 日前を超える場合は日付で返す
    return "#{days}日前" if days.positive?

    hours = seconds / (60 * 60)
    return "#{hours}時間前" if hours.positive?

    minutes = seconds / 60
    return "#{minutes}分前" if minutes.positive?

    return "#{seconds}秒前"
  end
end
