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
end
