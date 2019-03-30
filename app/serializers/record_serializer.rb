# frozen_string_literal: true

class RecordSerializer < ActiveModel::Serializer
  attributes :id, :category_id, :balance_of_payments, :category_name,
             :breakdown_id, :breakdown_name, :place_id, :place_name,
             :published_at, :charge, :human_charge, :point, :memo

  has_many :tagged_records, serializer: TaggedRecordSerializer

  def balance_of_payments
    object.category.balance_of_payments
  end

  def human_charge
    object.decorate.human_charge
  end
end
