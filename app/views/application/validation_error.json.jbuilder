# frozen_string_literal: true

json.error_messages @resource.errors_full_messages_with_keys if @resource.errors.present?
