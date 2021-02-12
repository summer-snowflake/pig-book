# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_02_12_152734) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "admins", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_admins_on_user_id"
  end

  create_table "assets_accounts", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "name", default: "", null: false
    t.boolean "balance_of_payments", default: true, null: false
    t.integer "currency", default: 0, null: false
    t.integer "money", default: 0, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "position"
    t.boolean "checked", default: false
    t.index ["user_id"], name: "index_assets_accounts_on_user_id"
  end

  create_table "breakdowns", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "category_id", null: false
    t.string "name", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["category_id"], name: "index_breakdowns_on_category_id"
    t.index ["user_id"], name: "index_breakdowns_on_user_id"
  end

  create_table "categories", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "name", null: false
    t.boolean "balance_of_payments", default: false, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_categories_on_user_id"
  end

  create_table "categorized_places", force: :cascade do |t|
    t.bigint "place_id", null: false
    t.bigint "category_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["category_id"], name: "index_categorized_places_on_category_id"
    t.index ["place_id"], name: "index_categorized_places_on_place_id"
  end

  create_table "monthly_records", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.integer "income", default: 0, null: false
    t.integer "expenditure", default: 0, null: false
    t.integer "currency", default: 0, null: false
    t.integer "year", null: false
    t.integer "month", null: false
    t.integer "point", default: 0, null: false
    t.integer "cashless_charge", default: 0, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "type", null: false
    t.bigint "category_id"
    t.string "label"
    t.bigint "breakdown_id"
    t.index ["breakdown_id"], name: "index_monthly_records_on_breakdown_id"
    t.index ["category_id"], name: "index_monthly_records_on_category_id"
    t.index ["user_id"], name: "index_monthly_records_on_user_id"
  end

  create_table "piggy_banks", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "title", default: "", null: false
    t.string "description", default: "", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "currency", default: 0, null: false
    t.index ["user_id"], name: "index_piggy_banks_on_user_id"
  end

  create_table "piggy_items", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "piggy_bank_id", null: false
    t.date "published_on", null: false
    t.boolean "balance_of_payments", default: false, null: false
    t.decimal "charge", null: false
    t.string "name", default: "", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["piggy_bank_id"], name: "index_piggy_items_on_piggy_bank_id"
    t.index ["user_id"], name: "index_piggy_items_on_user_id"
  end

  create_table "places", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "name", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_places_on_user_id"
  end

  create_table "profiles", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.integer "locale", default: 0, null: false
    t.integer "currency", default: 0, null: false
    t.text "memo", default: "", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_profiles_on_user_id"
  end

  create_table "records", force: :cascade do |t|
    t.datetime "published_at"
    t.bigint "user_id", null: false
    t.bigint "category_id", null: false
    t.bigint "breakdown_id"
    t.bigint "place_id"
    t.decimal "charge", null: false
    t.string "memo"
    t.integer "currency", null: false
    t.integer "point", default: 0, null: false
    t.integer "cashless_charge", default: 0, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["breakdown_id"], name: "index_records_on_breakdown_id"
    t.index ["category_id"], name: "index_records_on_category_id"
    t.index ["place_id"], name: "index_records_on_place_id"
    t.index ["user_id"], name: "index_records_on_user_id"
  end

  create_table "tagged_records", force: :cascade do |t|
    t.bigint "tag_id", null: false
    t.bigint "record_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["record_id"], name: "index_tagged_records_on_record_id"
    t.index ["tag_id"], name: "index_tagged_records_on_tag_id"
  end

  create_table "tags", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "name", null: false
    t.string "color_code", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_tags_on_user_id"
  end

  create_table "tally_events", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.integer "year", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_tally_events_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.integer "failed_attempts", default: 0, null: false
    t.string "unlock_token"
    t.datetime "locked_at"
    t.string "name"
    t.string "nickname"
    t.string "image"
    t.string "email"
    t.json "tokens"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "categories_count", default: 0, null: false
    t.integer "breakdowns_count", default: 0, null: false
    t.integer "places_count", default: 0, null: false
    t.integer "records_count", default: 0, null: false
    t.boolean "daily_option", default: false, null: false
    t.integer "tags_count", default: 0, null: false
    t.boolean "unlimited_option", default: false, null: false
    t.boolean "piggy_bank_option", default: false, null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
    t.index ["unlock_token"], name: "index_users_on_unlock_token", unique: true
  end

  create_table "yearly_records", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.integer "year", null: false
    t.integer "currency", default: 0, null: false
    t.integer "income", default: 0, null: false
    t.integer "expenditure", default: 0, null: false
    t.integer "cashless_charge", default: 0, null: false
    t.integer "point", default: 0, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "type", null: false
    t.bigint "category_id"
    t.string "label"
    t.bigint "breakdown_id"
    t.index ["breakdown_id"], name: "index_yearly_records_on_breakdown_id"
    t.index ["category_id"], name: "index_yearly_records_on_category_id"
    t.index ["user_id"], name: "index_yearly_records_on_user_id"
  end

  add_foreign_key "admins", "users"
  add_foreign_key "assets_accounts", "users"
  add_foreign_key "breakdowns", "categories"
  add_foreign_key "breakdowns", "users"
  add_foreign_key "categories", "users"
  add_foreign_key "categorized_places", "categories"
  add_foreign_key "categorized_places", "places"
  add_foreign_key "monthly_records", "users"
  add_foreign_key "piggy_banks", "users"
  add_foreign_key "piggy_items", "piggy_banks"
  add_foreign_key "piggy_items", "users"
  add_foreign_key "places", "users"
  add_foreign_key "profiles", "users"
  add_foreign_key "records", "breakdowns"
  add_foreign_key "records", "categories"
  add_foreign_key "records", "places"
  add_foreign_key "records", "users"
  add_foreign_key "tagged_records", "records"
  add_foreign_key "tagged_records", "tags"
  add_foreign_key "tags", "users"
  add_foreign_key "tally_events", "users"
  add_foreign_key "yearly_records", "users"
end
