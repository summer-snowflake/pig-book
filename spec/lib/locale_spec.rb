# frozen_string_literal: true

require 'rails_helper'
require 'yaml'

RSpec.describe 'locales/ja.yml', type: :lib do
  it 'ja.yml keys are equal to e.yml keys' do
    ja_hash = YAML.load_file('config/locales/ja.yml')
    ja = SearchKeys.new
    ja.search_keys(ja_hash)

    en_hash = YAML.load_file('config/locales/en.yml')
    en = SearchKeys.new
    en.search_keys(en_hash)

    expect(ja.keys.drop(1) - en.keys.drop(1)).to eq []
  end

  class SearchKeys
    attr_accessor :keys

    def initialize
      @keys = []
    end

    def search_keys(hash)
      return unless hash.try(:values)

      @keys << hash.keys
      hash.values.each do |h|
        search_keys(h)
      end
    end
  end
end
