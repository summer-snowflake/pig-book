# frozen_string_literal: true

class DownloadFileSerializer < ActiveModel::Serializer
  attributes :id, :filename, :path, :expired_label, :active

  def expired_label
    object.decorate.expired_label
  end

  def active
    object.active?
  end
end
