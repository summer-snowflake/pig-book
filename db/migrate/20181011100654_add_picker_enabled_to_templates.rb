class AddPickerEnabledToTemplates < ActiveRecord::Migration[5.2]
  def change
    add_column :templates, :picker_enabled, :boolean, default: 0
  end
end
