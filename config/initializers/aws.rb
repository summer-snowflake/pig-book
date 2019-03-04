Aws.config.update({
  credentials: Aws::Credentials.new(ENV['AWS_ACCESS_KEY'], ENV['AWS_SECRET_KEY']),
  region: ENV['AWS_REGION']
})
