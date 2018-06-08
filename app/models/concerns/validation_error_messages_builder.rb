# frozen_string_literal: true

module ValidationErrorMessagesBuilder
  extend ActiveSupport::Concern

  def errors_full_messages_with_keys
    with_keys_hash = {}
    errors.keys.each do |key|
      with_keys_hash[key] = errors.full_messages_for(key)
    end
    with_keys_hash
  end
end
