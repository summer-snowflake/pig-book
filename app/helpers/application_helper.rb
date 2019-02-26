# frozen_string_literal: true

module ApplicationHelper
  def active_class(path)
    'active' if current_page?(path)
  end

  def menu_image(path)
    style_class_name =
      current_page?(path) ? 'active-menu-image' : 'hover-menu-image'
    content_tag(:span, class: "#{style_class_name} float-right") {}
  end

  def error_message_for(resource, column)
    messages = resource.errors.full_messages_for(column)
    return unless messages.present?

    content_tag(:small, class: 'form-text pink') do
      concat content_tag(:i, class: 'fas fa-exclamation-circle left-icon') {}
      concat messages.join(', ')
    end
  end

  def admin_page?
    controller.class.name.deconstantize.casecmp('admin').zero?
  end
end
