# frozen_string_literal: true

class UserSerializer < ActiveModel::Serializer
  has_many :recently_used_categories, serializer: CategorySerializer
  has_many :recently_used_templates, serializer: TemplateSerializer
  has_many :recently_used_tags, serializer: TagSerializer
end
