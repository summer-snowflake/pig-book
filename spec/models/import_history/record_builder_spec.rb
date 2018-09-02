# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ImportHistory::RecordBuilder, type: :model do
  describe '#valid? & error_messages' do
    subject { ImportHistory::RecordBuilder.new(user: user, row: row) }
    let!(:user) { create(:user) }
    let!(:category) { create(:category, user: user, name: '飲食費') }
    let!(:breakdown) { create(:breakdown, category: category, name: '飲み物') }
    let!(:place) { create(:place, user: user, name: 'コンビニ：サンクス') }
    let!(:categorized_place) do
      create(:categorized_place, category: category, place: place)
    end

    context 'when valid row' do
      let(:row) { '2014-12-24,飲食費,飲み物,コンビニ：サンクス,147,,' }

      it 'is valid' do
        expect(subject.valid?).to be_truthy
        expect(subject.error_messages).to eq []
      end
    end

    context 'when date is empty' do
      let(:row) { ',飲食費,飲み物,コンビニ：サンクス,147,,' }

      it 'is invalid' do
        expect(subject.valid?).to be_falsey
        expect(subject.error_messages).to eq ['日付を入力してください']
      end
    end

    context 'when date is invalid' do
      let(:row) { '2018-03-33,飲食費,飲み物,コンビニ：サンクス,147,,' }

      it 'is invalid' do
        expect(subject.valid?).to be_falsey
        expect(subject.error_messages).to eq ['日付は不正な値です']
      end
    end

    context 'when category is empty' do
      let(:row) { '2015-12-25,,飲み物,コンビニ：サンクス,147,,' }

      it 'is invalid' do
        expect(subject.valid?).to be_falsey
        expect(subject.error_messages).to eq ['カテゴリ名を入力してください']
      end
    end
  end
end
