# frozen_string_literal: true

task :eslint do
  sh 'npm install eslint'
  sh 'npm run eslint src/javascripts/**/*.js'
end
