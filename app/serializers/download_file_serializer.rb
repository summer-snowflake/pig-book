# frozen_string_literal: true

class DownloadFileSerializer < ActiveModel::Serializer
  attributes :id, :filename, :path, :expired_label

  def expired_label
    object.decorate.expired_label unless object.active?
  end
end
