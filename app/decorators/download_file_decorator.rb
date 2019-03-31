# frozen_string_literal: true

class DownloadFileDecorator < ApplicationDecorator
  delegate_all

  def expired_label
    I18n.t('label.expired_label')
  end
end
