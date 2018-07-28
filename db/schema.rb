# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180728125752) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "admins", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_admins_on_user_id"
  end

  create_table "breakdowns", force: :cascade do |t|
    t.string "name", null: false
    t.bigint "category_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_breakdowns_on_category_id"
  end

  create_table "categories", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "name", null: false
    t.boolean "balance_of_payments", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_categories_on_user_id"
  end

  create_table "categorized_places", force: :cascade do |t|
    t.bigint "place_id", null: false
    t.bigint "category_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_categorized_places_on_category_id"
    t.index ["place_id"], name: "index_categorized_places_on_place_id"
  end

  create_table "events", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.integer "category", null: false
    t.bigint "created_by"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_events_on_user_id"
  end

  create_table "monthly_balance_tables", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.datetime "beginning_at", null: false
    t.integer "income", default: 0, null: false
    t.integer "expenditure", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "currency", default: 0, null: false
    t.index ["user_id"], name: "index_monthly_balance_tables_on_user_id"
  end

  create_table "places", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_places_on_user_id"
  end

  create_table "profiles", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.integer "locale", default: 0, null: false
    t.integer "currency", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_profiles_on_user_id"
  end

  create_table "records", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.datetime "published_at", null: false
    t.bigint "category_id", null: false
    t.bigint "breakdown_id"
    t.bigint "place_id"
    t.integer "charge", null: false
    t.string "memo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "currency", default: 0, null: false
    t.integer "point", default: 0
    t.index ["breakdown_id"], name: "index_records_on_breakdown_id"
    t.index ["category_id"], name: "index_records_on_category_id"
    t.index ["place_id"], name: "index_records_on_place_id"
    t.index ["user_id"], name: "index_records_on_user_id"
  end

  create_table "tagged_records", force: :cascade do |t|
    t.bigint "tag_id", null: false
    t.bigint "record_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["record_id"], name: "index_tagged_records_on_record_id"
    t.index ["tag_id"], name: "index_tagged_records_on_tag_id"
  end

  create_table "tags", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "name", null: false
    t.string "color_code", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_tags_on_user_id"
  end

  create_table "templates", force: :cascade do |t|
    t.bigint "category_id", null: false
    t.string "name", null: false
    t.integer "charge"
    t.bigint "breakdown_id"
    t.bigint "tag_id"
    t.text "memo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["breakdown_id"], name: "index_templates_on_breakdown_id"
    t.index ["category_id"], name: "index_templates_on_category_id"
    t.index ["tag_id"], name: "index_templates_on_tag_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.integer "failed_attempts", default: 0, null: false
    t.string "unlock_token"
    t.datetime "locked_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "authentication_token"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["unlock_token"], name: "index_users_on_unlock_token", unique: true
  end

  add_foreign_key "admins", "users"
  add_foreign_key "breakdowns", "categories"
  add_foreign_key "categories", "users"
  add_foreign_key "categorized_places", "categories"
  add_foreign_key "categorized_places", "places"
  add_foreign_key "events", "users"
  add_foreign_key "monthly_balance_tables", "users"
  add_foreign_key "places", "users"
  add_foreign_key "profiles", "users"
  add_foreign_key "records", "breakdowns"
  add_foreign_key "records", "categories"
  add_foreign_key "records", "places"
  add_foreign_key "records", "users"
  add_foreign_key "tagged_records", "records"
  add_foreign_key "tagged_records", "tags"
  add_foreign_key "tags", "users"
  add_foreign_key "templates", "breakdowns"
  add_foreign_key "templates", "categories"
  add_foreign_key "templates", "tags"
end
