# frozen_string_literal: true

class ImportHistory < ApplicationRecord
  include ValidationErrorMessagesBuilder
  DISPLAY_LIMIT_COUNT = 100

  attr_accessor :builder

  belongs_to :user
  belongs_to :record, optional: true

  scope :unregistered, -> { where(record_id: nil) }
  scope :registered, -> { where.not(record_id: nil) }
  scope :registable, -> { unregistered.where(messages: '') }

  def status_name
    record_id.nil? ? 'unregistered' : 'registered'
  end

  def registered?
    status_name == 'registered'
  end

  def unregistered?
    status_name == 'unregistered'
  end

  def category_id
    user.categories.find_by(name: category_name)&.id if category_name
  end

  def category_name
    row&.split(',')&.second
  end

  def breakdown_name
    row&.split(',')&.third
  end

  def place_name
    row&.split(',')&.fourth
  end

  def tags
    row&.split(',')&.from(6)
  end

  def assign_builder
    @builder ||= ImportHistory::RecordBuilder.new(user: user, row: row)
    self.messages = @builder.error_messages.join(' / ')
    save if changed?
  end

  def category_required?
    assign_builder
    @builder.unregistered_error?(:category_name)
  end

  def breakdown_required?
    assign_builder
    @builder.unregistered_error?(:breakdown_name)
  end

  def place_required?
    assign_builder
    @builder.unregistered_error?(:place_name)
  end

  def tags_required?
    assign_builder
    @builder.unregistered_error?(:tags)
  end
end
