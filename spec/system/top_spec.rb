require 'rails_helper'

RSpec.describe 'TOP Page', type: :system, js: true do
  it 'Display the top page' do
    visit root_path

    expect(page).to have_content 'HOME'
    expect(page).to have_css '.top-carousel-component'
    expect(page).to have_content '入力する'
    expect(page).to have_css '.twitter-timeline-component'
    expect(page).to have_content 'Copyright'
  end
end
