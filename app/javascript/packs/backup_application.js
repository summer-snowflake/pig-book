// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
// import * as ActiveStorage from "@rails/activestorage"
// import Turbolinks from "turbolinks"
import './server_rendering'

import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'

import 'stylesheets/application'
import 'plugins/i18n'

const images = require.context("images", true);

Rails.start()
// ActiveStorage.start()
// Turbolinks.start()
