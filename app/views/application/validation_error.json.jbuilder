# frozen_string_literal: true

if @resource.errors.present?
  json.error_messages @resource.errors_full_messages_with_keys
end
