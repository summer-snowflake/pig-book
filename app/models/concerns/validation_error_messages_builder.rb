module ValidationErrorMessagesBuilder
  extend ActiveSupport::Concern

  def errors_full_messages_with_keys
    with_keys_hash = Hash.new
    errors.keys.each do |key|
      with_keys_hash[key] = errors.full_messages_for(key)
    end
    with_keys_hash
  end
end
