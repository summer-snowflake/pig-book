Aws.config.update({
  credentials: Aws::Credentials.new(ENV['AWS_USER_ACCESS_KEY'], ENV['AWS_USER_SECRET_KEY']),
  region: ENV['AWS_REGION']
})
